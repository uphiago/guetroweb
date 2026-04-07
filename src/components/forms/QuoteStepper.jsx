import React, { useState, useEffect, useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { submitQuoteRequest } from '../../lib/quoteApi';
import { whatsappUrl } from '../../lib/constants';

const STEP_LABELS = ['Sobre você', 'Sobre o plano', 'Solicitar Cotação'];

const MODALITIES = [
  {
    value: 'pf',
    title: 'Pessoa Física',
    description: 'Ideal para você e sua família. (Mínimo 1 pessoa)',
  },
  {
    value: 'adesao',
    title: 'Coletivo por Adesão',
    description:
      'Contratado por meio de entidade de classe ou associação profissional, com intermediação de administradora de benefícios.',
  },
  {
    value: 'pj',
    title: 'Pessoa Jurídica (PJ)',
    description: 'Ideal para empresa com CNPJ ativo. (Mínimo 1 pessoa)',
  },
  {
    value: 'mei',
    title: 'MEI',
    description:
      'Para microempreendedores individuais com CNPJ ativo há mais de 6 meses. (Mínimo 1 pessoa)',
  },
];

const STEP_ONE_SCHEMA = z.object({
  fullName: z
    .string()
    .min(1, 'Informe seu nome completo.')
    .refine((v) => v.trim().split(/\s+/).length >= 2, {
      message: 'Informe nome e sobrenome.',
    }),
  phone: z
    .string()
    .min(1, 'Informe seu telefone.')
    .refine((v) => v.replace(/\D/g, '').length >= 10, {
      message: 'Telefone precisa ter 10 ou 11 dígitos.',
    })
    .refine((v) => v.replace(/\D/g, '').length <= 11, {
      message: 'Telefone precisa ter 10 ou 11 dígitos.',
    }),
  email: z.string().email('Informe um e-mail válido.'),
  acceptedTerms: z
    .boolean()
    .refine((v) => v, 'Você precisa aceitar os termos para avançar.'),
});

const STEP_TWO_SCHEMA = z.object({
  modality: z.string().min(1, 'Selecione uma modalidade.'),
});

const INPUT_CLASS =
  'mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-[1rem] text-slate-900 placeholder:text-slate-500 outline-none transition-colors focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-blue-100';

function formatPhone(raw) {
  const digits = String(raw).replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits ? `(${digits}` : '';
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function modalityLabel(modality) {
  return MODALITIES.find((item) => item.value === modality)?.title ?? modality;
}

function trackMetaLead() {
  if (typeof window === 'undefined') return;
  if (typeof window.fbq !== 'function') return;
  window.fbq('track', 'Lead');
}

export default function QuoteStepper() {
  const [step, setStep] = useState(1);
  const [stepOneData, setStepOneData] = useState(null);
  const [stepTwoData, setStepTwoData] = useState(null);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [personCount, setPersonCount] = useState(1);
  const [ages, setAges] = useState(['']);
  const [ageErrors, setAgeErrors] = useState([]);
  const headingRef = useRef(null);

  const stepOneForm = useForm({
    resolver: zodResolver(STEP_ONE_SCHEMA),
    mode: 'onBlur',
    defaultValues: { fullName: '', phone: '', email: '', acceptedTerms: false },
  });

  const stepTwoForm = useForm({
    resolver: zodResolver(STEP_TWO_SCHEMA),
    mode: 'onBlur',
    defaultValues: { modality: '' },
  });

  const watchedModality = useWatch({
    control: stepTwoForm.control,
    name: 'modality',
  });

  const s1Errors = stepOneForm.formState.errors;
  const phoneField = stepOneForm.register('phone');

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  function resetAll() {
    setStep(1);
    setStepOneData(null);
    setStepTwoData(null);
    setSubmitStatus('idle');
    setSubmitMessage('');
    setPersonCount(1);
    setAges(['']);
    setAgeErrors([]);
    stepOneForm.reset();
    stepTwoForm.reset();
  }

  function changePersonCount(delta) {
    const next = Math.max(1, personCount + delta);
    setPersonCount(next);
    setAges((prev) => {
      if (next > prev.length) return [...prev, ...Array(next - prev.length).fill('')];
      return prev.slice(0, next);
    });
    setAgeErrors((prev) => {
      if (next > prev.length) return [...prev, ...Array(next - prev.length).fill('')];
      return prev.slice(0, next);
    });
  }

  function updateAge(index, value) {
    const digits = value.replace(/\D/g, '').slice(0, 3);
    setAges((prev) => prev.map((age, i) => (i === index ? digits : age)));
    setAgeErrors((prev) => prev.map((err, i) => (i === index ? '' : err)));
  }

  function onSubmitStepOne(values) {
    setStepOneData(values);
    setStep(2);
  }

  function onSubmitStepTwo(values) {
    const errors = ages.map((age) => {
      if (age.trim() === '') return 'Informe a idade.';
      const n = Number(age);
      if (Number.isNaN(n) || n < 0 || n > 110) return 'Entre 0 e 110.';
      return '';
    });

    if (errors.some(Boolean)) {
      setAgeErrors(errors);
      return;
    }

    setStepTwoData({
      modality: values.modality,
      personCount,
      ages,
    });
    setStep(3);
  }

  async function handleQuoteRequest() {
    if (!stepOneData || !stepTwoData) {
      setSubmitStatus('error');
      setSubmitMessage('Dados incompletos. Volte e preencha todos os campos.');
      return;
    }

    setSubmitStatus('loading');
    setSubmitMessage('');

    try {
      await submitQuoteRequest({
        name: stepOneData.fullName,
        phone: stepOneData.phone,
        email: stepOneData.email,
        acceptedTerms: stepOneData.acceptedTerms,
        modality: modalityLabel(stepTwoData.modality),
        modalityCode: stepTwoData.modality,
        personCount: stepTwoData.personCount,
        ages: stepTwoData.ages,
      });
      trackMetaLead();
      setSubmitStatus('success');
    } catch (error) {
      const code = error && typeof error === 'object' ? error.code : null;
      const requestId =
        error && typeof error === 'object' ? error.requestId : null;

      let uiMessage =
        'Não foi possível enviar automaticamente. Tente novamente em instantes ou fale no WhatsApp.';

      if (code === 'N8N_WEBHOOK_NOT_FOUND') {
        uiMessage = 'Webhook n8n não encontrado ou workflow inativo.';
      } else if (code === 'N8N_AUTH_FAILED') {
        uiMessage = 'Falha de autenticação com o webhook n8n.';
      } else if (code === 'UPSTREAM_TIMEOUT') {
        uiMessage = 'O webhook demorou para responder. Tente novamente.';
      }

      if (requestId) {
        uiMessage = `${uiMessage} Ref: ${requestId}`;
      }

      setSubmitStatus('error');
      setSubmitMessage(uiMessage);
    }
  }

  return (
    <section className="w-full max-w-4xl rounded-3xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/10 md:flex md:h-full md:min-h-0 md:flex-col md:p-6">
      <h1 ref={headingRef} tabIndex={-1} className="text-balance text-2xl font-anta text-[var(--primary-dark)] outline-none md:shrink-0 md:text-3xl">
        Formulário de Cotação Guetro
      </h1>

      <div className="mt-3 grid grid-cols-3 gap-2 md:shrink-0">
        {STEP_LABELS.map((label, index) => {
          const n = index + 1;
          const allDone = submitStatus === 'success';
          const done = allDone || step > n;
          const active = !allDone && step === n;

          return (
            <div
              key={label}
              aria-current={active ? 'step' : undefined}
              className={[
                'flex h-10 items-center justify-center rounded-xl border px-2 py-1.5 text-center text-xs font-semibold leading-tight md:h-11 md:px-3 md:text-[0.9rem]',
                done
                  ? 'border-green-600 bg-green-600 text-white'
                  : active
                    ? 'border-[var(--primary-blue)] bg-blue-50 text-[var(--primary-dark)]'
                    : 'border-slate-200 bg-slate-50 text-slate-500',
              ].join(' ')}
            >
              {done ? '✓ ' : ''}
              {label}
            </div>
          );
        })}
      </div>

      <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-200 md:shrink-0">
        <div
          className="h-full rounded-full bg-[var(--primary-blue)] transition-all duration-300 ease-out"
          style={{
            width:
              submitStatus === 'success'
                ? '100%'
                : `${((step - 1) / (STEP_LABELS.length - 1)) * 100}%`,
          }}
        />
      </div>

      <div className="mt-3 rounded-3xl border border-slate-200 bg-slate-50 p-3 md:min-h-0 md:flex-1 md:p-4">
        {step === 1 && (
          <form className="space-y-3" onSubmit={stepOneForm.handleSubmit(onSubmitStepOne)}>
            <div>
              <label htmlFor="fullName" className="text-sm font-semibold text-slate-900">
                Nome completo
              </label>
              <input
                id="fullName"
                type="text"
                autoComplete="name"
                className={INPUT_CLASS}
                aria-invalid={Boolean(s1Errors.fullName)}
                {...stepOneForm.register('fullName')}
              />
              {s1Errors.fullName && <p className="mt-1 text-sm text-red-700">{s1Errors.fullName.message}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="text-sm font-semibold text-slate-900">
                Telefone
              </label>
              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="DDD + número"
                className={INPUT_CLASS}
                aria-invalid={Boolean(s1Errors.phone)}
                {...phoneField}
                onChange={(event) => {
                  event.target.value = event.target.value.replace(/\D/g, '').slice(0, 11);
                  phoneField.onChange(event);
                }}
              />
              {s1Errors.phone && <p className="mt-1 text-sm text-red-700">{s1Errors.phone.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-semibold text-slate-900">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                spellCheck={false}
                className={INPUT_CLASS}
                aria-invalid={Boolean(s1Errors.email)}
                {...stepOneForm.register('email')}
              />
              {s1Errors.email && <p className="mt-1 text-sm text-red-700">{s1Errors.email.message}</p>}
            </div>

            <div>
              <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-800">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 cursor-pointer rounded border-slate-300 accent-[var(--primary-blue)]"
                  {...stepOneForm.register('acceptedTerms')}
                />
                <span className="leading-relaxed">
                  Li e concordo com os{' '}
                  <a href="/termos" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-slate-900">Termos de Uso</a>
                  {' '}e a{' '}
                  <a href="/privacidade" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-slate-900">Política de Privacidade</a>.
                </span>
              </label>
              {s1Errors.acceptedTerms && <p className="mt-1 text-sm text-red-700">{s1Errors.acceptedTerms.message}</p>}
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-[var(--primary-blue)] px-7 py-2.5 text-base font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Avançar
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="space-y-3" onSubmit={stepTwoForm.handleSubmit(onSubmitStepTwo)}>
            <div className="rounded-2xl border border-slate-200 bg-white p-3">
              <label className="text-sm font-semibold text-slate-900">
                Quantas pessoas no plano?
              </label>
              <div className="mt-2 flex items-center gap-4">
                <button
                  type="button"
                  aria-label="Diminuir número de pessoas"
                  onClick={() => changePersonCount(-1)}
                  disabled={personCount <= 1}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-lg font-semibold transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  −
                </button>
                <span className="w-8 text-center text-2xl font-semibold tabular-nums text-slate-800">{personCount}</span>
                <button
                  type="button"
                  aria-label="Aumentar número de pessoas"
                  onClick={() => changePersonCount(1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-lg font-semibold transition-colors hover:bg-slate-100"
                >
                  +
                </button>
                <span className="text-[0.95rem] text-slate-700">
                  {personCount === 1 ? '1 pessoa' : `${personCount} pessoas`}
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-3">
              <label className="text-sm font-semibold text-slate-900">Idade de cada pessoa</label>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                {ages.map((age, index) => (
                  <div key={`${index}-age`} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="Idade"
                        value={age}
                        onChange={(event) => updateAge(index, event.target.value)}
                        aria-invalid={Boolean(ageErrors[index])}
                        aria-label={`Idade da pessoa ${index + 1}`}
                        className={[
                          'w-full rounded-xl border bg-white px-3 py-2.5 text-base text-slate-900 outline-none transition-colors focus:ring-2',
                          ageErrors[index]
                            ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                            : 'border-slate-300 focus:border-[var(--primary-blue)] focus:ring-blue-100',
                        ].join(' ')}
                      />
                      <span className="shrink-0 text-[0.95rem] text-slate-700">anos</span>
                    </div>
                    {ageErrors[index] && (
                      <p className="text-xs text-red-700">{ageErrors[index]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <fieldset className="rounded-2xl border border-slate-200 bg-white p-3">
              <legend className="px-1 text-sm font-semibold text-slate-900">Modalidade</legend>
              <div className="mt-2 grid gap-2 md:grid-cols-2">
                {MODALITIES.map((item) => (
                  <label
                    key={item.value}
                    className={[
                      'flex cursor-pointer flex-col rounded-xl border p-3 transition-colors',
                      watchedModality === item.value
                        ? 'border-[var(--primary-blue)] bg-blue-50'
                        : 'border-slate-300 bg-white',
                    ].join(' ')}
                  >
                    <input type="radio" value={item.value} className="sr-only" {...stepTwoForm.register('modality')} />
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">{item.description}</p>
                  </label>
                ))}
              </div>
              {stepTwoForm.formState.errors.modality && <p className="mt-1 text-sm text-red-700">{stepTwoForm.formState.errors.modality.message}</p>}
            </fieldset>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-7 py-2.5 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-100"
              >
                Voltar
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-[var(--primary-blue)] px-7 py-2.5 text-base font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Avançar
              </button>
            </div>
          </form>
        )}

        {step === 3 &&
          stepOneData &&
          stepTwoData &&
          (submitStatus === 'success' ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center gap-5 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-3xl text-white">
                ✓
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-slate-800">Solicitação enviada!</h2>
                <p className="mt-2 max-w-sm text-[1.02rem] leading-relaxed text-slate-700">
                  Nosso time retornará em até 24h úteis com as melhores opções para o seu perfil.
                </p>
              </div>
              <a
                href={whatsappUrl('Olá%2C+acabei+de+preencher+o+formulário+de+cotação.')}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-green-600 bg-green-50 px-6 py-2.5 text-base font-semibold text-green-700 transition-colors hover:bg-green-100"
              >
                Falar com especialista
              </a>
              <button
                type="button"
                onClick={resetAll}
                className="text-sm text-slate-500 underline underline-offset-2 transition-colors hover:text-slate-700"
              >
                Fazer nova cotação
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid gap-2 rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-800 md:grid-cols-2">
                <p><strong>Nome:</strong> {stepOneData.fullName}</p>
                <p><strong>Telefone:</strong> {formatPhone(stepOneData.phone)}</p>
                <p><strong>E-mail:</strong> {stepOneData.email}</p>
                <p><strong>Pessoas:</strong> {stepTwoData.personCount}</p>
                <p><strong>Idades:</strong> {stepTwoData.ages.join(', ')} anos</p>
                <p className="md:col-span-2"><strong>Modalidade:</strong> {modalityLabel(stepTwoData.modality)}</p>
              </div>

              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-3 text-sm text-slate-800">
                Nossa equipe entrará em contato via WhatsApp em até 24h úteis.
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={submitStatus === 'loading'}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-7 py-2.5 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={handleQuoteRequest}
                  disabled={submitStatus === 'loading'}
                  className="inline-flex min-w-44 items-center justify-center gap-2 rounded-xl bg-[var(--primary-blue)] px-7 py-2.5 text-base font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitStatus === 'loading' ? (
                    <><Loader2 size={18} className="animate-spin" /> Enviando...</>
                  ) : submitStatus === 'error' ? 'Tentar novamente' : 'Solicitar cotação'}
                </button>
              </div>

              {submitStatus === 'error' && (
                <p role="alert" aria-live="polite" className="text-[1.01rem] text-red-700">
                  {submitMessage}
                </p>
              )}
            </div>
          ))}
      </div>
    </section>
  );
}

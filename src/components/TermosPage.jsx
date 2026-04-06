import React from 'react';
import { EMAIL_PRIMARY } from '../lib/constants';

const UPDATED_AT = '6 de abril de 2026';

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fc] to-[#eef3ff] text-slate-800 font-['Afacad']">
      <div className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-20">
        <a
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-800"
        >
          ← Voltar ao site
        </a>

        <h1 className="mt-6 text-3xl font-semibold text-slate-900">Termos de Uso</h1>
        <p className="mt-2 text-sm text-slate-500">Última atualização: {UPDATED_AT}</p>

        <div className="mt-10 space-y-8 text-[0.97rem] leading-relaxed text-slate-700">
          <section>
            <h2 className="mb-3 text-base font-semibold text-slate-900">1. Sobre este site</h2>
            <p>
              Este site é operado pela <strong>Guetro Corretora de Seguros</strong>, CNPJ 55.054.733/0001-09,
              corretora de seguros autorizada a operar no território nacional. Ao acessar e
              utilizar este site, você concorda com os presentes Termos de Uso.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-slate-900">2. Uso do site</h2>
            <p>
              O site destina-se exclusivamente à apresentação institucional da Guetro Corretora de
              Seguros e ao recebimento de solicitações de cotação de planos de saúde e outros
              seguros. É vedado o uso para fins ilícitos, fraudulentos ou que possam prejudicar a
              empresa, seus parceiros ou terceiros.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-slate-900">3. Solicitação de cotação</h2>
            <p>
              O preenchimento do formulário de cotação constitui uma manifestação de interesse, não
              um contrato ou proposta vinculante. A Guetro entrará em contato para apresentar as
              opções disponíveis conforme o perfil informado. Os dados fornecidos serão tratados
              conforme nossa{' '}
              <a href="/privacidade" className="underline underline-offset-2 hover:text-[var(--primary-blue)]">
                Política de Privacidade
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-slate-900">4. Propriedade intelectual</h2>
            <p>
              Todo o conteúdo deste site — incluindo textos, logotipos, imagens e elementos visuais
              — é de propriedade da Guetro Corretora de Seguros ou de seus licenciantes. É proibida
              a reprodução, distribuição ou uso comercial sem autorização prévia por escrito.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-slate-900">5. Limitação de responsabilidade</h2>
            <p>
              A Guetro não se responsabiliza por eventuais indisponibilidades do site, erros de
              navegação ou danos decorrentes do uso das informações aqui disponibilizadas. As
              informações publicadas têm caráter meramente informativo e não substituem orientação
              profissional individualizada.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-slate-900">6. Alterações</h2>
            <p>
              Estes Termos podem ser atualizados a qualquer momento. A data de última atualização
              será sempre indicada no topo desta página. Recomendamos a consulta periódica.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-slate-900">7. Foro</h2>
            <p>
              Fica eleito o foro da Comarca de São Paulo/SP para dirimir quaisquer controvérsias
              decorrentes destes Termos, com renúncia expressa a qualquer outro, por mais
              privilegiado que seja.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-slate-900">8. Contato</h2>
            <p>
              Dúvidas sobre estes Termos podem ser enviadas para:{' '}
              <a
                href={`mailto:${EMAIL_PRIMARY}`}
                className="underline underline-offset-2 hover:text-[var(--primary-blue)]"
              >
                {EMAIL_PRIMARY}
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-500">
          © {new Date().getFullYear()} Guetro Corretora de Seguros.{' '}
          <a href="/privacidade" className="underline underline-offset-2 hover:text-slate-700">Política de Privacidade</a>
        </div>
      </div>
    </div>
  );
}

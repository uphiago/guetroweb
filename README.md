# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Formulário em `/forms`

O projeto agora possui uma página dedicada em `/forms` com formulário de cotação em 3 etapas.

### API segura para n8n (Vercel)

O frontend envia para `POST /api/forms/quote` e a função backend encaminha para o n8n com segredos no servidor.

Configure as envs na Vercel:

```bash
N8N_WEBHOOK_URL=https://seu-n8n/webhook/...
N8N_WEBHOOK_SECRET=seu-segredo-opcional
FORMS_ALLOWED_ORIGINS=https://guetro.com.br,https://www.guetro.com.br
N8N_WEBHOOK_TIMEOUT_MS=15000
```

Para desenvolvimento local sem backend, você pode usar mock no frontend:

```bash
VITE_FORMS_DEV_MOCK=true
```

O payload para o n8n inclui `source`, `formType`, `createdAt`, dados do lead, dados da cotação e metadados de request.

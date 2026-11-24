# Infra — Estimativas e opções (PR1)

Resumo rápido
- Orçamento declarado disponível: US$8/mês (restante do teto US$10). Priorizar free tiers e opções com custo previsível.

Tabela resumida de componentes e estimativas (prioridade: grátis → baixo custo)

- Frontend (Next.js host)
  - Vercel (Free) — deploys e previews grátis para projetos pequenos. Custo: US$0 (free tier) até necessidade de plano Pro.
  - Netlify / Render (Free tiers) — alternativa; US$0 para demos.

- Banco de Dados (MongoDB)
  - Atlas M0 (Free) — recomendado para desenvolvimento/demo. Custo: US$0/mês.
  - Atlas M2/M5 (Paid) — M2 ≈ US$9–15/mo (varia por região) — provavelmente acima do teto; só aprovar se necessário.

- Jobs / Filas
  - Upstash (Redis, Free tier) — uso limitado gratuito; adequado para filas leves.
  - Redis Cloud (paid) — custos variam (a partir de US$5–10+). Evitar inicialmente.

- Storage (attachments)
  - Cloudinary (Free) — bom para imagens e transformações; limite gratuito.
  - S3 (pay-as-you-go) — custo baixo para uso moderado; estimativa variável.

- Email / Notificações
  - Mailtrap / Ethereal / SendGrid (Free tiers) — testes/dev sem custo.

- Observability
  - Sentry (Free tier) — OK para demo.

Estimativa de custo mínimo (demo)
- Vercel (Free): US$0
- MongoDB Atlas M0: US$0
- Upstash free: US$0
- Cloudinary free (opcional): US$0
- Mailtrap/SendGrid free: US$0
Total estimado (demo): US$0/mês — dentro do teto.

Cenário pago mínimo (se Atlas M2 necessário): aproximado
- Atlas M2: ~US$12/mo (estimativa) — ultrapassa o restante US$8.
- Planejamento: qualquer cluster pago requer aprovação explícita.

Recomendações arquiteturais mínimas
- Frontend: Next.js App Router hospedado em Vercel (free). Build integrado via GitHub Actions ou Vercel.
- CMS/API: PayloadCMS v3 integrado com Next API routes (ou serviço separado), armazenando dados em MongoDB Atlas.
- Multitenancy: todas as collections indexadas por `tenantId`; validação server-side; field-level RBAC implementado no servidor.
- Auth: JWT com claims `tenantId` + roles; middleware server-side para validação e field-level enforcement.
- Jobs: evitar Redis pago inicialmente; usar Upstash free ou cron/serverless jobs para tarefas agendadas.
- Storage: Cloudinary para imagens; fallback para S3 se necessário.

Plano PR‑ready para PR2 (complemento de fundação)
- Objetivo: implementar models/collections básicos, seed e testes de isolamento via Payload/Next.
- Conteúdo do PR2:
  - Payload schemas (tenants, users, roles, professionals, patients, appointments, encounters, billing_entries, consents, audit_logs, attachments).
  - Conector MongoDB via `MONGODB_URI` (read from env), instruções para usar Atlas M0 localmente.
  - Seeds: scripts para criar Tenant A e B + users/patients.
  - Tests: integração que valida que Tenant A não vê Tenant B.
  - CI: job que roda `npm run test:ci` (seed + isolation).
  - Documentação: `docs/pr-checklist.md` com checklist de revisão humana e evidências de orçamento configurado.

Estimativa de esforço (PR2)
- Scaffolding + schemas + seed + testes básicos: 3–5 dias (1 dev)
- Revisão e ajustes: 1–2 dias

Checklist before any paid provisioning
- Evidência do orçamento/provider (screenshot/link)
- Aprovação explícita para provisionar cluster pago
- Secrets stored in GitHub/Vercel secrets (owner provides or stores them)

Próxima ação proposta
- Criar branch `aurafoundation/infra-estimates` com este documento e abrir PR‑draft para revisão.
- Alternativa: gerar os artefatos localmente e aguardar seu OK antes de abrir PR.


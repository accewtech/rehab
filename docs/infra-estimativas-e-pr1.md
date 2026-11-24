# Infra — Estimativas e plano PR‑1

Resumo executivo
- Objetivo: propor opções de infraestrutura e estimativas mensais compatíveis com o teto TOTAL de US0/mês (US disponíveis para novas ações). Priorizar free tiers e alternativas de baixo custo. Preparar um plano PR‑ready (PR1) com scaffolding, collections e seeds para revisão humana.
- Banco de dados: MongoDB Atlas (você já possui conta). Recomendo uso de Atlas M0 (Free) para desenvolvimento e demos.

1) Tabela de opções e estimativas rápidas
- Frontend / Hosting Next.js
  - Vercel (Hobby / Free): US/bin/bash/mo (recomendado para App Router). Integra CI/CD e previews.
  - Netlify (Free): US/bin/bash/mo. Alternativa viável.
  - Render (Free tier): US/bin/bash/mo.

- Banco de dados
  - MongoDB Atlas M0 (Free): US/bin/bash/mo — recomendado para dev/demo. Conecta com string padrão.
  - MongoDB Atlas M2/M5 (paid): ~US–25/mo (varia por região) — provavelmente excede o teto; requer aprovação explícita.

- Filas / Jobs (BullMQ/Redis)
  - Upstash (Free plan): US/bin/bash/mo até limites baixos — boa alternativa para filas pequenas.
  - Redis Cloud (paid): >US/mo — avaliar só se necessário.
  - Recomendação: evitar Redis pago inicialmente; usar jobs serverless ou Upstash free.

- Storage (arquivos)
  - Cloudinary (Free tier) ou Vercel storage para attachments pequenos: US/bin/bash/mo para uso limitado.
  - S3: custo mínimo (pay-as-you-go) — geralmente barato, mas variável.

- Email / Notificações
  - Mailtrap (dev sandbox) / Ethereal / SendGrid free tier: US/bin/bash/mo para testes.

- Observability / Erros
  - Sentry Free: US/bin/bash/mo com limites para erro/debug.

- Resultados esperados (mínimo viável dentro do teto)
  - Usando somente free tiers: custo = US/bin/bash/mo (Vercel free + Atlas M0 + Upstash free + Cloudinary free + Mailtrap) — recomendado para demos e validação.
  - Se um componente pago for inevitável, apresentar custo detalhado e solicitar aprovação antes de provisionar.

2) Arquitetura mínima recomendada
- Frontend: Next.js (App Router) hospedado no Vercel (free) com páginas públicas e área autenticada.
- Backend / CMS: PayloadCMS integrado via Next.js API routes (ou rodando como serviço separado, se preferir).
- DB: MongoDB Atlas M0 (single database) com  scoping em todas as collections.
- Storage: Cloudinary para imagens e pequenos attachments; fallback para S3 se necessário.
- Jobs: jobs leves via serverless (API route / cron) e Upstash se for preciso enfileirar.
- Autenticação: JWTs com claims  e ; middleware server-side para checagem de tenant e field-level rules.

3) Política de multitenancy (inicial)
- Implementar scoping por  nas collections, índices por  + .
- Aplicar validação no servidor para todas as operações CRUD, rejeitando queries que não contenham  correto.
- Arquitetura futura: migrar para database por tenant caso às exigências de compliance/isolamento justifiquem o custo.

4) PR1 — Scaffolding PR (conteúdo PR‑ready)
Objetivo do PR1: entregar fundação executável mínima e revisável que permita testes de isolamento e dados fictícios.

- Arquivos/artefatos a criar (sugestão):
  -  (scripts: dev, build, start, seed, test)
  -  / 
  -  (configurações básicas das collections)
  -  (arquivos TS/JS por collection listada em )
  - ,  ou  (base Next.js)
  -  (endpoint Payload se integrado)
  -  (conexão com MongoDB, leitura de  da env)
  -  (seed de dados fictícios por tenant)
  -  (testes automatizados que verificam que um tenant não vê dados de outro)
  -  (variáveis necessárias: ,  etc.)
  -  (instruções de setup local e como rodar seeds/tests)
  -  atualizados (este e o anterior)
  -  (CI básico que roda  e )

- Collections a implementar inicialmente (Payload schema minimal): tenants, users, roles, professionals, patients, services, appointments, encounters, billing_entries, consents, audit_logs, attachments.

- Seeds e dados de teste
  - Criar 2 tenants (Tenant A, Tenant B), 2 usuários por tenant (admin + professional), 3 pacientes por tenant, 5 appointments confidentes para cada tenant.
  - Test scripts que interroguem DB via API e confirmem que Tenant A não retorna dados de Tenant B.

- Testes automatizados (mínimos para PR1)
  - Unit tests para helpers de autorização.
  - Integration test:  que seed/requests API endpoints to confirm scoping.

- Critérios de aceitação do PR1 (revise antes de merge)
  - Linter e testes passam no CI.
  - Seed cria dados fictícios e os endpoints expõem dados apenas por tenant.
  - Documentação de setup e checklist de evidências (inclui prova de orçamento configurado).
  - PR marcado como draft e com revisão humana obrigatória.

5) Estimativas de esforço (PR1)
- Scaffolding + collections + seed + testes básicos: 3–6 dias de desenvolvimento (1 desenvolvedor).
- Revisão e ajustes após feedback: 1–2 dias.

6) Checklist de aprovação humana (antes de merge/produção)
- Evidência do orçamento/configuração (captura de tela ou link válido) — necessário para qualquer provisionamento pago.
- Revisão de segurança e isolamento por um revisor técnico.
- Testes de isolamento aprovados e logs de CI verdes.
- Documentação de uso e rollback.

7) Integração MongoDB Atlas
- Para desenvolvimento: pedir  com usuário de leitura/escrita limitado (evitar usar admin root token em pipelines).
- Processo seguro: o proprietário da conta insere a string no painel de Secrets (GitHub/ Vercel) ou fornece via canal seguro quando solicitado; eu documentarei as variáveis esperadas em .

8) Seguinte passo prático (minha execução)
- Gerar  (feito) e aguardar sua confirmação para:  
  - A) começar a criar o scaffolding no repositório e abrir PR‑draft (posso criar os arquivos e abrir PR agora), ou  
  - B) apenas preparar o patch PR‑ready localmente e aguardar sua autorização para abrir o PR. 

Observação: neste checkout não há código-fonte da app. Posso criar o scaffolding no repositório atual como um PR se desejar; isso adicionará os arquivos mencionados acima.

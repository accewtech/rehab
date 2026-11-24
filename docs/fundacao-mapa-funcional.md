# Fundação e Mapa Funcional — Aura (Etapa 1)

Resumo executivo
- Orçamento declarado: US0/mês total; você confirmou orçamentação operativa de US disponível para novas ações.
- Estado do repositório local: apenas , ,  (não há  nem código da aplicação neste checkout).
- Objetivo desta entrega: especificação de fundação (fluxos, collections candidatas, matriz RBAC, ameaças e retenção) + opções infra/pricing compatíveis com o teto. Esta entrega não implementa código em produção nem contrata serviços pagos.

1) Escopo desta especificação
- Verificar e registrar o que pode ser validado localmente (feito).
- Inventariar opções de infraestrutura de baixo custo (preferir free tiers) e estimativas mensais compatíveis com US restantes.
- Entregar: mapa funcional, lista de collections, matriz de acesso por papel, requisitos não‑funcionais (isolamento, retenção, i18n), estimativa de esforço e checklist de evidências (orçamento configurado) para autorizar implementação.

2) Fluxos principais (alto nível)
- Onboarding Tenant (clínica): criar tenant, contrato de consentimento, configurar administradores locais.
- Autenticação & Autorização: login com email+senha; senha+MFA opcional; tokens JWT com escopo tenant; RBAC por campo.
- Cadastros: profissionais, pacientes, serviços, equipes, salas/recursos.
- Agenda: criação/edição de eventos, regras de conflito, bloqueios, janelas de disponibilidade, notificações manuais (WhatsApp) e internas.
- Prontuário / Evoluções: registrar atendimentos, anexos (PDF, imagens), assinaturas digitais simples (metadado), arquivamento finalizado e adendos.
- Cobranças / Financeiro: lançamentos, pagamentos manuais, relatórios exportáveis (CSV).
- Consentimentos & Auditoria: gravação de consentimento, trilha de auditoria por registro e operação.

3) Collections candidatas (PayloadCMS style)
- tenants (clinicas)
- users (global, vinculado a tenantId quando aplicável)
- roles (papéis configuráveis)
- professionals (dados profissionais, vínculos)
- patients
- services (catálogo de serviços/procedimentos)
- appointments (agenda)
- encounters (prontuários / evoluções)
- billing_entries (lançamentos financeiros)
- consents
- audit_logs
- attachments (referenciados por outros documentos)
- preferences / communications (config de notificação)

Cada collection deve incluir: índices por tenantId, createdAt/updatedAt, soft delete quando aplicável.

4) Matriz de acesso (resumo)
- SuperAdmin (multi‑tenant): acesso a tenants, users, roles, leitura/gestão limitada.
- TenantAdmin: CRUD completo em dados do tenant (users, professionals, services, appointments, billing), não em outros tenants.
- Professional: CRUD limitado em own patients e suas evoluções; leitura controlada de agenda; sem acesso financeiro completo.
- Receptionist: cria/edita appointments, cria patients, gera cobranças iniciais; acesso à agenda do tenant.
- Auditor / ReadOnly: leitura de prontuários e logs com motivo de acesso registrado.

Recomendação: RBAC por claims no JWT + validação por middleware no servidor Payload/Next, com autorização baseada em  e  para campos sensíveis (ex.: dados clínicos vs. administrativos).

5) Isolamento entre clínicas
- Multitenancy: preferir single‑database + tenantId scoping nas collections (mais simples) ou database por tenant (mais isolado, custo maior).
- Começar com  scoping para reduzir custo e complexidade; projeto prevê migração para isolamento físico se necessidades de compliance exigirem.

6) Retenção e conformidade (diretrizes)
- Retenção mínima para prontuários: padrão 7 anos (ajustar conforme legislação local). Documentar política e implementá‑la como job de retenção/arquivo.
- Logs de auditoria preservados pelo menos 2 anos.
- Dados pessoais sensíveis criptografados at rest quando suportado pelo storage provider.

7) Ameaças principais e mitigação
- Acesso indevido entre tenants → validação estrita de tenantId em todas as queries.
- Exfiltração de dados → rate limiting, logs de exportação, revisão de auditoria e controles de exfil.
- Alterações não autorizadas → revisão por PR com aprovação humana; deploys manuais controlados.

8) i18n / UX
- PT‑BR inicial; chaves de tradução JSON/PO em  com fallback en/us.
- Formatação explícita de datas/moedas/fusos (Intl API) e opção de escolher timezone por tenant.
- WhatsApp: manual (abrir conversa com template mínimo); não integrar automações pagas no início.

9) Opções de infraestrutura (priorizadas por custo ≤ US/mês)
Recomendação inicial: usar apenas provedores com free tier e adotar política de escalonamento só após comprovação de orçamento.

- Frontend / Hosting Next.js
  - Vercel Hobby (Free) — ideal para App Router; deploys automáticos via Git.
  - Alternativa: Netlify / Render Free tiers.
- Database
  - MongoDB Atlas M0 (Free) — suficiente para desenvolvimento e demo com dados fictícios.
  - Alternativa paga: Atlas M2/M5 (custo variável) — *avoidar* até ter saldo.
- Redis / Jobs
  - Evitar BullMQ/Redis pago no início; usar processamento em background leve (serverless jobs) ou Upstash free (se necessário para pequenas filas).
- Storage (arquivos)
  - Vercel/Platform storage for small attachments or Cloudinary free tier for images; S3 minimal usage (custo pequeno).
- Emails / Notificações
  - Use providers com free tier or dev SMTP (Mailtrap) para testes; evitar serviços pagos.
- Observabilidade
  - Logs básicos no provider; Sentry free tier (limitado) para erros.

Estimativa de custo para configuração mínima (viável dentro do teto):
- Uso somente de free tiers: US/bin/bash/mo (Vercel free + Atlas M0 + Upstash free) — recomendado.
- Se for necessário um small paid Redis or DB: Up to US–8/mo — exige aprovação explícita.

10) Estimativa de esforço (versão inicial, PR revisável)
Fase A — Fundação mínima (PR 1, revisável): 5–10 dias
- Estrutura Payload/Next, collections listadas, autenticação básica, pages/rotas principais, seed de dados fictícios, testes de isolamento básicos.
Fase B — Funcionalidade principal (PRs por domínio): 10–30 dias adicionais (dividido por domain).

11) Checklist de evidências exigidas antes de avançar do design para implementação
- Orçamento do projeto verificado/configurado (captura de tela ou confirmação no painel) — requisito: US disponível documentado.
- Lista de serviços a contratar e custo previsto dentro do teto.
- Aprovação humana do PR de fundação antes de merge.

12) Entregáveis nesta etapa
-  (este documento)
- Estimativa de esforço por fase e checklist para aprovação

13) Próximas ações propostas (minha execução)
- (Hoje) Publicar este documento em  (feito).  
- Gerar um PR inicial com scaffolding assim que o repositório contiver o código (ou eu puder clonar a branch com o app).  
- Se desejar, tento verificar/atualizar o controle de Orçamentos no painel (exige acesso) — pedir confirmação.

Observações finais
- Sem código local, os passos de implementação ficam restritos a design e estimativas.  
- Confirme se quer que eu:  
  - A) prossiga com criação de PR scaffolding quando o código for disponibilizado, ou  
  - B) tente verificar/alterar o Orçamentos na plataforma agora (pode requerer credenciais).

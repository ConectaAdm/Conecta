---
title: "C.O.N.E.C.T.A — Documento de Análise de Requisitos"
version: "1.0"
date: "2026-09-29"
project: "ConectaAdm/Conecta"
---

C.O.N.E.C.T.A
PLATAFORMA ACADÊMICA

DOCUMENTO DE ANÁLISE DE REQUISITOS

Versão 1.0
29 de setembro de 2026

Documento elaborado a partir da análise do repositório público do projeto e da descrição funcional fornecida.

Repositório analisado:
https://github.com/ConectaAdm/Conecta

## 1. Controle do documento

| Item | Informação |
| --- | --- |
| Projeto | C.O.N.E.C.T.A – Plataforma Acadêmica |
| Documento | Especificação / Análise de Requisitos de Software |
| Versão | 1.0 |
| Data | 29/09/2026 |
| Status | Baseline inicial para validação com stakeholders |
| Fonte principal | Repositório público ConectaAdm/Conecta |
| Escopo da análise | MVP existente + requisitos necessários para consolidar a proposta do produto |

## 2. Objetivo do documento
Este documento consolida a análise de requisitos do C.O.N.E.C.T.A, uma plataforma acadêmica destinada a conectar universitários de diferentes instituições, permitindo interação acadêmica, formação de grupos de estudo, compartilhamento de materiais e networking.
A análise combina evidências observáveis no repositório com requisitos propostos para transformar o MVP em uma especificação funcional verificável. Quando um requisito não está comprovado pelo código/documentação disponível, ele é identificado como 'proposto' ou 'a validar', evitando confundir intenção do produto com funcionalidade já implementada.

## 3. Base da análise e evidências
O README do repositório descreve o C.O.N.E.C.T.A como uma plataforma para conectar universitários de todo o Brasil, com foco em grupos de estudo, materiais acadêmicos e networking. O mesmo documento informa o uso de Node.js/Express no backend, HTML5/CSS3/JavaScript no frontend e Git/GitHub para versionamento.
A estrutura publicada contém, entre outros itens, a pasta public, arquivos CSS e páginas HTML. O servidor Express disponibiliza rotas para Home, Login, Cadastro, Dashboard, Chat, Materiais, Pomodoro e Perfil. O package.json declara Express e @supabase/supabase-js como dependências.
Fonte: GitHub – ConectaAdm/Conecta, consultado em 29/09/2026. https://github.com/ConectaAdm/Conecta
Observação: a navegação pública do GitHub permitiu verificar a estrutura principal e o servidor, mas nem todas as páginas internas foram recuperadas automaticamente. Por isso, detalhes de comportamento dessas telas foram tratados como requisitos a validar quando não havia evidência suficiente.

## 4. Visão geral do produto
O C.O.N.E.C.T.A deve funcionar como uma rede acadêmica digital, na qual o estudante cria um perfil, informa sua instituição/curso e encontra outros estudantes com interesses acadêmicos compatíveis. A plataforma deve organizar a experiência em módulos de autenticação, perfil, descoberta/conexão, grupos, materiais, comunicação e produtividade.

### 4.1 Problema de negócio
- Estudantes de instituições diferentes possuem dificuldade para localizar colegas com interesses acadêmicos semelhantes.
- Materiais de estudo podem ficar dispersos em grupos de mensagens, drives e redes sociais.
- A formação de grupos de estudo depende frequentemente de canais que não foram projetados para organização acadêmica.
- Há oportunidade de reunir networking, comunicação e recursos de estudo em um único ambiente.

### 4.2 Objetivos do sistema

| ID | Objetivo | Indicador sugerido |
| --- | --- | --- |
| OBJ-01 | Permitir cadastro e identificação acadêmica dos usuários. | Taxa de cadastros concluídos |
| OBJ-02 | Facilitar a descoberta de estudantes e grupos. | Número de conexões/grupos criados |
| OBJ-03 | Centralizar materiais acadêmicos. | Quantidade de materiais publicados e acessados |
| OBJ-04 | Disponibilizar comunicação entre usuários. | Conversas e mensagens realizadas |
| OBJ-05 | Apoiar produtividade individual. | Sessões de Pomodoro iniciadas/concluídas |
| OBJ-06 | Proteger dados e interações dos usuários. | Incidentes de segurança e denúncias tratadas |

## 5. Stakeholders e atores

| Ator | Descrição | Principais necessidades |
| --- | --- | --- |
| Estudante | Usuário principal da plataforma. | Criar perfil, encontrar pessoas/grupos, conversar, estudar e compartilhar materiais. |
| Moderador/Administrador | Ator administrativo proposto. | Gerenciar denúncias, conteúdo, usuários e regras da comunidade. |
| Sistema de autenticação | Componente responsável pela identificação. | Cadastro, login, sessão e recuperação de acesso. |
| Banco/serviço de dados | Persistência da aplicação. | Armazenar usuários, perfis, mensagens, grupos e materiais. |
| Serviço de armazenamento | Componente proposto para arquivos. | Upload, download, validação e controle de materiais. |

## 6. Escopo

### 6.1 Dentro do escopo
- Autenticação e cadastro de estudantes.
- Perfil acadêmico.
- Dashboard/página inicial autenticada.
- Busca e descoberta de estudantes.
- Formação e participação em grupos de estudo.
- Compartilhamento e organização de materiais acadêmicos.
- Chat e mensagens.
- Ferramenta Pomodoro.
- Notificações.
- Denúncia e moderação.
- Persistência de dados e controle de acesso.
- Requisitos de segurança, privacidade, disponibilidade e usabilidade.

### 6.2 Fora do escopo inicial / evolução futura
- Integração obrigatória com sistemas acadêmicos das universidades.
- Emissão de certificados acadêmicos.
- Marketplace de cursos ou produtos.
- Sistema de avaliação/ranking de estudantes.
- Monetização avançada.
- Videoconferência própria, salvo decisão posterior.

## 7. Requisitos funcionais
Prioridades: MUST = indispensável para o MVP; SHOULD = importante; COULD = evolução; TBD = depende de validação.

| ID | Requisito | Descrição | Prioridade | Situação |
| --- | --- | --- | --- | --- |
| RF-001 | Cadastro de usuário | O sistema deve permitir criar uma conta informando, no mínimo, nome, e-mail, senha e dados acadêmicos essenciais. | MUST | A validar |
| RF-002 | Login | O sistema deve autenticar usuários cadastrados e iniciar uma sessão segura. | MUST | Parcial/rotas existentes |
| RF-003 | Logout | O sistema deve permitir encerramento explícito da sessão. | MUST | A validar |
| RF-004 | Recuperação de acesso | O sistema deve permitir recuperação de senha por mecanismo seguro. | MUST | A validar |
| RF-005 | Perfil acadêmico | O usuário deve visualizar e editar dados do próprio perfil, incluindo instituição, curso, período e interesses. | MUST | A validar |
| RF-006 | Dashboard | Após autenticação, o usuário deve acessar um painel com atalhos para recursos acadêmicos. | MUST | Rota existente |
| RF-007 | Busca de estudantes | O sistema deve permitir localizar usuários por instituição, curso, área e interesses, respeitando privacidade. | SHOULD | Proposto |
| RF-008 | Conexões | O usuário deve poder enviar, aceitar, recusar e remover conexões. | SHOULD | Proposto |
| RF-009 | Grupos de estudo | O usuário deve criar, editar, visualizar e participar de grupos de estudo. | MUST | Proposto |
| RF-010 | Convite para grupo | Administradores de grupo devem poder convidar ou remover participantes conforme regras definidas. | SHOULD | Proposto |
| RF-011 | Materiais | O usuário autorizado deve publicar materiais acadêmicos com título, descrição, disciplina/categoria e arquivo ou link. | MUST | Rota existente; comportamento a validar |
| RF-012 | Busca de materiais | O sistema deve permitir pesquisar e filtrar materiais. | SHOULD | Proposto |
| RF-013 | Controle de acesso a materiais | O sistema deve aplicar permissões para publicação, edição, exclusão e acesso quando houver restrição. | MUST | Proposto |
| RF-014 | Chat | O usuário deve iniciar conversas e trocar mensagens com usuários autorizados. | MUST | Rota existente |
| RF-015 | Histórico de conversa | O sistema deve preservar mensagens conforme política de retenção. | MUST | A validar |
| RF-016 | Pomodoro | O usuário deve iniciar, pausar, reiniciar e concluir sessões de estudo temporizadas. | SHOULD | Rota existente |
| RF-017 | Perfil | O usuário deve acessar sua área de perfil e atualizar informações permitidas. | MUST | Rota existente |
| RF-018 | Notificações | O sistema deve informar eventos relevantes, como novas mensagens, convites e interações. | SHOULD | Proposto |
| RF-019 | Denúncia | O usuário deve poder denunciar conteúdo ou comportamento inadequado. | MUST | Proposto |
| RF-020 | Moderação | Moderadores autorizados devem visualizar, classificar e tratar denúncias. | SHOULD | Proposto |
| RF-021 | Administração | Administradores devem poder bloquear/desbloquear contas e gerenciar conteúdo conforme permissões. | SHOULD | Proposto |
| RF-022 | Auditoria | Ações administrativas sensíveis devem gerar registros de auditoria. | SHOULD | Proposto |

## 8. Requisitos não funcionais

| ID | Categoria | Requisito | Prioridade |
| --- | --- | --- | --- |
| RNF-001 | Segurança | Senhas não devem ser armazenadas em texto puro; sessões/tokens devem ter expiração e proteção contra acesso indevido. | Alta |
| RNF-002 | Privacidade | Dados pessoais devem ser tratados segundo finalidade, necessidade e controles de acesso aplicáveis à LGPD. | Alta |
| RNF-003 | Desempenho | Páginas principais devem responder rapidamente em condições normais; metas quantitativas devem ser definidas após medição. | Alta |
| RNF-004 | Disponibilidade | O ambiente de produção deve possuir monitoramento, logs e estratégia de recuperação. | Média |
| RNF-005 | Usabilidade | Interface responsiva e compreensível em desktop e dispositivos móveis. | Alta |
| RNF-006 | Acessibilidade | A interface deve considerar navegação por teclado, contraste, textos alternativos e semântica HTML. | Média |
| RNF-007 | Compatibilidade | Compatibilidade com versões atuais dos principais navegadores. | Média |
| RNF-008 | Escalabilidade | Arquitetura deve permitir crescimento do número de usuários, grupos, mensagens e arquivos. | Alta |
| RNF-009 | Manutenibilidade | Código deve ser organizado por responsabilidades, com documentação e testes automatizados para regras críticas. | Alta |
| RNF-010 | Observabilidade | Erros e eventos relevantes devem ser registrados sem expor dados sensíveis. | Média |
| RNF-011 | Backup | Dados críticos devem possuir rotina de backup e recuperação testada. | Alta |
| RNF-012 | Integridade de arquivos | Uploads devem validar tamanho, extensão/MIME e, quando aplicável, segurança do arquivo. | Alta |

## 9. Regras de negócio
RN-001 – Somente usuários autenticados podem acessar recursos privados.
RN-002 – Cada conta deve possuir identificador único.
RN-003 – O e-mail utilizado no cadastro deve ser único.
RN-004 – Um usuário só pode editar os próprios dados, exceto ações administrativas autorizadas.
RN-005 – Um grupo deve possuir ao menos um responsável/administrador.
RN-006 – Somente membros ou usuários explicitamente autorizados podem acessar grupos privados.
RN-007 – O autor de um material pode editar/excluir o conteúdo conforme a política de retenção; administradores podem atuar em situações de moderação.
RN-008 – Mensagens devem respeitar as permissões e regras de bloqueio entre usuários.
RN-009 – Conteúdos denunciados devem permanecer identificáveis para investigação sem necessariamente ficarem públicos durante a análise.
RN-010 – Dados pessoais não devem ser exibidos além do necessário para a finalidade da interação.
RN-011 – A exclusão de conta deve seguir uma política definida para dados, mensagens, materiais e registros de auditoria.

## 10. Casos de uso

| ID | Caso de uso | Ator | Objetivo | Resultado |
| --- | --- | --- | --- | --- |
| UC-01 | Cadastrar conta | Estudante | Criar uma conta e registrar dados acadêmicos. | Conta criada e pronta para autenticação. |
| UC-02 | Autenticar-se | Estudante | Entrar na plataforma. | Sessão autenticada e acesso ao dashboard. |
| UC-03 | Editar perfil | Estudante | Atualizar informações acadêmicas e interesses. | Perfil atualizado e validado. |
| UC-04 | Encontrar estudante | Estudante | Pesquisar estudantes por critérios acadêmicos. | Lista de resultados compatíveis com filtros. |
| UC-05 | Criar grupo | Estudante | Criar grupo de estudo e definir suas características. | Grupo criado com criador como administrador. |
| UC-06 | Entrar em grupo | Estudante | Solicitar ou efetivar participação em grupo público. | Participação registrada conforme regra. |
| UC-07 | Compartilhar material | Estudante | Publicar material acadêmico. | Material validado e disponibilizado. |
| UC-08 | Conversar | Estudante | Enviar e receber mensagens. | Mensagem persistida e entregue ao destinatário. |
| UC-09 | Usar Pomodoro | Estudante | Executar uma sessão de estudo temporizada. | Sessão concluída e estado atualizado. |
| UC-10 | Denunciar conteúdo | Estudante | Reportar conteúdo/usuário. | Denúncia registrada para análise. |
| UC-11 | Tratar denúncia | Moderador | Avaliar denúncia e aplicar ação autorizada. | Caso encerrado com registro da decisão. |

## 11. Fluxos principais

### 11.1 Cadastro e acesso
1. Usuário acessa a tela de cadastro.
1. Informa dados obrigatórios.
1. Sistema valida formato e unicidade do e-mail.
1. Sistema cria a conta e registra dados acadêmicos.
1. Usuário realiza login.
1. Sistema autentica e direciona para o dashboard.

### 11.2 Formação de grupo de estudo
1. Usuário informa tema, disciplina, descrição e visibilidade.
1. Sistema cria o grupo e associa o criador como administrador.
1. Outros estudantes encontram o grupo por busca/filtro.
1. Estudantes entram ou solicitam participação conforme visibilidade.
1. Membros utilizam comunicação e compartilham materiais de acordo com permissões.

### 11.3 Compartilhamento de material
1. Usuário seleciona a opção de novo material.
1. Informa metadados e seleciona arquivo/link.
1. Sistema valida tipo, tamanho e permissões.
1. Material é persistido e associado ao autor/categoria.
1. Usuários autorizados visualizam ou baixam o conteúdo.
1. Conteúdo pode ser denunciado e encaminhado à moderação.

## 12. Modelo conceitual de dados
Entidades propostas para consolidar a solução:

| Entidade | Atributos principais | Finalidade |
| --- | --- | --- |
| USUARIO | id, nome, email, senha_hash, status, created_at, updated_at | Conta e autenticação |
| PERFIL | usuario_id, foto, bio, instituicao, curso, periodo, interesses, cidade/UF opcional | Dados acadêmicos e de apresentação |
| CONEXAO | id, solicitante_id, destinatario_id, status, created_at | Relacionamento entre estudantes |
| GRUPO | id, nome, descricao, disciplina, visibilidade, criador_id, created_at | Grupo de estudo |
| MEMBRO_GRUPO | grupo_id, usuario_id, papel, status, joined_at | Participação em grupo |
| MATERIAL | id, autor_id, grupo_id opcional, titulo, descricao, categoria, url_arquivo, tamanho, mime_type, status, created_at | Recurso acadêmico |
| MENSAGEM | id, remetente_id, destinatario_id ou conversa_id, conteudo, created_at, read_at | Comunicação |
| CONVERSA | id, tipo, created_at | Contexto de mensagens |
| POMODORO_SESSAO | id, usuario_id, inicio, fim, duracao, status | Sessões de estudo |
| NOTIFICACAO | id, usuario_id, tipo, payload, lida, created_at | Eventos para o usuário |
| DENUNCIA | id, denunciante_id, alvo_tipo, alvo_id, motivo, descricao, status, analisado_por, created_at | Moderação |
| AUDITORIA | id, usuario_id, acao, entidade, entidade_id, metadata, created_at | Rastreabilidade administrativa |

## 13. Matriz de permissões

| Recurso | Estudante | Dono/Autor | Admin/Moderador |
| --- | --- | --- | --- |
| Próprio perfil | Visualizar/editar | — | Gerenciar conforme política |
| Perfil público | Visualizar conforme privacidade | Editar próprio | Gerenciar em caso autorizado |
| Grupo | Visualizar/participar | Gerenciar grupo | Gerenciar/moderar |
| Material | Visualizar conforme acesso | Criar/editar/excluir próprio | Moderar |
| Chat | Enviar/receber conforme relação | — | Ação administrativa conforme política |
| Denúncia | Criar | — | Analisar/tratar |
| Usuários | — | — | Bloquear/desbloquear conforme permissão |
| Auditoria | — | — | Consultar conforme privilégio |

## 14. Arquitetura e requisitos técnicos observados
O repositório atual utiliza Node.js com Express no servidor, frontend baseado em HTML/CSS/JavaScript sem framework declarado e integração com Supabase indicada pela dependência @supabase/supabase-js. O servidor atual expõe páginas estáticas/HTML para as principais áreas do produto.
A especificação funcional, entretanto, deve ser independente da implementação: mudanças de framework, banco ou infraestrutura não devem alterar os requisitos de negócio.

| Camada | Estado observado | Necessidade para evolução |
| --- | --- | --- |
| Frontend | HTML5/CSS3/JavaScript Vanilla | Organização por componentes/módulos e validações consistentes. |
| Backend | Node.js + Express | API, autenticação, autorização, validação, tratamento de erros e testes. |
| Dados | Supabase está declarado como dependência | Modelagem, RLS/políticas, migrações, índices e backups. |
| Arquivos | Não comprovado no material recuperado | Definir storage, limites, tipos permitidos e política de retenção. |
| Testes | package.json não apresenta script de teste funcional | Criar testes unitários, integração e aceitação. |
| Deploy | README informa execução local; há homepage Vercel no repositório | Definir ambientes, CI/CD, variáveis e observabilidade. |

## 15. Requisitos de segurança e privacidade
- Hash seguro de senhas, com algoritmo moderno e salt adequado.
- Validação de entrada no servidor, mesmo quando houver validação no navegador.
- Proteção contra XSS, injeção, CSRF quando aplicável, enumeração de contas e abuso de endpoints.
- Controle de autorização no backend/database, não apenas ocultando elementos da interface.
- Limitação de tentativas de login e mecanismos contra abuso automatizado.
- Política clara para visibilidade de perfil, mensagens e materiais.
- Uploads com validação de tamanho, MIME e extensão; nomes de arquivo não devem ser confiados ao cliente.
- Logs sem senhas, tokens, conteúdo privado ou dados desnecessários.
- Procedimentos de exportação, correção e exclusão de dados conforme requisitos legais aplicáveis.
- Termos de uso e política de privacidade antes da disponibilização pública.

## 16. Critérios de aceitação do MVP

| ID | Área | Critério |
| --- | --- | --- |
| CA-01 | Cadastro | Usuário consegue criar conta válida; dados obrigatórios são validados; e-mail duplicado é recusado. |
| CA-02 | Login | Credenciais válidas permitem acesso; credenciais inválidas não revelam qual campo está incorreto além do necessário. |
| CA-03 | Perfil | Usuário consegue consultar e editar seu próprio perfil e não consegue editar o perfil de outro usuário. |
| CA-04 | Dashboard | Usuário autenticado acessa o painel; usuário não autenticado é impedido de acessar recursos privados. |
| CA-05 | Grupos | Usuário consegue criar grupo e participar de grupo conforme regras de visibilidade. |
| CA-06 | Materiais | Material válido pode ser publicado e consultado por usuários autorizados; arquivo inválido é rejeitado. |
| CA-07 | Chat | Mensagem enviada aparece na conversa e é associada ao remetente/destinatário corretos. |
| CA-08 | Pomodoro | Temporizador mantém estado correto durante iniciar/pausar/reiniciar/concluir. |
| CA-09 | Moderação | Denúncia gera registro e pode ser consultada por usuário autorizado. |
| CA-10 | Segurança | Rotas privadas e operações sensíveis respeitam autenticação e autorização. |

## 17. Casos de teste de alto nível

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| CT-01 | Cadastro com e-mail válido | Conta criada |
| CT-02 | Cadastro com e-mail já existente | Sistema impede duplicidade |
| CT-03 | Login com credenciais válidas | Sessão criada |
| CT-04 | Acesso a /dashboard sem autenticação | Acesso negado/redirecionado |
| CT-05 | Edição de perfil próprio | Dados atualizados |
| CT-06 | Tentativa de editar perfil de outro usuário | Operação negada |
| CT-07 | Criação de grupo | Grupo persistido |
| CT-08 | Upload de arquivo permitido | Material disponível |
| CT-09 | Upload de arquivo proibido | Upload recusado |
| CT-10 | Envio de mensagem | Mensagem persistida e entregue |
| CT-11 | Denúncia de conteúdo | Denúncia registrada |
| CT-12 | Usuário sem privilégio acessa área administrativa | Acesso negado |

## 18. Rastreabilidade de requisitos

| Objetivo | Requisitos funcionais | Requisitos não funcionais |
| --- | --- | --- |
| OBJ-01 | RF-001, RF-002, RF-003, RF-004 | RNF-001, RNF-002 |
| OBJ-02 | RF-007, RF-008, RF-009, RF-010 | RNF-005, RNF-006, RNF-008 |
| OBJ-03 | RF-011, RF-012, RF-013 | RNF-001, RNF-008, RNF-012 |
| OBJ-04 | RF-014, RF-015, RF-018 | RNF-001, RNF-003, RNF-008 |
| OBJ-05 | RF-016 | RNF-005, RNF-007 |
| OBJ-06 | RF-019, RF-020, RF-021, RF-022 | RNF-001, RNF-002, RNF-010 |

## 19. Gaps identificados no projeto atual

| ID | Tema | Constatação | Prioridade |
| --- | --- | --- | --- |
| GAP-01 | Autenticação real | As rotas de login/cadastro estão expostas, mas o material recuperado não comprova todo o fluxo de autenticação, sessão e recuperação de senha. | Alta |
| GAP-02 | API de negócio | O servidor observado é predominantemente um servidor de páginas; é necessário validar/implementar APIs para as operações de negócio. | Alta |
| GAP-03 | Autorização | É necessário comprovar controle de acesso por usuário, grupo e função. | Alta |
| GAP-04 | Persistência | A dependência Supabase existe, mas o material recuperado não comprova o modelo de dados completo. | Alta |
| GAP-05 | Upload/storage | Não foi possível comprovar política de armazenamento e validação de arquivos. | Alta |
| GAP-06 | Chat em tempo real | A existência da rota /chat não comprova entrega em tempo real nem persistência das mensagens. | Alta |
| GAP-07 | Testes automatizados | O package.json não apresenta uma suíte de testes configurada. | Média |
| GAP-08 | LGPD | É necessário documentar base legal/finalidade, retenção, direitos do titular e controles de privacidade aplicáveis. | Alta |
| GAP-09 | Observabilidade | Necessário definir logs, métricas, alertas e monitoramento de erros. | Média |
| GAP-10 | Moderação | Fluxo de denúncia/moderação deve ser especificado antes da operação pública. | Alta |

## 20. Backlog recomendado para implementação

| Épico | Módulo | Entregas | Prioridade |
| --- | --- | --- | --- |
| Épico 1 | Fundação | Autenticação, sessão, banco, autorização e estrutura de API. | MUST |
| Épico 2 | Perfil | Cadastro acadêmico, edição e privacidade. | MUST |
| Épico 3 | Dashboard | Resumo de conexões, grupos, materiais e notificações. | MUST |
| Épico 4 | Grupos | CRUD de grupos, membros, convites e permissões. | MUST |
| Épico 5 | Materiais | Upload, metadados, busca, download e moderação. | MUST |
| Épico 6 | Comunicação | Conversas, mensagens, leitura e bloqueio. | MUST |
| Épico 7 | Produtividade | Pomodoro e histórico opcional. | SHOULD |
| Épico 8 | Segurança/Moder. | Denúncias, administração, auditoria e controles de abuso. | MUST |
| Épico 9 | Qualidade | Testes, CI/CD, observabilidade e documentação técnica. | MUST |

## 21. Riscos e mitigação

| ID | Risco | Nível | Mitigação |
| --- | --- | --- | --- |
| R-01 | Exposição de dados pessoais | Alto | Privacidade por padrão, autorização no backend/database e revisão de dados exibidos. |
| R-02 | Upload malicioso | Alto | Validação MIME/extensão/tamanho, armazenamento isolado e varredura quando aplicável. |
| R-03 | Spam/abuso | Médio | Rate limiting, bloqueio, denúncias e limites de criação/envio. |
| R-04 | Crescimento de arquivos | Médio | Limites, quotas, storage adequado e política de retenção. |
| R-05 | Dependência de serviços externos | Médio | Monitoramento, documentação e plano de contingência. |
| R-06 | Requisitos incompletos | Alto | Validação com stakeholders e atualização controlada deste documento. |

## 22. Premissas e pontos a validar
- O público primário é composto por estudantes universitários.
- A plataforma deve permitir interação entre instituições diferentes.
- O MVP deve priorizar recursos acadêmicos e de comunicação, evitando funcionalidades não essenciais.
- A identidade institucional do estudante poderá ser autodeclarada no MVP, caso não exista integração oficial; isso deve ser explicitado na interface.
- A necessidade de verificação de vínculo acadêmico é um requisito de negócio a decidir.
- A visibilidade de perfil e mensagens deve ser configurável segundo política de privacidade.
- Os limites de armazenamento, tamanho de arquivos e retenção de mensagens precisam ser definidos.
- É necessário decidir se grupos podem ser públicos, privados ou ambos.
- É necessário definir se o chat será individual, em grupo ou ambos.
- É necessário definir papéis administrativos e procedimento de moderação.

## 23. Definition of Done – requisito
- Requisito possui descrição inequívoca e critério de aceitação.
- Fluxos de sucesso e falha foram definidos.
- Validações de frontend e backend foram implementadas.
- Permissões foram testadas com usuário autorizado e não autorizado.
- Testes automatizados ou testes de aceitação correspondentes foram executados.
- Logs/telemetria necessários foram implementados sem dados sensíveis.
- Documentação técnica foi atualizada.
- Interface foi validada em desktop e mobile quando aplicável.
- Não há defeitos críticos conhecidos relacionados ao requisito.

## 24. Conclusão da análise
O repositório apresenta um MVP com uma estrutura inicial coerente com a proposta do C.O.N.E.C.T.A: aplicação web em Node.js/Express, frontend em tecnologias web básicas e páginas dedicadas a login, cadastro, dashboard, chat, materiais, Pomodoro e perfil. A documentação do próprio projeto define como objetivo conectar universitários e apoiar grupos de estudo, materiais e networking.
Para que o sistema evolua de protótipo/MVP para uma plataforma acadêmica operacional, os principais pontos de especificação e validação são autenticação e autorização, persistência e modelagem de dados, grupos, materiais, chat, privacidade, moderação, testes e observabilidade. Os requisitos deste documento foram estruturados para servir como baseline de desenvolvimento e também como base para histórias de usuário, casos de uso, testes e planejamento de entregas.

## 25. Referências
- GitHub – ConectaAdm/Conecta. Repositório público do projeto. Consultado em 29/09/2026. https://github.com/ConectaAdm/Conecta
- README.md do projeto – descrição, tecnologias, estrutura e execução local.
- server.js – rotas e configuração do servidor Express.
- package.json – dependências e configuração do projeto.

## 26. Histórico de versões

| Versão | Data | Descrição | Responsável |
| --- | --- | --- | --- |
| 1.0 | 29/09/2026 | Primeira versão completa da análise de requisitos baseada no repositório público e na descrição do produto. | Análise de requisitos |


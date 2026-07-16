# Estratégia de Testes - Desafio Survey Climate CRUD

Este documento apresenta a distribuição da suíte de testes de forma a validar as regras de negócio cruciais, respeitando o orçamento restrito de 30 testes totais, além de apresentar uma análise exploratória de produto.

## 📊 Distribuição dos Testes (Orçamento: 30)

| Camada | Ferramenta | Escopo do Teste | Qtd | Status |
| :--- | :--- | :--- | :---: | :---: |
| **Unitários** | Vitest | Regras isoladas (validadores de datas, esquemas de validação e tratamento de inputs) | **12** | 100% Verdes |
| **Integração** | Vitest | Endpoints HTTP e fluxos da API batendo no banco de dados isolado | **11** | 100% Verdes |
| **End-to-End** | Playwright | Jornada do usuário no frontend (Responder pesquisa, criar nova pesquisa e aplicar filtros) | **6** | Implementados |

---

## 🎯 Escopo Detalhado

### 1. Testes Unitários (12)
* Validação do formato do nome da pesquisa (mínimo de caracteres).
* Validação de data inicial e final (data final não pode ser anterior à inicial).
* Mapeamento e validação de tipos de perguntas (múltipla escolha, texto grande, pontuação).
* Validação lógica de expiração e regras de preenchimento obrigatório.

### 2. Testes de Integração da API (11)
* `POST /pesquisas`: Criação com dados válidos.
* `POST /pesquisas`: Rejeição ao criar sem título ou perguntas.
* `GET /pesquisas`: Listagem correta e paginação.
* `POST /public/:idPublico/respostas`: Registro de respostas no banco.
* Resolução dinâmica de IDs para garantir testes isolados, idempotentes e sem acoplamento de dados estáticos.

### 3. Testes End-to-End (E2E) - Playwright (6)
* Fluxo de sucesso: Responder a uma pesquisa ativa preenchendo todos os campos.
* Fluxo de exceção: Tentar responder a uma pesquisa vencida/encerrada.
* Criação de nova pesquisa pela interface administrativa.
* Validação do filtro de status na tela inicial e comportamento de formulários.

---

## 🔍 Oportunidades de Refinamento e Análise de Produto (Exploratory Testing)

Durante o processo de testes manuais e exploratórios nas interfaces de listagem e criação de pesquisas, analisei a fundo o comportamento do sistema e identifiquei os seguintes pontos para melhoria de UX e regras de negócio:

### 🟢 Comportamentos Corretos Identificados (Validações de Sucesso)
* **Bloqueio de Lançamento Retroativo:** O formulário de criação de pesquisas impede com sucesso que o usuário selecione uma data de lançamento anterior à data atual (exibindo a mensagem correta: *"A data não pode ser anterior a hoje"*).

### 🚨 Brechas de Validação de Sistema (Bugs de Consistência)
* **Ausência de Validação no Encerramento:** Embora o campo *Data de lançamento* bloqueie datas passadas, o campo *Data de encerramento* aceita livremente datas retroativas (como datas de dias anteriores a hoje) sem exibir nenhum tipo de alerta ou bloqueio no frontend.

### 💡 Lacunas e Oportunidades de Regra de Negócio (Requirement Gaps)
* **Definição de Período para Pesquisas de Curta Duração (Flash Surveys):**
  * *O comportamento atual:* O formulário permite que a data de lançamento e de encerramento sejam exatamente no mesmo dia (ex: 16/07/2026 — 16/07/2026).
  * *Análise de Produto:* Embora pesquisas de um único dia sejam um caso de uso real de negócio, a ausência de especificação de horas/minutos na UI gera uma ambiguidade crítica: o sistema expira a pesquisa no início do dia (00:00) ou permite respostas até o fim dele (23:59)?
  * *Sugestão:* Implementar campos opcionais de horário ou, em caso de regras simplificadas, definir nos critérios de aceite que pesquisas de mesmo dia expiram estritamente às 23:59min59s.
* **Botão 'Responder' em Pesquisas Inativas:** Na listagem de pesquisas, itens com o status de "Inativa" ou com períodos agendados para o futuro mantêm o botão "Responder" totalmente visível e habilitado.
  * *Sugestão:* Aplicar a condicional `disabled` no botão "Responder" no frontend com base no período e status, mitigando requisições que seriam rejeitadas pela API e melhorando a experiência do usuário (UX).
* **Sanitização de Inputs Obrigatórios (Título e Descrição):** O sistema aceita dados puramente numéricos ou sem valor semântico (como o título e a descrição "1234") apenas por cumprirem a regra de preenchimento obrigatório.
  * *Sugestão:* Refinar os critérios de aceite para prever tamanho mínimo de caracteres e validações de formato (regex), evitando dados poluídos e lixo em produção.
# Estratégia de Testes - Desafio Survey Climate CRUD

Este documento apresenta a distribuição da suíte de testes de forma a validar as regras de negócio cruciais respeitando o orçamento restrito de 30 testes totais.

## 📊 Distribuição dos Testes (Orçamento: 30)

| Camada | Ferramenta | Escopo do Teste | Qtd |
| :--- | :--- | :--- | :---: |
| **Unitários** | Vitest | Regras isoladas (validadores de datas, esquemas Zod e tratamento de inputs) | **12** |
| **Integração** | Vitest | Endpoints HTTP e fluxos da API batendo no banco de dados real (MySQL) | **12** |
| **End-to-End** | Playwright | Jornada do usuário no frontend (Responder pesquisa, criar nova pesquisa e aplicar filtros) | **6** |

---

## 🎯 Escopo Detalhado

### 1. Testes Unitários (12)
* Validação do formato do nome da pesquisa (mínimo de caracteres).
* Validação de data inicial e final (data final não pode ser anterior à inicial).
* Mapeamento de tipos de perguntas (múltipla escolha, texto grande, pontuação, etc.).
* [Insira os outros cenários unitários mapeados...]

### 2. Testes de Integração da API (12)
* `POST /pesquisas`: Criação com dados válidos.
* `POST /pesquisas`: Rejeição ao criar sem título ou perguntas.
* `GET /pesquisas`: Listagem correta e paginação.
* `POST /public/:idPublico/respostas`: Registro de respostas no banco.
* [Insira os outros cenários de API mapeados...]

### 3. Testes End-to-End (E2E) - Playwright (6)
* Fluxo de sucesso: Responder a uma pesquisa ativa preenchendo todos os campos.
* Fluxo de exceção: Tentar responder a uma pesquisa vencida/encerrada.
* Criação de nova pesquisa pela interface administrativa.
* Validação do filtro de status (Ativa/Inativa) na tela inicial.
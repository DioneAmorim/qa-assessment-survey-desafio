# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: survey-flow.spec.ts >> Survey end-to-end flow >> should navigate back to list after viewing a survey
- Location: tests\e2e\survey-flow.spec.ts:75:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Pesquisas')
Expected: visible
Error: strict mode violation: locator('text=Pesquisas') resolved to 2 elements:
    1) <h1 class="text-2xl font-semibold text-zinc-900">Pesquisas</h1> aka getByRole('heading', { name: 'Pesquisas' })
    2) <p class="text-sm text-zinc-500">Pesquisas de clima da empresa</p> aka getByText('Pesquisas de clima da empresa')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Pesquisas')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - heading "Pesquisas" [level=1] [ref=e6]
      - paragraph [ref=e7]: Pesquisas de clima da empresa
    - button "Nova pesquisa" [ref=e8] [cursor=pointer]
  - generic [ref=e9]:
    - generic [ref=e10]: Status
    - combobox [ref=e12]:
      - option "Selecione o status" [selected]
      - option "Ativa"
      - option "Inativa"
  - generic [ref=e13]:
    - button "Nome (Z → A)" [ref=e15] [cursor=pointer]
    - table [ref=e18]:
      - rowgroup [ref=e19]:
        - row "Nome Status Período" [ref=e20]:
          - columnheader "Nome" [ref=e21]
          - columnheader "Status" [ref=e22]
          - columnheader "Período" [ref=e23]
          - columnheader [ref=e24]
      - rowgroup [ref=e25]:
        - row "Testando Inativa 08/07/3900 — 06/07/4000 Responder" [ref=e26]:
          - cell "Testando" [ref=e27]
          - cell "Inativa" [ref=e28]:
            - generic [ref=e29]: Inativa
          - cell "08/07/3900 — 06/07/4000" [ref=e30]
          - cell "Responder" [ref=e31]:
            - button "Responder" [ref=e33] [cursor=pointer]
        - row "Pesquisa Vitest 1784165453079-0f0wcg Inativa 17/07/2026 — 18/07/2026 Responder" [ref=e34]:
          - cell "Pesquisa Vitest 1784165453079-0f0wcg" [ref=e35]
          - cell "Inativa" [ref=e36]:
            - generic [ref=e37]: Inativa
          - cell "17/07/2026 — 18/07/2026" [ref=e38]
          - cell "Responder" [ref=e39]:
            - button "Responder" [ref=e41] [cursor=pointer]
        - row "Pesquisa Vitest 1784165452948-ffvu7x Inativa 17/07/2026 — 18/07/2026 Responder" [ref=e42]:
          - cell "Pesquisa Vitest 1784165452948-ffvu7x" [ref=e43]
          - cell "Inativa" [ref=e44]:
            - generic [ref=e45]: Inativa
          - cell "17/07/2026 — 18/07/2026" [ref=e46]
          - cell "Responder" [ref=e47]:
            - button "Responder" [ref=e49] [cursor=pointer]
        - row "Pesquisa Vitest 1784165325616-5khdbl Inativa 17/07/2026 — 18/07/2026 Responder" [ref=e50]:
          - cell "Pesquisa Vitest 1784165325616-5khdbl" [ref=e51]
          - cell "Inativa" [ref=e52]:
            - generic [ref=e53]: Inativa
          - cell "17/07/2026 — 18/07/2026" [ref=e54]
          - cell "Responder" [ref=e55]:
            - button "Responder" [ref=e57] [cursor=pointer]
        - row "Pesquisa Vitest 1784165325478-39sv7i Inativa 17/07/2026 — 18/07/2026 Responder" [ref=e58]:
          - cell "Pesquisa Vitest 1784165325478-39sv7i" [ref=e59]
          - cell "Inativa" [ref=e60]:
            - generic [ref=e61]: Inativa
          - cell "17/07/2026 — 18/07/2026" [ref=e62]
          - cell "Responder" [ref=e63]:
            - button "Responder" [ref=e65] [cursor=pointer]
        - row "Pesquisa Vitest 1784165065816-of08ex Inativa 17/07/2026 — 18/07/2026 Responder" [ref=e66]:
          - cell "Pesquisa Vitest 1784165065816-of08ex" [ref=e67]
          - cell "Inativa" [ref=e68]:
            - generic [ref=e69]: Inativa
          - cell "17/07/2026 — 18/07/2026" [ref=e70]
          - cell "Responder" [ref=e71]:
            - button "Responder" [ref=e73] [cursor=pointer]
        - row "Pesquisa Vitest 1784165065678-i87g27 Inativa 17/07/2026 — 18/07/2026 Responder" [ref=e74]:
          - cell "Pesquisa Vitest 1784165065678-i87g27" [ref=e75]
          - cell "Inativa" [ref=e76]:
            - generic [ref=e77]: Inativa
          - cell "17/07/2026 — 18/07/2026" [ref=e78]
          - cell "Responder" [ref=e79]:
            - button "Responder" [ref=e81] [cursor=pointer]
        - row "Pesquisa Vitest 1784165035305-jdr0rc Inativa 17/07/2026 — 18/07/2026 Responder" [ref=e82]:
          - cell "Pesquisa Vitest 1784165035305-jdr0rc" [ref=e83]
          - cell "Inativa" [ref=e84]:
            - generic [ref=e85]: Inativa
          - cell "17/07/2026 — 18/07/2026" [ref=e86]
          - cell "Responder" [ref=e87]:
            - button "Responder" [ref=e89] [cursor=pointer]
        - row "Pesquisa Vitest 1784165035146-6n3kqi Inativa 17/07/2026 — 18/07/2026 Responder" [ref=e90]:
          - cell "Pesquisa Vitest 1784165035146-6n3kqi" [ref=e91]
          - cell "Inativa" [ref=e92]:
            - generic [ref=e93]: Inativa
          - cell "17/07/2026 — 18/07/2026" [ref=e94]
          - cell "Responder" [ref=e95]:
            - button "Responder" [ref=e97] [cursor=pointer]
        - row "Pesquisa Inativa Inativa 13/07/2026 — 04/08/2026 Responder" [ref=e98]:
          - cell "Pesquisa Inativa" [ref=e99]
          - cell "Inativa" [ref=e100]:
            - generic [ref=e101]: Inativa
          - cell "13/07/2026 — 04/08/2026" [ref=e102]
          - cell "Responder" [ref=e103]:
            - button "Responder" [ref=e105] [cursor=pointer]
    - generic [ref=e107]:
      - generic [ref=e108]: Página 1 de 2
      - button "Anterior" [disabled]
      - button "Próxima" [ref=e109] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Survey end-to-end flow", () => {
  4  |   test("should load surveys and navigate to answer a public survey", async ({ page }) => {
  5  |     await page.goto("/");
  6  | 
  7  |     await expect(page.locator("text=Pesquisas")).toBeVisible();
  8  |     await expect(page.locator("[data-test-id='pesquisa-create-button']")).toBeVisible();
  9  | 
  10 |     const firstResponderButton = page.locator("[data-test-id^='pesquisa-public-button-']").first();
  11 |     await expect(firstResponderButton).toBeVisible();
  12 |     await firstResponderButton.click();
  13 | 
  14 |     await expect(page.locator("text=Enviar respostas")).toBeVisible();
  15 |   });
  16 | 
  17 |   test("should show validation error when required answer is missing", async ({ page }) => {
  18 |     await page.goto("/pesquisas/resposta/pub-ativa");
  19 | 
  20 |     await expect(page.locator("text=Enviar respostas")).toBeVisible();
  21 |     await page.click("[data-test-id='pesquisa-submit-button']");
  22 | 
  23 |     await expect(page.locator("[data-test-id='pesquisa-submit-missing']")).toBeVisible();
  24 |   });
  25 | 
  26 |   test("should submit a public survey answer successfully", async ({ page }) => {
  27 |     await page.goto("/pesquisas/resposta/pub-ativa");
  28 | 
  29 |     const textarea = page.locator("[data-test-id='resposta-texto-1']");
  30 |     if (await textarea.count()) {
  31 |       await textarea.fill("Minha experiência de teste foi ótima.");
  32 |     }
  33 | 
  34 |     const radio = page.locator("[data-test-id^='resposta-opcao-1-']").first();
  35 |     if (await radio.count()) {
  36 |       await radio.click();
  37 |     }
  38 | 
  39 |     const checkbox = page.locator("[data-test-id^='resposta-opcao-2-']").first();
  40 |     if (await checkbox.count()) {
  41 |       await checkbox.click();
  42 |     }
  43 | 
  44 |     const numberRadio = page.locator("[data-test-id^='resposta-opcao-4-']").first();
  45 |     if (await numberRadio.count()) {
  46 |       await numberRadio.click();
  47 |     }
  48 | 
  49 |     const satisfactionRadio = page.locator("[data-test-id^='resposta-opcao-5-']").first();
  50 |     if (await satisfactionRadio.count()) {
  51 |       await satisfactionRadio.click();
  52 |     }
  53 | 
  54 |     const qualityRadio = page.locator("[data-test-id^='resposta-opcao-6-']").first();
  55 |     if (await qualityRadio.count()) {
  56 |       await qualityRadio.click();
  57 |     }
  58 | 
  59 |     await page.click("[data-test-id='pesquisa-submit-button']");
  60 |     await expect(page.locator("[data-test-id='pesquisa-submit-success']")).toBeVisible();
  61 |   });
  62 | 
  63 |   test("should show various input types on a public survey page", async ({ page }) => {
  64 |     await page.goto("/pesquisas/resposta/pub-ativa");
  65 | 
  66 |     const textareaCount = await page.locator("[data-test-id^='resposta-texto-']").count();
  67 |     const radioCount = await page.locator("[data-test-id^='resposta-opcao-']").count();
  68 |     const numberInputs = await page.locator("input[type='number']").count();
  69 | 
  70 |     // At least one of the input type groups should be present on a populated survey.
  71 |     const total = textareaCount + radioCount + numberInputs;
  72 |     expect(total).toBeGreaterThan(0);
  73 |   });
  74 | 
  75 |   test("should navigate back to list after viewing a survey", async ({ page }) => {
  76 |     await page.goto("/");
  77 |     const firstResponderButton = page.locator("[data-test-id^='pesquisa-public-button-']").first();
  78 |     await expect(firstResponderButton).toBeVisible();
  79 |     await firstResponderButton.click();
  80 | 
  81 |     await page.goBack();
> 82 |     await expect(page.locator("text=Pesquisas")).toBeVisible();
     |                                                  ^ Error: expect(locator).toBeVisible() failed
  83 |   });
  84 | });
  85 | 
```
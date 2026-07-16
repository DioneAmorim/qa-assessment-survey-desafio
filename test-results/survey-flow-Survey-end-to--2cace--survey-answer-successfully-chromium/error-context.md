# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: survey-flow.spec.ts >> Survey end-to-end flow >> should submit a public survey answer successfully
- Location: tests\e2e\survey-flow.spec.ts:26:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-test-id=\'pesquisa-submit-success\']')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('[data-test-id=\'pesquisa-submit-success\']')

```

```yaml
- banner:
  - heading "Pesquisa Ativa" [level=1]
  - paragraph: Pesquisa de clima no período, ativa para respostas.
- paragraph: Conte como foi sua experiência *
- textbox "Sua resposta"
- text: Resposta obrigatória.
- paragraph: Qual área você mais utiliza?
- radio "Atendimento"
- text: Atendimento
- radio "Financeiro"
- text: Financeiro
- radio "Suporte"
- text: Suporte
- radio "Outro"
- text: Outro Justificativa
- textbox "Justifique sua resposta"
- paragraph: Quais benefícios você usa?
- checkbox "Vale refeição"
- text: Vale refeição
- checkbox "Plano de saúde"
- text: Plano de saúde
- checkbox "Gympass"
- text: Gympass
- checkbox "Outro"
- text: Outro
- paragraph: Como você avalia o ambiente (0 a 5)?
- radio "0"
- text: "0"
- radio "1"
- text: "1"
- radio "2"
- text: "2"
- radio "3"
- text: "3"
- radio "4"
- text: "4"
- radio "5"
- text: "5"
- paragraph: O quanto recomendaria a empresa (0 a 10)?
- radio "0"
- text: "0"
- radio "1"
- text: "1"
- radio "2"
- text: "2"
- radio "3"
- text: "3"
- radio "4"
- text: "4"
- radio "5"
- text: "5"
- radio "6"
- text: "6"
- radio "7"
- text: "7"
- radio "8"
- text: "8"
- radio "9"
- text: "9"
- radio "10"
- text: "10"
- paragraph: Qual seu nível de satisfação geral?
- radio "Muito satisfeito"
- text: Muito satisfeito
- radio "Satisfeito"
- text: Satisfeito
- radio "Indiferente"
- text: Indiferente
- radio "Insatisfeito"
- text: Insatisfeito
- radio "Muito insatisfeito"
- text: Muito insatisfeito
- paragraph: Como você percebe a qualidade dos processos?
- radio "Excelente"
- text: Excelente
- radio "Bom"
- text: Bom
- radio "Regular"
- text: Regular
- radio "Ruim"
- text: Ruim
- radio "Péssimo"
- text: Péssimo
- paragraph: Responda todas as perguntas obrigatórias.
- button "Enviar respostas"
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
> 60 |     await expect(page.locator("[data-test-id='pesquisa-submit-success']")).toBeVisible();
     |                                                                            ^ Error: expect(locator).toBeVisible() failed
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
  82 |     await expect(page.locator("text=Pesquisas")).toBeVisible();
  83 |   });
  84 | });
  85 | 
```
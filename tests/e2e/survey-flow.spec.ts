import { test, expect } from "@playwright/test";

test.describe("Survey end-to-end flow", () => {
  test("should load surveys and navigate to answer a public survey", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("text=Pesquisas")).toBeVisible();
    await expect(page.locator("[data-test-id='pesquisa-create-button']")).toBeVisible();

    const firstResponderButton = page.locator("[data-test-id^='pesquisa-public-button-']").first();
    await expect(firstResponderButton).toBeVisible();
    await firstResponderButton.click();

    await expect(page.locator("text=Enviar respostas")).toBeVisible();
  });

  test("should show validation error when required answer is missing", async ({ page }) => {
    await page.goto("/pesquisas/resposta/pub-ativa");

    await expect(page.locator("text=Enviar respostas")).toBeVisible();
    await page.click("[data-test-id='pesquisa-submit-button']");

    await expect(page.locator("[data-test-id='pesquisa-submit-missing']")).toBeVisible();
  });

  test("should submit a public survey answer successfully", async ({ page }) => {
    await page.goto("/pesquisas/resposta/pub-ativa");

    const textarea = page.locator("[data-test-id='resposta-texto-1']");
    if (await textarea.count()) {
      await textarea.fill("Minha experiência de teste foi ótima.");
    }

    const radio = page.locator("[data-test-id^='resposta-opcao-1-']").first();
    if (await radio.count()) {
      await radio.click();
    }

    const checkbox = page.locator("[data-test-id^='resposta-opcao-2-']").first();
    if (await checkbox.count()) {
      await checkbox.click();
    }

    const numberRadio = page.locator("[data-test-id^='resposta-opcao-4-']").first();
    if (await numberRadio.count()) {
      await numberRadio.click();
    }

    const satisfactionRadio = page.locator("[data-test-id^='resposta-opcao-5-']").first();
    if (await satisfactionRadio.count()) {
      await satisfactionRadio.click();
    }

    const qualityRadio = page.locator("[data-test-id^='resposta-opcao-6-']").first();
    if (await qualityRadio.count()) {
      await qualityRadio.click();
    }

    await page.click("[data-test-id='pesquisa-submit-button']");
    await expect(page.locator("[data-test-id='pesquisa-submit-success']")).toBeVisible();
  });

  test("should show various input types on a public survey page", async ({ page }) => {
    await page.goto("/pesquisas/resposta/pub-ativa");

    const textareaCount = await page.locator("[data-test-id^='resposta-texto-']").count();
    const radioCount = await page.locator("[data-test-id^='resposta-opcao-']").count();
    const numberInputs = await page.locator("input[type='number']").count();

    // At least one of the input type groups should be present on a populated survey.
    const total = textareaCount + radioCount + numberInputs;
    expect(total).toBeGreaterThan(0);
  });

  test("should navigate back to list after viewing a survey", async ({ page }) => {
    await page.goto("/");
    const firstResponderButton = page.locator("[data-test-id^='pesquisa-public-button-']").first();
    await expect(firstResponderButton).toBeVisible();
    await firstResponderButton.click();

    await page.goBack();
    await expect(page.locator("text=Pesquisas")).toBeVisible();
  });
});

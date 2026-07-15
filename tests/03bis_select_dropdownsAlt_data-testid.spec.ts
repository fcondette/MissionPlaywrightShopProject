import { test, expect } from "@playwright/test";

//definir les const pour réutilisation

//URL
const dropdownURL = "/exercises/select-dropdowns";

// Happy path avec utilisation de locators data-testid
test("sélectionner chaque option Niveau", async ({ page }) => {
	await page.goto(dropdownURL);
	await page.getByTestId("select-framework").selectOption("playwright");
	await page.getByTestId("select-languages").selectOption("typescript");
	await page.getByTestId("select-level").click();
	await page.getByTestId("level-option-avance").click();
	await page.getByTestId("select-submit").click();
	await expect(page.getByText("✅ Configuration enregistrée")).toBeVisible();
});

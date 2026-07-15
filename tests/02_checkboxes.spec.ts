import { test, expect } from "@playwright/test";

//definir les const pour réutilisation

//URL
const checkboxURL = "/exercises/checkboxes";

// 1 - Cocher et décocher des cases individuellement

//cocher des checkboxes non cochées, puis assertion
test("cocher checkboxes", async ({ page }) => {
	await page.goto(checkboxURL);
	await page.getByRole("checkbox", { name: "Playwright" }).check();
	await page.getByRole("checkbox", { name: "Cypress" }).check();
	await page.getByRole("checkbox", { name: "Selenium" }).check();
	await expect(
		page.getByRole("checkbox", { name: "Playwright" }),
	).toBeChecked();
	await expect(page.getByRole("checkbox", { name: "Cypress" })).toBeChecked();
	await expect(page.getByRole("checkbox", { name: "Selenium" })).toBeChecked();
});

//cocher des checkboxes puis en unselect certaines, avec assertions
test("cocher et décocher checkboxes", async ({ page }) => {
	await page.goto(checkboxURL);
	// cocher
	await page.getByRole("checkbox", { name: "Playwright" }).check();
	await page.getByRole("checkbox", { name: "Cypress" }).check();
	await page.getByRole("checkbox", { name: "Selenium" }).check();
	await expect(
		page.getByRole("checkbox", { name: "Playwright" }),
	).toBeChecked();
	await expect(page.getByRole("checkbox", { name: "Cypress" })).toBeChecked();
	await expect(page.getByRole("checkbox", { name: "Selenium" })).toBeChecked();

	// decocher
	await page.getByRole("checkbox", { name: "Cypress" }).uncheck();
	await page.getByRole("checkbox", { name: "Selenium" }).uncheck();
	await expect(
		page.getByRole("checkbox", { name: "Playwright" }),
	).toBeChecked();
	await expect(
		page.getByRole("checkbox", { name: "Cypress" }),
	).not.toBeChecked();
	await expect(
		page.getByRole("checkbox", { name: "Selenium" }),
	).not.toBeChecked();
});

//  2 - Vérifier le compteur dynamique
test("vérifier compteur", async ({ page }) => {
	await page.goto(checkboxURL);
	await page.getByRole("checkbox", { name: "Playwright" }).check();
	await page.getByRole("checkbox", { name: "Selenium" }).check();
	await page.getByRole("checkbox", { name: "JavaScript" }).check();
	await expect(page.getByText("3 compétences sélectionnées")).toBeVisible();
});

//  3 - Utiliser Tout sélectionner puis Tout désélectionner
test("utiliser Tout sélectionner puis Tout désélectionner", async ({
	page,
}) => {
	await page.goto(checkboxURL);
	await page.getByRole("button", { name: "Tout sélectionner" }).click();

	await expect(
		page.getByRole("checkbox", { name: "HTML / CSS" }),
	).toBeChecked();
	await expect(
		page.getByRole("checkbox", { name: "JavaScript" }),
	).toBeChecked();
	await expect(
		page.getByRole("checkbox", { name: "Playwright" }),
	).toBeChecked();
	await expect(page.getByRole("checkbox", { name: "Cypress" })).toBeChecked();
	await expect(page.getByRole("checkbox", { name: "Selenium" })).toBeChecked();
	await expect(page.getByRole("checkbox", { name: "Test API" })).toBeChecked();
	await expect(page.getByText("6 compétences sélectionnées")).toBeVisible();

	await page.getByRole("button", { name: "Tout désélectionner" }).click();

	await expect(
		page.getByRole("checkbox", { name: "HTML / CSS" }),
	).not.toBeChecked();
	await expect(
		page.getByRole("checkbox", { name: "JavaScript" }),
	).not.toBeChecked();
	await expect(
		page.getByRole("checkbox", { name: "Playwright" }),
	).not.toBeChecked();
	await expect(
		page.getByRole("checkbox", { name: "Cypress" }),
	).not.toBeChecked();
	await expect(
		page.getByRole("checkbox", { name: "Selenium" }),
	).not.toBeChecked();
	await expect(
		page.getByRole("checkbox", { name: "Test API" }),
	).not.toBeChecked();
	await expect(page.getByText("0 compétence sélectionnée")).toBeVisible();
});

// 4 -  Soumettre sans sélection et vérifier l'erreur
test("soumettre sans selection et vérifier erreur", async ({ page }) => {
	await page.goto(checkboxURL);
	await page.getByRole("button", { name: "Valider la sélection" }).click();
	await expect(
		page.getByText("Veuillez sélectionner au moins une compétence."),
	).toBeVisible();
});

//  5 - Sélectionner plus de 4 éléments et soumettre
test("selectionner plus de 4 élements et soumettre", async ({ page }) => {
	await page.goto("https://practice.missionplaywright.fr/exercises/checkboxes");
	await page.getByRole("button", { name: "Tout sélectionner" }).click();
	await page.getByRole("button", { name: "Valider la sélection" }).click();
	await expect(
		page.getByText("Vous pouvez sélectionner 4 compétences maximum."),
	).toBeVisible();
});

//  6 - Vérifier le message de succès après soumission valide
test("vérifier message de succès après soumission valide", async ({ page }) => {
	await page.goto(checkboxURL);
	await page.getByRole("checkbox", { name: "HTML / CSS" }).check();
	await page.getByRole("checkbox", { name: "JavaScript" }).check();
	await page.getByRole("button", { name: "Valider la sélection" }).click();
	await expect(
		page.getByText("✅ Compétences enregistrées : HTML / CSS, JavaScript"),
	).toBeVisible();
});

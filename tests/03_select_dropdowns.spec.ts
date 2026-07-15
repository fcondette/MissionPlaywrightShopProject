import { test, expect } from "@playwright/test";

//definir les const pour réutilisation

//URL
const dropdownURL = "/exercises/select-dropdowns";

// 1 -  Soumettre le formulaire sans aucune sélection

test("soumettre sans selection", async ({ page }) => {
	await page.goto(dropdownURL);
	await page.getByRole("button", { name: "Valider" }).click();
	await expect(page.getByText("Veuillez choisir un framework.")).toBeVisible();
	await expect(
		page.getByText("Veuillez choisir au moins un langage."),
	).toBeVisible();
	await expect(page.getByText("Veuillez choisir un niveau.")).toBeVisible();
});

// 2 -  Sélectionner chaque option et vérifier la valeur affichée
// A -   Framework de test dropdown

test("sélectionner chaque option Framework test", async ({ page }) => {
	await page.goto(dropdownURL);

	await page.getByLabel("Framework de test").selectOption("playwright"); //playwright option
	await expect(page.getByLabel("Framework de test")).toHaveValue("playwright");
	await page.getByLabel("Framework de test").selectOption("cypress"); //cypress option
	await expect(page.getByLabel("Framework de test")).toHaveValue("cypress");
	await page.getByLabel("Framework de test").selectOption("selenium"); //selenium option
	await expect(page.getByLabel("Framework de test")).toHaveValue("selenium");
	await page.getByLabel("Framework de test").selectOption("puppeteer"); //puppeteer option
	await expect(page.getByLabel("Framework de test")).toHaveValue("puppeteer");
});

// B -   Langages dropdown

test("sélectionner chaque option Langages", async ({ page }) => {
	await page.goto(dropdownURL);

	await page.getByLabel("Langages").selectOption("typescript"); //typescript option
	await expect(page.getByLabel("Langages")).toHaveValue("typescript");
	await page.getByLabel("Langages").selectOption("javascript"); //javascript option
	await expect(page.getByLabel("Langages")).toHaveValue("javascript");
	await page.getByLabel("Langages").selectOption("python"); //python option
	await expect(page.getByLabel("Langages")).toHaveValue("python");
	await page.getByLabel("Langages").selectOption("java"); //java option
	await expect(page.getByLabel("Langages")).toHaveValue("java");
	await page.getByLabel("Langages").selectOption("csharp"); //csharp option
	await expect(page.getByLabel("Langages")).toHaveValue("csharp");
});

// C -   Niveau dropdown -- pas de <select>
test("sélectionner chaque option Niveau", async ({ page }) => {
	await page.goto(dropdownURL);
	await page.getByLabel("Niveau").click();
	await page.getByRole("option", { name: "Débutant" }).click(); //Débutant
	await expect(page.getByLabel("Niveau")).toContainText("Débutant");

	await page.getByLabel("Niveau").click();
	await page.getByRole("option", { name: "Intermédiaire" }).click(); //Intermédiaire
	await expect(page.getByLabel("Niveau")).toContainText("Intermédiaire");

	await page.getByLabel("Niveau").click();
	await page.getByRole("option", { name: "Avancé" }).click(); //Avancé
	await expect(page.getByLabel("Niveau")).toContainText("Avancé");
});

//  3 - Tester la combinaison Playwright + Java (erreur attendue)
test("Playwright + Java = error", async ({ page }) => {
	await page.goto(dropdownURL);
	await page.getByLabel("Framework de test").selectOption("playwright"); //select playwright option

	await page.getByLabel("Langages").selectOption("java"); //select java option

	await page.getByLabel("Niveau").click();
	await page.getByRole("option", { name: "Débutant" }).click(); //Débutant
	await page.getByRole("button", { name: "Valider" }).click();
	await expect(
		page.getByText("Playwright ne supporte pas Java officiellement."),
	).toBeVisible();
});

//  4 - Réinitialiser le formulaire et vérifier que tout est vide
// a - reset et vérification que les dropdowns n'ont aucune valeur de sélectionnée

test("reset", async ({ page }) => {
	await page.goto(dropdownURL);
	await page.getByLabel("Framework de test").selectOption("selenium"); //select selenium option
	await page.getByLabel("Langages").selectOption("java"); //select java option
	await page.getByLabel("Niveau").click();
	await page.getByRole("option", { name: "Avancé" }).click(); //select Avancé
	await page.getByRole("button", { name: "Valider" }).click();

	await page.getByRole("button", { name: "Réinitialiser" }).click();
	await expect(page.getByLabel("Framework de test")).toHaveValue("");
	await expect(page.getByLabel("Langages")).toHaveValue("");
	await expect(page.getByLabel("Niveau")).toContainText("Choisir un niveau");
});

// b - reset avec assertion que le message "Configuration enregistrée" n'est plus visible
test("reset et check message configuration enregistree non visible", async ({
	page,
}) => {
	await page.goto(dropdownURL);
	await page.getByLabel("Framework de test").selectOption("playwright");
	await page.getByLabel("Langages").selectOption("typescript");
	await page.getByLabel("Niveau").click();
	await page.getByRole("option", { name: "Débutant" }).click();
	await page.getByRole("button", { name: "Valider" }).click();
	await expect(
		page.getByText(
			"✅ Configuration enregistrée : Playwright / TypeScript / Débutant",
		),
	).toBeVisible();
	await page.getByRole("button", { name: "Réinitialiser" }).click();
	await expect(
		page.getByText(
			"✅ Configuration enregistrée : Playwright / TypeScript / Débutant",
		),
	).not.toBeVisible();
});

// 5 - Remplir correctement et vérifier le message de succès
test("selection correct message succès", async ({ page }) => {
	await page.goto(dropdownURL);
	await page.getByLabel("Framework de test").selectOption("playwright");
	await page.getByLabel("Langages").selectOption("typescript");
	await page.getByLabel("Niveau").click();
	await page.getByRole("option", { name: "Débutant" }).click();
	await page.getByRole("button", { name: "Valider" }).click();
	await expect(
		page.getByText(
			"✅ Configuration enregistrée : Playwright / TypeScript / Débutant",
		),
	).toBeVisible();
});

// 6 - Vérifier que les erreurs disparaissent après correction
// a - erreur Playwright + Java
test("Playwright + Java = error puis corrigé", async ({ page }) => {
	await page.goto(dropdownURL);
	await page.getByLabel("Framework de test").selectOption("playwright"); //select playwright option

	await page.getByLabel("Langages").selectOption("java"); //select java option

	await page.getByLabel("Niveau").click();
	await page.getByRole("option", { name: "Débutant" }).click(); //Débutant
	await page.getByRole("button", { name: "Valider" }).click();
	await expect(
		page.getByText("Playwright ne supporte pas Java officiellement."),
	).toBeVisible();
	await page.getByLabel("Langages").selectOption("java"); //correction, on select typescript
	await expect(
		page.getByText("Playwright ne supporte pas Java officiellement."),
	).not.toBeVisible();
});

// b - erreur un dropdown n'a pas de valeur puis corrigé
test("dropdown sans valeur puis corrigé", async ({ page }) => {
	await page.goto(dropdownURL);
	await page.getByLabel("Framework de test").selectOption("puppeteer");
	await page.getByLabel("Niveau").click();
	await page.getByRole("option", { name: "Avancé" }).click();
	await page.getByRole("button", { name: "Valider" }).click();
	await expect(
		page.getByText("Veuillez choisir au moins un langage."),
	).toBeVisible();

	// on corrige en sélectionnant une valeur pour Langages
	await page.getByLabel("Langages").selectOption("csharp");
	await expect(
		page.getByText("Veuillez choisir au moins un langage."),
	).not.toBeVisible();
});

// 7 - Sélection multiple sur le dropdown Langages avec control et shift
// a - avec touche control
test("selection multiple sur Langages avec control", async ({ page }) => {
	await page.goto(dropdownURL);

	await page.getByLabel("Langages").selectOption("typescript"); //typescript option
	await expect(page.getByLabel("Langages")).toHaveValue("typescript");
	await page.keyboard.down("Control");
	await page.getByRole("option", { name: "JavaScript" }).click();
	await page.getByRole("option", { name: "Python" }).click();
	await page.keyboard.up("Control");
	await expect(page.getByLabel("Langages")).toHaveValue(
		"typescript",
		"javascript",
		"python",
	);
	await page.keyboard.down("Control");
	await page.getByRole("option", { name: "JavaScript" }).click();
	await expect(page.getByLabel("Langages")).toHaveValue("typescript", "python");
});

// b - avec touche shift pour select all
test("selection multiple sur Langages avec shift", async ({ page }) => {
	await page.goto(dropdownURL);
	await page.getByLabel("Langages").selectOption("typescript"); //typescript option
	await expect(page.getByLabel("Langages")).toHaveValue("typescript");
	await page.keyboard.down("Shift");
	await page.getByRole("option", { name: "C#" }).click();
	await page.keyboard.up("Shift");
	await expect(page.getByLabel("Langages")).toHaveValue(
		"typescript",
		"javascript",
		"python",
		"java",
		"csharp",
	);
});

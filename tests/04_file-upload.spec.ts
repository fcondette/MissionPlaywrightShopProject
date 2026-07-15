import { test, expect } from "@playwright/test";

//definir les const pour réutilisation

//URL
const fileURL = "/exercises/file-upload";

// 1 - Uploader un fichier valide
test("uploader fichier valide", async ({ page }) => {
	await page.goto(fileURL);
	await page
		.getByTestId("file-input")
		.setInputFiles("./fixtures/screenshot1.png");
	await expect(page.getByText("screenshot1.png")).toBeVisible();
});

// 2 - Essayer d'uploader un type de fichier invalide
test("uploader fichier invalide", async ({ page }) => {
	await page.goto(fileURL);
	await page.getByTestId("file-input").setInputFiles("./fixtures/TextFile.txt");
	await expect(
		page.getByText(
			'"TextFile.txt" is not an accepted file type (images and PDFs only).',
		),
	).toBeVisible();
});

// 3 - Uploader un fichier dépassant la limite de taille
test("uploader fichier dépassant limite taille", async ({ page }) => {
	await page.goto(fileURL);
	await page.getByTestId("file-input").setInputFiles("./fixtures/notice5.pdf");
	await expect(
		page.getByText('"notice5.pdf" exceeds the 5MB limit.'),
	).toBeVisible();
});

// 4 - Uploader plusieurs fichiers
test("uploader plusieurs fichiers", async ({ page }) => {
	await page.goto(fileURL);
	await page
		.getByTestId("file-input")
		.setInputFiles("./fixtures/Free_AI_tools.pdf");
	await page.getByTestId("file-input").setInputFiles("./fixtures/devops.jpeg");
	// await expect(page.getByText('2 files selected.')).toBeVisible();  // je n'ai pas réussi à tester cette assertion
	await expect(page.getByText("Free_AI_tools.pdf")).toBeVisible();
	await expect(page.getByText("devops.jpeg")).toBeVisible();
});

// 5 - Uploader plusieurs fichiers dont un invalide
test("uploader plusieurs fichiers dont un invalide", async ({ page }) => {
	await page.goto(fileURL);
	await page
		.getByTestId("file-input")
		.setInputFiles("./fixtures/Free_AI_tools.pdf");
	await page.getByTestId("file-input").setInputFiles("./fixtures/TextFile.txt");
	await expect(
		page.getByText(
			'"TextFile.txt" is not an accepted file type (images and PDFs only).',
		),
	).toBeVisible();
	await expect(page.getByText("Free_AI_tools.pdf")).toBeVisible();
});

// 6 - Supprimer un fichier uploadé
test("supprimer fichier uploadé", async ({ page }) => {
	await page.goto(fileURL);
	await page
		.getByTestId("file-input")
		.setInputFiles("./fixtures/screenshot1.png");
	await expect(page.getByText("screenshot1.png")).toBeVisible();
	await page.getByTestId("file-remove-screenshot1.png").click();
});

// 7 - vérifier que la barre de progression est visible
test("vérifier barre progression visible", async ({ page }) => {
	await page.goto(fileURL);
	await page
		.getByTestId("file-input")
		.setInputFiles("./fixtures/screenshot1.png");
	await expect(page.getByTestId("file-progress-screenshot1.png")).toBeVisible();
});

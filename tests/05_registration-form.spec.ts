import { test, expect } from "@playwright/test";

//definir les const pour réutilisation

//URL
const registrationURL = "/exercises/registration-form";

//hook pour mutualiser
test.beforeEach(async ({ page }) => {
	await page.goto(registrationURL);
});

// 1 -  Soumettre avec tous les champs vides
test("soumettre formulaire champs vide", async ({ page }) => {
	await page.getByRole("button", { name: "Create Account" }).click();
	await expect(page.getByText("Name is required")).toBeVisible();
	await expect(page.getByText("Email is required")).toBeVisible();
	await expect(page.getByText("Password is required")).toBeVisible();
	await expect(page.getByText("You must accept the terms")).toBeVisible();
});

// 2 - Tester la validation email avec différents formats
// A - email valide
test("email valide", async ({ page }) => {
	await page.getByLabel("Full Name").fill("Jane Doe");
	await page.getByLabel("Email").fill("jane@example.com");
	await page.getByLabel("Password", { exact: true }).fill("123456789");
	await page.getByLabel("Confirm Password", { exact: true }).fill("123456789");
	await page
		.getByRole("checkbox", { name: "I accept the terms and conditions" })
		.check();
	await expect(
		page.getByRole("checkbox", { name: "I accept the terms and conditions" }),
	).toBeChecked();
	await page.getByRole("button", { name: "Create Account" }).click();
	await expect(page.getByText("Registration complete!")).toBeVisible();
	await expect(page.getByText("Welcome, Jane Doe.")).toBeVisible();
});

// version alternative avec locator getByTestId au lieu de getByLabel ou getByRole
// await page.getByTestId('registration-name').fill('Jane Doe');
//  etc

// B - emails invalides
test("email invalide 1", async ({ page }) => {
	await page.getByLabel("Email").fill("jane@example");
	await page.getByRole("button", { name: "Create Account" }).click();
	await expect(page.getByText("Invalid email format")).toBeVisible();
});

test("email invalide 2", async ({ page }) => {
	await page.getByLabel("Email").fill("janeàexample.com");
	await page.getByRole("button", { name: "Create Account" }).click();
	await expect(page.getByText("Invalid email format")).toBeVisible();
});

test("email invalide 3", async ({ page }) => {
	await page.getByLabel("Email").fill("$$$$$$");
	await page.getByRole("button", { name: "Create Account" }).click();
	await expect(page.getByText("Invalid email format")).toBeVisible();
});

// 3 - Tester l'exigence de longueur du mot de passe
// A - exigence respectée
test("longueur mot de passe exigence respectée", async ({ page }) => {
	await page.getByLabel("Password", { exact: true }).fill("12345678");
	await page.getByRole("button", { name: "Create Account" }).click();
	await expect(
		page.getByText("Password must be at least 8 characters"),
	).not.toBeVisible();
});

// B - exigence non respectée
test("longueur mot de passe exigence non respectée", async ({ page }) => {
	await page.getByLabel("Password", { exact: true }).fill("1234567");
	await page.getByRole("button", { name: "Create Account" }).click();
	await expect(
		page.getByText("Password must be at least 8 characters"),
	).toBeVisible();
});

//  4 - Vérifier l'erreur de non-concordance des mots de passe
test("non concordance mots de passe", async ({ page }) => {
	await page.getByLabel("Password", { exact: true }).fill("motdepasse1");
	await page
		.getByLabel("Confirm Password", { exact: true })
		.fill("motdepasse2");
	await page.getByRole("button", { name: "Create Account" }).click();
	await expect(page.getByText("Passwords do not match")).toBeVisible();
});

// 5 - Vérifier que la case CGU est obligatoire
test("case CGU obligatoire", async ({ page }) => {
	await page.getByLabel("Full Name").fill("Jane Doe");
	await page.getByLabel("Email").fill("jane@example.com");
	await page.getByLabel("Password", { exact: true }).fill("123456789");
	await page.getByLabel("Confirm Password", { exact: true }).fill("123456789");
	await page.getByRole("button", { name: "Create Account" }).click();
	await expect(page.getByText("You must accept the terms")).toBeVisible();
});

// Extra - 6 - vérifier que les champs passwords sont de type "password"
// Vérifier que la case CGU est obligatoire
test("type de champ password = password", async ({ page }) => {
	await expect(page.getByLabel("Password", { exact: true })).toHaveAttribute(
		"type",
		"password",
	);
	await expect(
		page.getByLabel("Confirm Password", { exact: true }),
	).toHaveAttribute("type", "password");
});

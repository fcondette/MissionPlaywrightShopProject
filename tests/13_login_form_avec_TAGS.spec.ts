import { test, expect } from "@playwright/test";

//definir les const pour réutilisation
// credentials valides
const email = "test@example.com";
const motDePasse = "password123";

// credentials invalides
const invalidEmail = "test2@example.com";
const invalidMotDePasse = "wrongpassword";

//URL
const loginURL = "/exercises/login-form";

// 1 - Tester avec des identifiants valides et invalides

//login identifiants valides et assertion
test.describe("Tests de login", { tag: "@login" }, () => {
	test(
		"login avec identifiants valides",
		{ tag: ["@login-valide"] },

		async ({ page }) => {
			await page.goto(loginURL);
			await page.getByLabel("Email").fill(email);
			await page.getByLabel("Password").fill(motDePasse);
			await page.getByRole("button", { name: "Sign In" }).click();
			await expect(
				page.getByText("Login successful! Welcome back."),
			).toBeVisible();
		},
	);

	//login email invalide, mot de passe valide et assertion
	test("login avec email invalide", async ({ page }) => {
		await page.goto(loginURL);
		await page.getByLabel("Email").fill(invalidEmail);
		await page.getByLabel("Password").fill(motDePasse);
		await page.getByRole("button", { name: "Sign In" }).click();
		await expect(page.getByText("Invalid email or password.")).toBeVisible();
	});

	//login email valide, mot de passe invalide et assertion
	test("login avec mot de passe invalide", async ({ page }) => {
		await page.goto(loginURL);
		await page.getByLabel("Email").fill(email);
		await page.getByLabel("Password").fill(invalidMotDePasse);
		await page.getByRole("button", { name: "Sign In" }).click();
		await expect(page.getByText("Invalid email or password.")).toBeVisible();
	});

	// 2 - Vérifier les messages d'erreur pour les champs vides

	// Login avec champs Email et Password vides et assertion
	test("champs Email et Password vides", async ({ page }) => {
		await page.goto(loginURL);
		await page.getByLabel("Email").fill("");
		await page.getByLabel("Password").fill("");
		await page.getByRole("button", { name: "Sign In" }).click();
		await expect(page.getByText("Email is required")).toBeVisible();
		await expect(page.getByText("Password is required")).toBeVisible();
	});

	// Login avec champ Email vide/mot de passe valide et assertion
	test("champ Email vide", async ({ page }) => {
		await page.goto(loginURL);
		await page.getByLabel("Email").fill("");
		await page.getByLabel("Password").fill(motDePasse);
		await page.getByRole("button", { name: "Sign In" }).click();
		await expect(page.getByText("Email is required")).toBeVisible();
	});

	// Login avec Email/champ Password vide et assertion
	test("champ Password vide", async ({ page }) => {
		await page.goto(loginURL);
		await page.getByLabel("Email").fill(email);
		await page.getByLabel("Password").fill("");
		await page.getByRole("button", { name: "Sign In" }).click();
		await expect(page.getByText("Password is required")).toBeVisible();
	});

	//  3 - Vérifier l'état de chargement du bouton de soumission

	// Bouton Sign In désactivé pendant chargement, puis assert que bouton est activé après chargement
	test("état bouton Sign In", async ({ page }) => {
		await page.goto(loginURL);
		await page.getByLabel("Email").fill(email);
		await page.getByLabel("Password").fill(motDePasse);
		await page.getByRole("button", { name: "Sign In" }).click();
		await expect(
			page.getByRole("button", { name: "Signing In" }),
		).toBeDisabled();
		await expect(
			page.getByText("Login successful! Welcome back."),
		).toBeVisible();
		await expect(page.getByRole("button", { name: "Sign In" })).toBeEnabled();
	});

	// 4 - Tester la navigation clavier (Tab, Shift+Tab, Entrée)
	test("navigation clavier tab et Entrée", async ({ page }) => {
		await page.goto(loginURL);
		await page.getByLabel("Email").fill(email);
		await page.keyboard.press("Tab");
		await page.keyboard.press("Shift+Tab"); //test retour champ d'origine
		await page.keyboard.press("Tab");
		await page.getByLabel("Password").fill(motDePasse);
		await page.keyboard.press("Enter");
		await expect(
			page.getByText("Login successful! Welcome back."),
		).toBeVisible();
	});

	//  5 - Vérifier que le type du champ mot de passe est "password"
	test("champ mot de passe est de type password", async ({ page }) => {
		await page.goto(loginURL);
		await expect(page.getByLabel("Password")).toHaveAttribute(
			"type",
			"password",
		);
	});
});

import { test, expect } from "../fixtures";

// // Je me loggue d'abord via process et env = pas besoin ici
// test.beforeEach(async ({ page }) => {
//   await page.goto('/login');
//   await page.getByTestId('login-link').click();
//   await page.getByLabel('Email').fill(process.env.TEST_USER);
//   await page.getByLabel('Mot de passe').fill(process.env.TEST_PASSWORD);
//   await page.getByRole('button', { name: 'Se connecter' }).click();
//   await page.getByTestId('account-menu-trigger').click();
// })

// test
test("remplir formulaire", async ({ registration, page }) => {
	await registration.goto();
	await registration.fillForm(
		"Frederic",
		"fred@test.com",
		"12345678",
		"12345678",
	);
	await registration.acceptTerms();
	await registration.submitForm();

	//on asserte
	// await registration.expectSuccess('Registration complete!');  // assert via le POM
	// await registration.expectSuccess('Welcome, Frederic.');  // assert via le POM

	await expect(page.getByText("Registration complete!")).toBeVisible();
	await expect(page.getByText("Welcome, Frederic.")).toBeVisible();
});

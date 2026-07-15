import { test, expect } from "../fixtures";
import { generateCheckoutData } from "../helpers/testData";

// Je me loggue d'abord via process et env
test.beforeEach(async ({ page }) => {
	await page.goto("/login");
	await page.getByTestId("login-link").click();
	await page.getByLabel("Email").fill(process.env.TEST_USER);
	await page.getByLabel("Mot de passe").fill(process.env.TEST_PASSWORD);
	await page.getByRole("button", { name: "Se connecter" }).click();
	await page.getByTestId("account-menu-trigger").click();
});

// test
test("remplir formulaire en utilisant Faker", async ({ checkoutfaker }) => {
	const data = generateCheckoutData();

	await checkoutfaker.goto();
	await checkoutfaker.fillForm(data);
});

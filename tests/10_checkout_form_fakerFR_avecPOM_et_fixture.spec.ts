import { test, expect } from "../fixtures";
import { fakerFR as faker } from "@faker-js/faker";

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
test("remplir formulaire en utilisant Faker", async ({ checkout, page }) => {
	await checkout.goto();
	await page.getByTestId("checkout-name").fill(faker.person.fullName());
	await page
		.getByTestId("checkout-address")
		.fill(faker.location.streetAddress());
	await page.getByTestId("checkout-city").fill(faker.location.city());
	await page.getByTestId("checkout-zip").fill(faker.location.zipCode());
});

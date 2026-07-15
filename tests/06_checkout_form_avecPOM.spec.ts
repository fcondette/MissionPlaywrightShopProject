import { test, expect } from "@playwright/test";
import { CheckoutPage } from "../pages/checkoutPage";

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
test("remplir formulaire", async ({ page }) => {
	const checkoutPage = new CheckoutPage(page);
	await checkoutPage.goto();
	await checkoutPage.fillForm1(
		"Frederic",
		"6 rue de la mairie",
		"Quimper",
		"29000",
	);
	await checkoutPage.next();
	await expect(page.getByText("Step 2 of 3: Payment")).toBeVisible();
	await checkoutPage.fillForm2("5922222222212212232321213", "10/28", "489");
	await checkoutPage.next();
	await expect(page.getByText("Step 3 of 3: Review")).toBeVisible();
	await expect(page.getByTestId("checkout-review-shipping")).toBeVisible();
	await expect(page.getByTestId("checkout-review-payment")).toBeVisible();
	await checkoutPage.checkout();
	await expect(
		page.getByRole("heading", { name: "Order confirmed!" }),
	).toBeVisible();
	await expect(page.getByText("Order #QA-")).toBeVisible();
});

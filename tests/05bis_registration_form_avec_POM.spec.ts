import { test } from "@playwright/test";
import { RegistrationPage } from "../pages/registrationPage";

test("remplir formulaire", async ({ page }) => {
	const registrationPage = new RegistrationPage(page);

	await registrationPage.goto();
	await registrationPage.fillForm(
		"Frederic",
		"fred@test.com",
		"12345678",
		"12345678",
	);
	await registrationPage.acceptTerms();
	await registrationPage.submitForm();
});

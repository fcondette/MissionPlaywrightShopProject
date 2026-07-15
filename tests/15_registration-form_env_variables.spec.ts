import { test, expect } from "@playwright/test";

test("remplir formulaire avec env", async ({ page }) => {
	//on récupère l'URL de base située dans le fichier env puis on ajoute le chemin spécifique
	await page.goto(`${process.env.URL!}exercises/registration-form`);

	//on récupère les variables d'env
	await page.getByTestId("registration-name").fill(process.env.FIRSTNAME!);
	await page.getByTestId("registration-email").fill(process.env.EMAIL!);
	await page.getByTestId("registration-password").fill(process.env.PASSWORD!);
	await page
		.getByTestId("registration-confirmPassword")
		.fill(process.env.PASSWORD!);

	//suite du test case, pour finaliser
	await page
		.getByRole("checkbox", { name: "I accept the terms and conditions" })
		.check();

	await page.getByRole("button", { name: "Create Account" }).click();
	await expect(page.getByText("Registration complete!")).toBeVisible();
	await expect(page.getByText("Welcome, John.")).toBeVisible();
});

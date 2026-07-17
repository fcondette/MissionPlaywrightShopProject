import { test, expect } from "../fixtures";
import { existingUser } from "../helpers/testData";

// 1 - User signs in with valid data
test("user can sign IN with valid credentials", async ({ authPage, page }) => {
	const user = existingUser();

	await authPage.goto();
	await authPage.goToSigninTab();
	await authPage.signinForm.fillForm(user.email, user.password);
	await authPage.signinForm.submit();
	await expect(
		page.getByText("Connexion réussie", { exact: true }),
	).toBeVisible();
});

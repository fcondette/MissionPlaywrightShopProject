import { test, expect } from "../fixtures";
import { generateUser } from "../helpers/testData";

// 1 - Create account with valid data
test("user can sign UP with valid credentials", async ({ authPage, page }) => {
	const user = generateUser();

	await authPage.goto();
	await authPage.goToSignupTab();
	await authPage.signupForm.fillForm(
		user.fullName,
		user.email,
		user.password,
		user.password,
	);
	await authPage.signupForm.create();
	await expect(
		page.getByText("Inscription réussie !", { exact: true }),
	).toBeVisible();
});

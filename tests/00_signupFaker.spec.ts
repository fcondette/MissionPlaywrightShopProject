import { test, expect } from "../fixtures";
import { generateUserFaker } from "../helpers/testData";

// 1 - Create account using faker
test("user can sign UP with faker", async ({ authPage, page }) => {
	const user = generateUserFaker();

	await authPage.goto();
	await authPage.goToSignupTab();
	await authPage.signupFormFaker.fillForm(
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

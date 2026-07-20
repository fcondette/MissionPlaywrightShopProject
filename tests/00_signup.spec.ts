import { test, expect } from "../fixtures";
import { generateInvalidUser, generateUser } from "../helpers/testData";

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

// 2 - Create account with invalid data
test("user CANNOT sign UP with invalid credentials", async ({
	authPage,
	page,
}) => {
	const user = generateInvalidUser();

	await authPage.goto();
	await authPage.goToSignupTab();
	await authPage.signupForm.fillForm(
		user.fullName,
		user.email,
		user.password,
		user.password,
	);
	await authPage.signupForm.create();
	await expect(page.getByText("Adresse email invalide")).toBeVisible();
});

// 3 - Empty form => error
test("user CANNOT sign UP when the form is empty", async ({
	authPage,
	page,
}) => {
	await authPage.goto();
	await authPage.goToSignupTab();
	await authPage.signupForm.create();
	await expect(
		page.getByText("Le nom doit contenir au moins 2 caractères"),
	).toBeVisible();
	await expect(page.getByText("Adresse email invalide")).toBeVisible();
	await expect(
		page.getByText("Le mot de passe doit contenir au moins 6 caractères"),
	).toBeVisible();
});

// 4 - Check the Password and Confirm password fields have the Password attribute
test("password and confirm password fields have password attribute", async ({
	authPage,
	page,
}) => {
	await authPage.goto();
	await authPage.goToSignupTab();
	await expect(authPage.signupForm.passwordInput).toHaveAttribute(
		"type",
		"password",
	);
	await expect(authPage.signupForm.confirmPasswordInput).toHaveAttribute(
		"type",
		"password",
	);
});

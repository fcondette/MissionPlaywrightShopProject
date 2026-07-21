import { test, expect } from "../fixtures";
import { existingUser, nonRegisteredUser } from "../helpers/testData";

// 1 - User can sign in with valid credentials
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

// 2 - User cannot sign in with invalid credentials
test("user CANNOT sign IN using invalid credentials", async ({
	authPage,
	page,
}) => {
	const user = nonRegisteredUser();

	await authPage.goto();
	await authPage.goToSigninTab();
	await authPage.signinForm.fillForm(user.email, user.password);
	await authPage.signinForm.submit();
	await expect(
		page.getByText("Erreur de connexion", { exact: true }),
	).toBeVisible();
	await expect(
		page.getByText("Email ou mot de passe incorrect", { exact: true }),
	).toBeVisible();
});

// 3 - Back button returns from forgot password view to signin view
test("back button returns from forgot password view to signin view", async ({
	authPage,
	page,
}) => {
	await authPage.goto();
	await authPage.goToSigninTab();
	await authPage.signinForm.clickForgotLink();

	await expect(
		page.getByText("Mot de passe oublié", { exact: true }),
	).toBeVisible();
	await authPage.signinForm.back();
	await expect(
		page.getByText("Accédez à votre espace personnel", { exact: true }),
	).toBeVisible();
	await expect(authPage.signinForm.emailInput).toBeVisible();
	await expect(authPage.signinForm.passwordInput).toBeVisible();
});

// 4 - User can request a password reset link
test("user can request a password reset link", async ({ authPage, page }) => {
	const user = existingUser();

	await authPage.goto();
	await authPage.goToSigninTab();

	await authPage.signinForm.clickForgotLink();

	await authPage.signinForm.fillFormReset(user.email);
	await authPage.signinForm.sendLink();
	await expect(page.getByText("Email envoyé", { exact: true })).toBeVisible();
	await expect(
		page.getByText(
			"Vérifiez votre boîte mail pour réinitialiser votre mot de passe.",
			{ exact: true },
		),
	).toBeVisible();
});

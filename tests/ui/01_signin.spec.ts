import { test, expect } from "../../fixtures";
import {
	existingUser,
	existingUserMixedCase,
	existingUserWrongPassword,
	nonRegisteredUser,
} from "../../helpers/testData";

test.describe("Signin - credential validation", () => {
	// 1 - User can sign in with valid credentials
	test("user can sign IN with valid credentials", async ({
		authPage,
		page,
	}) => {
		const user = existingUser();

		await authPage.goto();
		await authPage.goToSigninTab();
		await authPage.signinForm.fillForm(user.email, user.password);
		await authPage.signinForm.submit();
		await expect(page).toHaveURL(`${process.env.BASE_URL}/`);
		await expect(
			page.getByText("Connexion réussie", { exact: true }),
		).toBeVisible();
	});

	// 2 - User can sign in with valid credentials -- Testing case-insensitivity of email
	test("user can sign IN with valid credentials; case-insensitivity", async ({
		authPage,
		page,
	}) => {
		const user = existingUserMixedCase();

		await authPage.goto();
		await authPage.goToSigninTab();
		await authPage.signinForm.fillForm(user.email, user.password);
		await authPage.signinForm.submit();
		await expect(page).toHaveURL(`${process.env.BASE_URL}/`);
		await expect(
			page.getByText("Connexion réussie", { exact: true }),
		).toBeVisible();
	});

	// 3 - User cannot sign in: valid email, wrong password
	test("user cannot sign IN with valid email and wrong password", async ({
		authPage,
		page,
	}) => {
		const user = existingUserWrongPassword();

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

	// 4 - User cannot sign in with invalid credentials
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

	// 5 - All fields empty submission
	test("all fields empty submission", async ({ authPage, page }) => {
		await authPage.goto();
		await authPage.goToSigninTab();
		await authPage.signinForm.submit();
		await expect(
			page.getByText("Adresse email invalide", {
				exact: true,
			}),
		).toBeVisible();
		await expect(
			page.getByText("Le mot de passe doit contenir au moins 6 caractères", {
				exact: true,
			}),
		).toBeVisible();
	});

	// 6 - Valid email filled, password empty
	test("valid email filled, password empty", async ({ authPage, page }) => {
		const user = existingUser();
		await authPage.goto();
		await authPage.goToSigninTab();
		await authPage.signinForm.fillEmail(user.email);
		await authPage.signinForm.submit();
		await expect(
			page.getByText("Le mot de passe doit contenir au moins 6 caractères", {
				exact: true,
			}),
		).toBeVisible();
		await expect(
			page.getByText("Adresse email invalide", {
				exact: true,
			}),
		).not.toBeVisible();
	});

	// 7 - Email empty, valid password filled
	test("email empty, valid password filled", async ({ authPage, page }) => {
		const user = existingUser();
		await authPage.goto();
		await authPage.goToSigninTab();
		await authPage.signinForm.fillPassword(user.password);
		await authPage.signinForm.submit();
		await expect(
			page.getByText("Adresse email invalide", {
				exact: true,
			}),
		).toBeVisible();
		await expect(
			page.getByText("Le mot de passe doit contenir au moins 6 caractères", {
				exact: true,
			}),
		).not.toBeVisible();
	});
});

test.describe("Signin - forgot password flow", () => {
	// 8 - Back button returns from forgot password view to signin view
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

	// 9 - User can request a password reset link
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
});

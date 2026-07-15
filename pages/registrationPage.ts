//registration form page

import { Page, Locator, expect } from "@playwright/test";

export class RegistrationPage {
	private readonly nameInput: Locator;
	private readonly emailInput: Locator;
	private readonly passwordInput: Locator;
	private readonly confirmpasswordInput: Locator;
	private readonly termsCheckbox: Locator;
	private readonly createAccountButton: Locator;
	private readonly registrationSuccess: Locator;

	// ci-dessous, j'ai volontairement mixé des get by test id et des get by role
	constructor(private readonly page: Page) {
		this.nameInput = page.getByTestId("registration-name");
		this.emailInput = page.getByTestId("registration-email");
		this.passwordInput = page.getByTestId("registration-password");
		this.confirmpasswordInput = page.getByTestId(
			"registration-confirmPassword",
		);
		this.termsCheckbox = page.getByRole("checkbox", {
			name: "I accept the terms and conditions",
		});
		this.createAccountButton = page.getByRole("button", {
			name: "Create Account",
		});
		this.registrationSuccess = page.getByTestId("registration-success");
	}

	async goto() {
		await this.page.goto("/exercises/registration-form");
	}

	async fillForm(
		nom: string,
		email: string,
		password: string,
		confirm: string,
	) {
		await this.nameInput.fill(nom);
		await this.emailInput.fill(email);
		await this.passwordInput.fill(password);
		await this.confirmpasswordInput.fill(confirm);
	}

	async acceptTerms() {
		await this.termsCheckbox.check();
	}

	async submitForm() {
		await this.createAccountButton.click();
	}

	async expectSuccess(message: string) {
		await expect(this.registrationSuccess).toContainText(message);
	}
}

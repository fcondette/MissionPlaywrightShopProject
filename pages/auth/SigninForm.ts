//signin page

import { Page, Locator } from "@playwright/test";

export class SigninForm {
	readonly emailInput: Locator;
	readonly passwordInput: Locator;
	private readonly submitButton: Locator;
	private readonly forgotPasswordLink: Locator;
	private readonly forgotEmailInput: Locator;
	private readonly forgotSubmitButton: Locator;
	private readonly forgotBackButton: Locator;

	constructor(private readonly page: Page) {
		this.emailInput = page.getByTestId("login-email-input");
		this.passwordInput = page.getByTestId("login-password-input");
		this.submitButton = page.getByTestId("login-submit-button");
		this.forgotPasswordLink = page.getByTestId("forgot-password-link");
		//or with getByRole:
		//this.forgotPassword = page.getByRole('button', {name: 'Mot de passe oublié ?'});
		this.forgotEmailInput = page.getByTestId("forgot-email-input");
		this.forgotSubmitButton = page.getByTestId("forgot-submit-button");
		this.forgotBackButton = page.getByTestId("forgot-back-button");
	}

	async fillForm(email: string, password: string) {
		await this.emailInput.fill(email);
		await this.passwordInput.fill(password);
	}
	async fillFormReset(email: string) {
		await this.forgotEmailInput.fill(email);
	}

	async submit() {
		await this.submitButton.click();
	}
	async clickForgotLink() {
		await this.forgotPasswordLink.click();
	}

	async sendLink() {
		await this.forgotSubmitButton.click();
	}
	async back() {
		await this.forgotBackButton.click();
	}
}

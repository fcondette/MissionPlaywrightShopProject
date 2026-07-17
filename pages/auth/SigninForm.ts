//signin page

import { Page, Locator } from "@playwright/test";

export class SigninForm {
	private readonly emailInput: Locator;
	private readonly passwordInput: Locator;
	private readonly submitButton: Locator;

	constructor(private readonly page: Page) {
		this.emailInput = page.getByTestId("login-email-input");
		this.passwordInput = page.getByTestId("login-password-input");
		this.submitButton = page.getByTestId("login-submit-button");
	}

	async fillForm(email: string, password: string) {
		await this.emailInput.fill(email);
		await this.passwordInput.fill(password);
	}
	async submit() {
		await this.submitButton.click();
	}
}

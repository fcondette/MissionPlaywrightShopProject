//signup page faker

import { Page, Locator } from "@playwright/test";

export class SignupFormFaker {
	private readonly fullnameInput: Locator;
	private readonly emailInput: Locator;
	private readonly passwordInput: Locator;
	private readonly confirmPasswordInput: Locator;
	private readonly createButton: Locator;

	constructor(private readonly page: Page) {
		this.fullnameInput = page.getByTestId("signup-name-input");
		this.emailInput = page.getByTestId("signup-email-input");
		this.passwordInput = page.getByTestId("signup-password-input");
		this.confirmPasswordInput = page.getByTestId(
			"signup-confirm-password-input",
		);
		this.createButton = page.getByTestId("signup-submit-button");
	}

	async fillForm(
		name: string,
		email: string,
		password: string,
		confirmpassword: string,
	) {
		await this.fullnameInput.fill(name);
		await this.emailInput.fill(email);
		await this.passwordInput.fill(password);
		await this.confirmPasswordInput.fill(confirmpassword);
	}
	async create() {
		await this.createButton.click();
	}
}

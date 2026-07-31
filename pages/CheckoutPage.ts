import { Page } from "@playwright/test";
import { AuthPage } from "./auth/AuthPage";

export class CheckoutPage {
	constructor(private readonly page: Page) {}

	async goToLogin(): Promise<AuthPage> {
		await this.page.getByTestId("checkout-login-button").click();
		return new AuthPage(this.page);
	}
}

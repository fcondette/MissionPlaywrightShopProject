//login form page

import { Page } from "@playwright/test";

export class LoginPage {
	constructor(private readonly page: Page) {}

	async goto() {
		await this.page.goto("/login");
	}

	async login(email: string, password: string) {
		await this.page.getByLabel("Email").fill(email);
		await this.page.getByLabel("Mot de passe").fill(password);
		await this.page.getByRole("button", { name: "Se connecter" }).click();
		await this.page.getByTestId("account-menu-trigger").click();
	}
}

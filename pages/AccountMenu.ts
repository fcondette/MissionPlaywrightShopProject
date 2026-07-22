import { Page, Locator } from "@playwright/test";

export class AccountMenu {
	private readonly userMenuButton: Locator;
	private readonly logoutOption: Locator;
	private readonly accountOption: Locator;

	constructor(private readonly page: Page) {
		this.userMenuButton = page.getByTestId("user-menu-button");
		this.logoutOption = page.getByTestId("logout-button");
		this.accountOption = page.getByTestId("account-link");
	}

	async openMenu() {
		await this.userMenuButton.click();
	}

	async openAccount() {
		await this.openMenu();
		await this.accountOption.click();
	}

	async logout() {
		await this.openMenu();
		await this.logoutOption.click();
	}
}

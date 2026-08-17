import { Page, Locator } from "@playwright/test";

export class OrderHistory {
	constructor(private readonly page: Page) {}

	async expandOrder(orderId: string): Promise<void> {
		await this.page.getByTestId(`account-order-toggle-${orderId}`).click();
	}

	getOrderCard(orderId: string): Locator {
		return this.page
			.getByTestId(`account-order-toggle-${orderId}`)
			.locator("xpath=..");
	}
}

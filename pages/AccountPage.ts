import { Page } from "@playwright/test";
import { OrderHistory } from "./OrderHistory";

export class AccountPage {
	readonly orderHistory: OrderHistory;

	constructor(private readonly page: Page) {
		this.orderHistory = new OrderHistory(page);
	}

	async goToOrdersTab(): Promise<void> {
		await this.page.getByTestId("account-tab-orders").click();
	}
}

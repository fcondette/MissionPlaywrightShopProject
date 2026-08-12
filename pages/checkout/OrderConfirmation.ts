import { Page } from "@playwright/test";
import { ProductsPage } from "../ProductsPage";

export class OrderConfirmation {
	constructor(private readonly page: Page) {}

	async getOrderNumber(): Promise<string> {
		return (await this.page.getByTestId("order-number").textContent()) ?? "";
	}

	async continueShopping(): Promise<ProductsPage> {
		await this.page.getByTestId("continue-shopping-button").click();
		return new ProductsPage(this.page);
	}
}

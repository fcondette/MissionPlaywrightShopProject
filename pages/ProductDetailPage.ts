import { Page } from "@playwright/test";

export class ProductDetailPage {
	constructor(private readonly page: Page) {}
	async addToCart(): Promise<void> {
		await this.page.getByTestId("product-detail-add-to-cart").click();
	}
}

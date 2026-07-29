import { Page } from "@playwright/test";
import { ProductDetailPage } from "./ProductDetailPage";

export class ProductsPage {
	constructor(private readonly page: Page) {}

	async selectProduct(productName: string): Promise<ProductDetailPage> {
		await this.page
			.getByTestId(/^product-card-\d+$/)
			.filter({ hasText: productName })
			.click();
		return new ProductDetailPage(this.page);
	}
}

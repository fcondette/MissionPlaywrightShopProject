import { Page } from "@playwright/test";
import { ProductDetailPage } from "./ProductDetailPage";
import { ProductFilters } from "./ProductFilters";

export class ProductsPage {
	readonly filters: ProductFilters;

	constructor(private readonly page: Page) {
		this.filters = new ProductFilters(page);
	}

	async selectProduct(productName: string): Promise<ProductDetailPage> {
		await this.page
			.getByTestId(/^product-card-\d+$/)
			.filter({ hasText: productName })
			.click();
		return new ProductDetailPage(this.page);
	}
}

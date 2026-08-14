import { Page } from "@playwright/test";

export class ProductFilters {
	constructor(private readonly page: Page) {}

	async filterByCategory(category: string): Promise<void> {
		await this.page
			.getByRole("button", { name: category, exact: true })
			.click();
	}

	async filterByPrice(priceRange: string): Promise<void> {
		await this.page
			.getByRole("button", { name: priceRange, exact: true })
			.click();
	}

	async reset(): Promise<void> {
		await this.page
			.getByRole("button", { name: "Réinitialiser", exact: true })
			.click();
	}

	async getResultCount(): Promise<string> {
		return (await this.page.getByText(/^\d+ produits?$/).textContent()) ?? "";
	}

	async open(): Promise<void> {
		await this.page
			.getByRole("button", { name: "Filtres", exact: true })
			.click();
	}
}

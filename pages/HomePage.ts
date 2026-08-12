import { Page } from "@playwright/test";
import { ProductsPage } from "./ProductsPage";
import { AboutPage } from "./AboutPage";

export class HomePage {
	constructor(private readonly page: Page) {}

	async goToProducts(): Promise<ProductsPage> {
		await this.page.getByTestId("hero-cta-button").click();
		return new ProductsPage(this.page);
	}

	async goToAbout(): Promise<AboutPage> {
		await this.page.getByTestId("hero-about-button").click();
		return new AboutPage(this.page);
	}
}

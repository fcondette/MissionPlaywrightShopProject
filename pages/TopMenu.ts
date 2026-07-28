import { Page } from "@playwright/test";
import { HomePage } from "./HomePage";
import { ProductsPage } from "./ProductsPage";
import { AboutPage } from "./AboutPage";
import { ContactPage } from "./ContactPage";
import { CartPage } from "./CartPage";

export class TopMenu {
	constructor(private readonly page: Page) {}

	async goToHome(): Promise<HomePage> {
		await this.page.getByTestId("nav-link-home").click();
		return new HomePage(this.page);
	}

	async goToProducts(): Promise<ProductsPage> {
		await this.page.getByTestId("nav-link-products").click();
		return new ProductsPage(this.page);
	}

	async goToAbout(): Promise<AboutPage> {
		await this.page.getByTestId("nav-link-about").click();
		return new AboutPage(this.page);
	}

	async goToContact(): Promise<ContactPage> {
		await this.page.getByTestId("nav-link-contact").click();
		return new ContactPage(this.page);
	}

	async goToCart(): Promise<CartPage> {
		await this.page.getByTestId("cart-link").click();
		return new CartPage(this.page);
	}
}

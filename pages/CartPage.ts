import { Page, Locator } from "@playwright/test";
import { CheckoutPage } from "./CheckoutPage";
import { ProductsPage } from "./ProductsPage";

export class CartPage {
	constructor(private readonly page: Page) {}

	async goToCheckout(): Promise<CheckoutPage> {
		await this.page.getByTestId("checkout-button").click();
		return new CheckoutPage(this.page);
	}

	async continueShopping(): Promise<ProductsPage> {
		await this.page.getByTestId("continue-shopping-button").click();
		return new ProductsPage(this.page);
	}

	async emptyCart(): Promise<void> {
		await this.page.getByTestId("clear-cart-button").click();
	}
}

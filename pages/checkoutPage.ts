//checkout form page

import { Page, Locator } from "@playwright/test";

export class CheckoutPage {
	private readonly page: Page;
	private readonly nameInput: Locator;
	private readonly addressInput: Locator;
	private readonly cityInput: Locator;
	private readonly zipInput: Locator;
	private readonly nextButton: Locator;
	private readonly cardInput: Locator;
	private readonly expiryInput: Locator;
	private readonly cvvInput: Locator;
	private readonly shippingInput: Locator;
	private readonly paymentInput: Locator;
	private readonly checkoutButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.nameInput = page.getByTestId("checkout-name");
		this.addressInput = page.getByTestId("checkout-address");
		this.cityInput = page.getByTestId("checkout-city");
		this.zipInput = page.getByTestId("checkout-zip");
		this.nextButton = page.getByTestId("checkout-next");
		this.cardInput = page.getByTestId("checkout-card");
		this.expiryInput = page.getByTestId("checkout-expiry");
		this.cvvInput = page.getByTestId("checkout-cvv");
		this.shippingInput = page.getByTestId("checkout-review-shipping");
		this.paymentInput = page.getByTestId("checkout-review-payment");
		this.checkoutButton = page.getByTestId("checkout-submit");
	}

	async goto() {
		await this.page.goto("/exercises/checkout-form");
	}

	async fillForm1(
		nom: string,
		adresse: string,
		ville: string,
		codepostal: string,
	) {
		await this.nameInput.fill(nom);
		await this.addressInput.fill(adresse);
		await this.cityInput.fill(ville);
		await this.zipInput.fill(codepostal);
	}
	async next() {
		await this.nextButton.click();
	}

	async fillForm2(carte: string, expiration: string, cvv: string) {
		await this.cardInput.fill(carte);
		await this.expiryInput.fill(expiration);
		await this.cvvInput.fill(cvv);
	}

	async checkout() {
		await this.checkoutButton.click();
	}
}

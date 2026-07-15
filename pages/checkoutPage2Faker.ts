//checkout form page

import { Page, Locator } from "@playwright/test";

interface CheckoutData {
	nom: string;
	adresse: string;
	ville: string;
	codepostal: string;
}

export class CheckoutPage2Faker {
	private readonly page: Page;
	private readonly nameInput: Locator;
	private readonly addressInput: Locator;
	private readonly cityInput: Locator;
	private readonly zipInput: Locator;

	constructor(page: Page) {
		this.page = page;
		this.nameInput = page.getByTestId("checkout-name");
		this.addressInput = page.getByTestId("checkout-address");
		this.cityInput = page.getByTestId("checkout-city");
		this.zipInput = page.getByTestId("checkout-zip");
	}

	async goto() {
		await this.page.goto("/exercises/checkout-form");
	}

	async fillForm(data: CheckoutData) {
		await this.nameInput.fill(data.nom);
		await this.addressInput.fill(data.adresse);
		await this.cityInput.fill(data.ville);
		await this.zipInput.fill(data.codepostal);
	}
}

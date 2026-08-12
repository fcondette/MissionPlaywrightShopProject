import { Page } from "@playwright/test";

export type ShippingDetails = {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	address: string;
	city: string;
	postalCode: string;
};

export class ShippingForm {
	constructor(private readonly page: Page) {}

	async fill(details: ShippingDetails): Promise<void> {
		await this.page
			.getByTestId("shipping-firstname-input")
			.fill(details.firstName);
		await this.page
			.getByTestId("shipping-lastname-input")
			.fill(details.lastName);
		await this.page.getByTestId("shipping-email-input").fill(details.email);
		await this.page.getByTestId("shipping-phone-input").fill(details.phone);
		await this.page.getByTestId("shipping-address-input").fill(details.address);
		await this.page.getByTestId("shipping-city-input").fill(details.city);
		await this.page
			.getByTestId("shipping-postalcode-input")
			.fill(details.postalCode);
	}

	async submit(): Promise<void> {
		await this.page.getByTestId("shipping-submit-button").click();
	}
}

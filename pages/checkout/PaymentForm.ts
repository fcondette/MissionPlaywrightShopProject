import { Page } from "@playwright/test";

export type PaymentDetails = {
	cardNumber: string;
	cardName: string;
	expiry: string;
	cvv: string;
};

export class PaymentForm {
	constructor(private readonly page: Page) {}

	async fill(details: PaymentDetails): Promise<void> {
		await this.page
			.getByTestId("payment-cardnumber-input")
			.fill(details.cardNumber);
		await this.page
			.getByTestId("payment-cardname-input")
			.fill(details.cardName);
		await this.page.getByTestId("payment-expiry-input").fill(details.expiry);
		await this.page.getByTestId("payment-cvv-input").fill(details.cvv);
	}

	async submit(): Promise<void> {
		await this.page.getByTestId("payment-submit-button").click();
	}
}

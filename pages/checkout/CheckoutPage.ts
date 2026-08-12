import { Page } from "@playwright/test";
import { AuthPage } from "../auth/AuthPage";
import { ShippingForm } from "./ShippingForm";
import { PaymentForm } from "./PaymentForm";
import { OrderConfirmation } from "./OrderConfirmation";

export class CheckoutPage {
	readonly shippingForm: ShippingForm;
	readonly paymentForm: PaymentForm;
	readonly orderConfirmation: OrderConfirmation;

	constructor(private readonly page: Page) {
		this.shippingForm = new ShippingForm(page);
		this.paymentForm = new PaymentForm(page);
		this.orderConfirmation = new OrderConfirmation(page);
	}

	async goToLogin(): Promise<AuthPage> {
		await this.page.getByTestId("checkout-login-button").click();
		return new AuthPage(this.page);
	}
}

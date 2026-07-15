import { test as base, expect } from "@playwright/test";
import { RegistrationPage } from "../pages/registrationPage";
import { CheckoutPage } from "../pages/checkoutPage";
import { CheckoutPage2Faker } from "../pages/checkoutPage2Faker";

type Fixtures = {
	registration: RegistrationPage;
	checkout: CheckoutPage;
	checkoutfaker: CheckoutPage2Faker;
};

export const test = base.extend<Fixtures>({
	registration: async ({ page }, use) => {
		await use(new RegistrationPage(page));
	},
	checkout: async ({ page }, use) => {
		await use(new CheckoutPage(page));
	},
	checkoutfaker: async ({ page }, use) => {
		await use(new CheckoutPage2Faker(page));
	},
});

export { expect };

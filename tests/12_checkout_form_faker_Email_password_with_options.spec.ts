import { test, expect } from "@playwright/test";
import { fakerFR as faker } from "@faker-js/faker";

// test
test("remplir Email et password en utilisant Faker", async ({ page }) => {
	await page.goto("/exercises/login-form");
	await page
		.getByTestId("login-email")
		.fill(faker.internet.email({ firstName: "John", lastName: "Doe" }));
	await page
		.getByTestId("login-password")
		.fill(faker.internet.password({ length: 12, memorable: false }));
});

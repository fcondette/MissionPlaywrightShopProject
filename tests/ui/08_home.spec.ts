import { test, expect } from "../../fixtures";

test.describe("Home page", () => {
	test("displays the hero heading", async ({ page }) => {
		await page.goto("/");
		await expect(
			page.getByRole("heading", { name: /simplifie votre quotidien/ }),
		).toBeVisible();
	});

	test("hero CTA navigates to products", async ({ page, homePage }) => {
		await page.goto("/");
		await homePage.goToProducts();
		await expect(page).toHaveURL(/\/products/);
	});

	test("hero secondary CTA navigates to about", async ({ page, homePage }) => {
		await page.goto("/");
		await homePage.goToAbout();
		await expect(page).toHaveURL(/\/about/);
	});
});

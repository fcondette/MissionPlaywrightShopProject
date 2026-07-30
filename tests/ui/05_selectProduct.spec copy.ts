import { test, expect } from "../../fixtures";
import type { ProductsPage } from "../../pages/ProductsPage";

test("user can select a product from the products page", async ({
	page,
	topMenu,
}) => {
	let productsPage: ProductsPage;

	await test.step("navigate to products page", async () => {
		await page.goto("/");
		productsPage = await topMenu.goToProducts();
	});

	await test.step("select a product", async () => {
		await productsPage.selectProduct("Écouteurs Sans Fil Pro");
	});

	await expect(page).toHaveURL(/\/product\/1/);
});

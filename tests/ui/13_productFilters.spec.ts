import { test, expect } from "../../fixtures";
import type { ProductsPage } from "../../pages/ProductsPage";

test.describe("Product filters", () => {
	test("user can filter products by category and price", async ({
		page,
		topMenu,
	}) => {
		let productsPage: ProductsPage;

		await test.step("navigate to products", async () => {
			await page.goto("/");
			productsPage = await topMenu.goToProducts();
		});

		await test.step("open the filters panel", async () => {
			await productsPage.filters.open();
		});

		await test.step("apply category and price filters", async () => {
			await productsPage.filters.filterByCategory("Accessoires");
			await productsPage.filters.filterByPrice("100€ - 200€");
		});

		await test.step("verify filtered result count", async () => {
			expect(await productsPage.filters.getResultCount()).toBe("2 produits");
		});
	});

	test("user can reset filters", async ({ page, topMenu }) => {
		let productsPage: ProductsPage;

		await test.step("navigate to products and open filters", async () => {
			await page.goto("/");
			productsPage = await topMenu.goToProducts();
			await productsPage.filters.open();
		});

		await test.step("apply a filter", async () => {
			await productsPage.filters.filterByCategory("Accessoires");
		});

		await test.step("reset filters", async () => {
			await productsPage.filters.reset();
		});

		await test.step("verify full catalog is restored", async () => {
			expect(await productsPage.filters.getResultCount()).toBe("12 produits");
		});
	});
});

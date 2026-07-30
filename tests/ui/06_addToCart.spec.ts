import { test, expect } from "../../fixtures";
import type { ProductsPage } from "../../pages/ProductsPage";
import type { ProductDetailPage } from "../../pages/ProductDetailPage";

test("user can add a product to the cart from the product detail page", async ({
	page,
	topMenu,
}) => {
	let productsPage: ProductsPage;
	let productDetailPage: ProductDetailPage;

	await test.step("navigate to a product", async () => {
		await page.goto("/");
		productsPage = await topMenu.goToProducts();
		productDetailPage = await productsPage.selectProduct(
			"Écouteurs Sans Fil Pro",
		);
	});

	await test.step("add product to cart", async () => {
		await productDetailPage.addToCart();
	});

	await test.step("verify cart feedback", async () => {
		await expect(page.locator("[data-sonner-toast]")).toContainText(
			"Écouteurs Sans Fil Pro ajouté au panier",
		);

		await expect(page.getByTestId("cart-count")).toHaveText("1");
	});
});

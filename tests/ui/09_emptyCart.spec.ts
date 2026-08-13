import { test, expect } from "../../fixtures";
import type { ProductsPage } from "../../pages/ProductsPage";
import type { ProductDetailPage } from "../../pages/ProductDetailPage";
import type { CartPage } from "../../pages/CartPage";

test("user can empty the cart", async ({ page, topMenu }) => {
	let productsPage: ProductsPage;
	let productDetailPage: ProductDetailPage;
	let cartPage: CartPage;

	await test.step("add a product to the cart", async () => {
		await page.goto("/");
		productsPage = await topMenu.goToProducts();
		productDetailPage = await productsPage.selectProduct(
			"Écouteurs Sans Fil Pro",
		);
		await productDetailPage.addToCart();
	});

	await test.step("empty the cart", async () => {
		cartPage = await topMenu.goToCart();
		await cartPage.emptyCart();
	});

	await test.step("verify cart is empty", async () => {
		await expect(
			page.getByRole("heading", { name: "Votre panier est vide" }),
		).toBeVisible();
		await expect(
			page.getByText(
				"Découvrez notre catalogue et ajoutez des produits à votre panier.",
			),
		).toBeVisible();
		await expect(page.getByTestId("cart-count")).not.toBeVisible();
	});
});

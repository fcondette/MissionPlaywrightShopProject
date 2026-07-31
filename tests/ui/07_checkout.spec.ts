import { test, expect } from "../../fixtures";
import type { ProductsPage } from "../../pages/ProductsPage";
import type { ProductDetailPage } from "../../pages/ProductDetailPage";
import type { CartPage } from "../../pages/CartPage";
import type { CheckoutPage } from "../../pages/CheckoutPage";

test("guest is prompted to log in when proceeding to checkout", async ({
	page,
	topMenu,
}) => {
	let productsPage: ProductsPage;
	let productDetailPage: ProductDetailPage;
	let cartPage: CartPage;
	let checkoutPage: CheckoutPage;

	await test.step("add a product to the cart", async () => {
		await page.goto("/");
		productsPage = await topMenu.goToProducts();
		productDetailPage = await productsPage.selectProduct(
			"Écouteurs Sans Fil Pro",
		);
		await productDetailPage.addToCart();
	});

	await test.step("navigate to cart and proceed to checkout", async () => {
		cartPage = await topMenu.goToCart();
		checkoutPage = await cartPage.goToCheckout();
	});

	await test.step("verify guest is prompted to log in", async () => {
		await expect(page).toHaveURL(/\/checkout/);
		await expect(
			page.getByText(
				"Connectez-vous pour finaliser votre commande et suivre son état en temps réel.",
				{ exact: true },
			),
		).toBeVisible();
	});
});

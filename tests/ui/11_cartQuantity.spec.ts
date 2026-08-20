import { test, expect } from "../../fixtures";
import type { ProductsPage } from "../../pages/ProductsPage";
import type { ProductDetailPage } from "../../pages/ProductDetailPage";
import type { CartPage } from "../../pages/CartPage";

test.describe("Cart quantity controls", () => {
	test("increasing quantity updates cart totals", async ({ page, topMenu }) => {
		let productsPage: ProductsPage;
		let productDetailPage: ProductDetailPage;
		let cartPage: CartPage;

		await test.step("add a product to the cart", async () => {
			await page.goto("/");
			productsPage = await topMenu.goToProducts();
			productDetailPage = await productsPage.selectProduct(
				"Clavier Mécanique RGB",
			);
			await productDetailPage.addToCart();
		});

		await test.step("increase quantity", async () => {
			cartPage = await topMenu.goToCart();
			await cartPage.increaseQuantity(4);
		});

		await test.step("verify quantity and totals updated", async () => {
			await expect(cartPage.quantityField(4)).toHaveText("2");
			await expect(
				page.getByText("Sous-total (2 articles)", { exact: true }),
			).toBeVisible();

			const totalRow = page
				.getByText("Total", { exact: true })
				.locator("xpath=..");
			await expect(totalRow).toContainText("359.98 €");
		});
	});

	test("decreasing the only item's quantity to zero empties the cart", async ({
		page,
		topMenu,
	}) => {
		let productsPage: ProductsPage;
		let productDetailPage: ProductDetailPage;
		let cartPage: CartPage;

		await test.step("add a product to the cart", async () => {
			await page.goto("/");
			productsPage = await topMenu.goToProducts();
			productDetailPage = await productsPage.selectProduct(
				"Clavier Mécanique RGB",
			);
			await productDetailPage.addToCart();
		});

		await test.step("decrease quantity below 1", async () => {
			cartPage = await topMenu.goToCart();
			await expect(page.getByTestId("decrease-quantity-4")).toBeVisible();
			await cartPage.decreaseQuantity(4);
		});

		await test.step("verify cart is now empty", async () => {
			await expect(
				page.getByRole("heading", { name: "Votre panier est vide" }),
			).toBeVisible();
		});
	});
});

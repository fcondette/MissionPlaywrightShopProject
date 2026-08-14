import { test, expect } from "../../fixtures";
import type { ProductsPage } from "../../pages/ProductsPage";
import type { ProductDetailPage } from "../../pages/ProductDetailPage";
import type { CartPage } from "../../pages/CartPage";

test("user can remove a single item from a multi-item cart", async ({
	page,
	topMenu,
}) => {
	let productsPage: ProductsPage;
	let productDetailPage: ProductDetailPage;
	let cartPage: CartPage;

	await test.step("add two products to the cart", async () => {
		await page.goto("/");
		productsPage = await topMenu.goToProducts();
		productDetailPage = await productsPage.selectProduct(
			"Écouteurs Sans Fil Pro",
		);
		await productDetailPage.addToCart();

		productsPage = await topMenu.goToProducts();
		productDetailPage = await productsPage.selectProduct(
			"Clavier Mécanique RGB",
		);
		await productDetailPage.addToCart();
	});

	await test.step("remove one item", async () => {
		cartPage = await topMenu.goToCart();
		await cartPage.removeItem(4);
	});

	await test.step("verify the correct item was removed", async () => {
		await expect(page.getByTestId("remove-item-4")).not.toBeVisible();
		await expect(page.getByTestId("remove-item-1")).toBeVisible();
	});

	await test.step("verify subtotal and total recalculated", async () => {
		await expect(
			page.getByText("Sous-total (1 article)", { exact: true }),
		).toBeVisible();

		const totalRow = page
			.getByText("Total", { exact: true })
			.locator("xpath=..");
		await expect(totalRow).toContainText("199.99 €");
	});
});

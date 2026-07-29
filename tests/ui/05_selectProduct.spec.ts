import { test, expect } from "../../fixtures";

test("user can select a product from the products page", async ({
	page,
	topMenu,
}) => {
	const productsPage = await topMenu.goToProducts();
	await productsPage.selectProduct("Écouteurs Sans Fil Pro");
	await expect(page).toHaveURL(/\/product\/1/);
});

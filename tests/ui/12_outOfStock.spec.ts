import { test, expect } from "../../fixtures";

test("out-of-stock product cannot be added to cart", async ({ page }) => {
	await test.step("navigate to an out-of-stock product", async () => {
		await page.goto("/product/12");
	});

	await test.step("verify out-of-stock state", async () => {
		await expect(
			page.getByText("Rupture de stock", { exact: true }),
		).toBeVisible();
		await expect(page.getByTestId("product-detail-add-to-cart")).toBeDisabled();
	});
});

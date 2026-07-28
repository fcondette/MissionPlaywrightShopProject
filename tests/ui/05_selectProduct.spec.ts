import { test, expect } from "../../fixtures";

test.use({ storageState: "playwright/.auth/user.json" });

test.describe("Select products", () => {
	test("user can select one product", async ({ topMenu, page }) => {
		await page.goto("/");
		await topMenu.goToProducts();
	});
});

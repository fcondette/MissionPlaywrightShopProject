import { test } from "@playwright/test";

test("aller sur home page", async ({ page }) => {
	await page.goto(process.env.URL!);
});

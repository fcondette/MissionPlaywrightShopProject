import { test, expect } from "@playwright/test";

//URL
const checkboxURL = "/exercises/checkboxes";

test("cocher checkboxes uniquement puis cocher et décocher checkboxes", async ({
	page,
}) => {
	await test.step("step 1 cocher checkboxes", async () => {
		await page.goto(checkboxURL);
		await page.getByRole("checkbox", { name: "Playwright" }).check();
		await page.getByRole("checkbox", { name: "Cypress" }).check();
		await page.getByRole("checkbox", { name: "Selenium" }).check();
		await expect(
			page.getByRole("checkbox", { name: "Playwright" }),
		).toBeChecked();
		await expect(page.getByRole("checkbox", { name: "Cypress" })).toBeChecked();
		await expect(
			page.getByRole("checkbox", { name: "Selenium" }),
		).toBeChecked();
	});

	await test.step("step 2 cocher et décocher checkboxes", async () => {
		await page.goto(checkboxURL);
		await page.getByRole("checkbox", { name: "Playwright" }).check();
		await page.getByRole("checkbox", { name: "Cypress" }).check();
		await page.getByRole("checkbox", { name: "Selenium" }).check();
		await expect(
			page.getByRole("checkbox", { name: "Playwright" }),
		).toBeChecked();
		await expect(
			page.getByRole("checkbox", { name: "Cypress2" }),
		).toBeChecked();
		await expect(
			page.getByRole("checkbox", { name: "Selenium" }),
		).toBeChecked();
	});
});

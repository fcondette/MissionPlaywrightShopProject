import { test, expect } from "../../fixtures";

test.use({ storageState: "playwright/.auth/user.json" });

// User can signout
test("user can logout", async ({ accountMenu, page }) => {
	await page.goto("/");
	await accountMenu.logout();
	await expect(page).toHaveURL(`${process.env.BASE_URL}/`);

	//checking that a click on the user icon redirects to /auth as no user is logged in
	await page.getByTestId("auth-link").click();
	await expect(page).toHaveURL(`${process.env.BASE_URL}/auth`);
});

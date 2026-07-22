import { test as setup, expect } from "../fixtures";
import { existingUser } from "../helpers/testData";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ authPage, page }) => {
	const user = existingUser();

	await authPage.goto();
	await authPage.goToSigninTab();
	await authPage.signinForm.fillForm(user.email, user.password);
	await authPage.signinForm.submit();
	await expect(page).toHaveURL(`${process.env.BASE_URL}/`);

	await page.context().storageState({ path: authFile });
});

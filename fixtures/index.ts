import { test as base, expect } from "@playwright/test";
import { AuthPage } from "../pages/auth/AuthPage";
import { AccountMenu } from "../pages/AccountMenu";
import { TopMenu } from "../pages/TopMenu";

type Fixtures = {
	authPage: AuthPage;
	accountMenu: AccountMenu;
	topMenu: TopMenu;
};

export const test = base.extend<Fixtures>({
	authPage: async ({ page }, use) => {
		await use(new AuthPage(page));
	},
	accountMenu: async ({ page }, use) => {
		await use(new AccountMenu(page));
	},
	topMenu: async ({ page }, use) => {
		await use(new TopMenu(page));
	},
});

export { expect };

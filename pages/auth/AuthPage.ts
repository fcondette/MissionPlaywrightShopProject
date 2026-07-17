import { Page, Locator } from "@playwright/test";
import { SignupForm } from "./SignupForm";
import { SigninForm } from "./SigninForm";

export class AuthPage {
	private readonly signupTab: Locator;
	private readonly signinTab: Locator;
	readonly signupForm: SignupForm;
	readonly signinForm: SigninForm;

	constructor(private readonly page: Page) {
		this.signupTab = page.getByTestId("signup-tab");
		this.signinTab = page.getByTestId("login-tab");
		this.signupForm = new SignupForm(page);
		this.signinForm = new SigninForm(page);
	}

	async goto() {
		await this.page.goto("/auth");
	}

	async goToSignupTab() {
		await this.signupTab.click();
	}

	async goToSigninTab() {
		await this.signinTab.click();
	}
}

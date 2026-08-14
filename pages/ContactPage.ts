import { Page } from "@playwright/test";

export type ContactDetails = {
	name: string;
	email: string;
	subject: string;
	message: string;
};

export class ContactPage {
	constructor(private readonly page: Page) {}

	async fill(details: ContactDetails): Promise<void> {
		await this.page
			.getByLabel("Nom complet", { exact: true })
			.fill(details.name);
		await this.page.getByLabel("Email", { exact: true }).fill(details.email);
		await this.page.getByLabel("Sujet", { exact: true }).fill(details.subject);
		await this.page
			.getByLabel("Message", { exact: true })
			.fill(details.message);
	}

	async submit(): Promise<void> {
		await this.page
			.getByRole("button", { name: "Envoyer le message", exact: true })
			.click();
	}
}

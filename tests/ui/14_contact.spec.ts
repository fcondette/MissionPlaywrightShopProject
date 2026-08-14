import { test, expect } from "../../fixtures";
import { generateContactDetails } from "../../helpers/testData";
import type { ContactPage } from "../../pages/ContactPage";

test("user can submit the contact form", async ({ page, topMenu }) => {
	let contactPage: ContactPage;

	await test.step("navigate to contact page", async () => {
		await page.goto("/");
		contactPage = await topMenu.goToContact();
	});

	await test.step("fill and submit the contact form", async () => {
		const contactDetails = generateContactDetails();
		await contactPage.fill(contactDetails);
		await contactPage.submit();
	});

	await test.step("verify success toast", async () => {
		await expect(page.locator("[data-sonner-toast]")).toContainText(
			"Message envoyé ! Nous vous répondrons sous 24h.",
		);
	});
});

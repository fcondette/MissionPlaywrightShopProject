import { test, expect } from "../../fixtures";
import {
	generateShippingDetails,
	generatePaymentDetails,
} from "../../helpers/testData";
import { getTodayInFrench, normalizeOrderNumber } from "../../helpers/format";
import type { ProductsPage } from "../../pages/ProductsPage";
import type { ProductDetailPage } from "../../pages/ProductDetailPage";
import type { CartPage } from "../../pages/CartPage";
import type { CheckoutPage } from "../../pages/checkout/CheckoutPage";
import type { AccountPage } from "../../pages/AccountPage";

test.use({ storageState: "playwright/.auth/user.json" });

test("user can track a placed order in the account order history", async ({
	page,
	topMenu,
	accountMenu,
}) => {
	let productsPage: ProductsPage;
	let productDetailPage: ProductDetailPage;
	let cartPage: CartPage;
	let checkoutPage: CheckoutPage;
	let accountPage: AccountPage;
	let orderId: string;

	await test.step("add two of the same product to the cart", async () => {
		await page.goto("/");
		productsPage = await topMenu.goToProducts();
		productDetailPage = await productsPage.selectProduct(
			"Écouteurs Sans Fil Pro",
		);
		await productDetailPage.addToCart();

		cartPage = await topMenu.goToCart();
		await cartPage.increaseQuantity(1);
	});

	await test.step("complete checkout", async () => {
		checkoutPage = await cartPage.goToCheckout();

		await checkoutPage.shippingForm.fill(generateShippingDetails());
		await checkoutPage.shippingForm.submit();

		await checkoutPage.paymentForm.fill(generatePaymentDetails());
		await checkoutPage.paymentForm.submit();

		const rawOrderNumber =
			await checkoutPage.orderConfirmation.getOrderNumber();
		orderId = normalizeOrderNumber(rawOrderNumber);
	});

	await test.step("navigate to order history", async () => {
		accountPage = await accountMenu.openAccount();
		await accountPage.goToOrdersTab();
		await expect(
			page.getByRole("heading", { name: "Historique des commandes" }),
		).toBeVisible();
	});

	await test.step("expand the placed order and verify its details", async () => {
		await accountPage.orderHistory.expandOrder(orderId);

		const orderCard = accountPage.orderHistory.getOrderCard(orderId);
		await expect(orderCard).toContainText(`Commande #${orderId}`);
		await expect(orderCard).toContainText(getTodayInFrench());
		await expect(orderCard).toContainText("399.98 €");
		await expect(orderCard).toContainText("Écouteurs Sans Fil Pro");
		await expect(orderCard).toContainText("Qté: 2 × 199.99 €");
	});
});

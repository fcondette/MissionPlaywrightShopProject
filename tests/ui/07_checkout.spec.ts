import { test, expect } from "../../fixtures";
import {
	generateShippingDetails,
	generatePaymentDetails,
} from "../../helpers/testData";
import type { ProductsPage } from "../../pages/ProductsPage";
import type { ProductDetailPage } from "../../pages/ProductDetailPage";
import type { CartPage } from "../../pages/CartPage";
import type { CheckoutPage } from "../../pages/checkout/CheckoutPage";

test.describe("Checkout", () => {
	test("guest is prompted to log in when proceeding to checkout", async ({
		page,
		topMenu,
	}) => {
		let productsPage: ProductsPage;
		let productDetailPage: ProductDetailPage;
		let cartPage: CartPage;
		let checkoutPage: CheckoutPage;

		await test.step("add a product to the cart", async () => {
			await page.goto("/");
			productsPage = await topMenu.goToProducts();
			productDetailPage = await productsPage.selectProduct(
				"Écouteurs Sans Fil Pro",
			);
			await productDetailPage.addToCart();
		});

		await test.step("navigate to cart and proceed to checkout", async () => {
			cartPage = await topMenu.goToCart();
			checkoutPage = await cartPage.goToCheckout();
		});

		await test.step("verify guest is prompted to log in", async () => {
			await expect(page).toHaveURL(/\/checkout/);
			await expect(
				page.getByText(
					"Connectez-vous pour finaliser votre commande et suivre son état en temps réel.",
					{ exact: true },
				),
			).toBeVisible();
		});
	});

	test.describe("as an authenticated user", () => {
		test.use({ storageState: "playwright/.auth/user.json" });

		test("user can complete checkout", async ({ page, topMenu }) => {
			let productsPage: ProductsPage;
			let productDetailPage: ProductDetailPage;
			let cartPage: CartPage;
			let checkoutPage: CheckoutPage;

			await test.step("add a product to the cart", async () => {
				await page.goto("/");
				productsPage = await topMenu.goToProducts();
				productDetailPage = await productsPage.selectProduct(
					"Écouteurs Sans Fil Pro",
				);
				await productDetailPage.addToCart();
			});

			await test.step("navigate to checkout", async () => {
				cartPage = await topMenu.goToCart();
				checkoutPage = await cartPage.goToCheckout();
			});

			await test.step("fill and submit shipping details", async () => {
				const shipping = generateShippingDetails();
				await checkoutPage.shippingForm.fill(shipping);
				await checkoutPage.shippingForm.submit();
			});

			await test.step("fill and submit payment details", async () => {
				const payment = generatePaymentDetails();
				await checkoutPage.paymentForm.fill(payment);
				await checkoutPage.paymentForm.submit();
			});

			await test.step("verify order confirmation", async () => {
				await expect(
					page.getByRole("heading", { name: "Commande confirmée !" }),
				).toBeVisible();

				const orderNumber =
					await checkoutPage.orderConfirmation.getOrderNumber();
				expect(orderNumber).toMatch(/^#TH-[A-F0-9]+$/);
			});
		});
	});
});

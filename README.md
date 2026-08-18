# TechHub — Playwright Test Automation

End-to-end test suite for [shop.missionplaywright.fr](https://shop.missionplaywright.fr),
a French-language e-commerce demo application.

Built as the final project of a structured Playwright/TypeScript automation
program. The brief called for roughly ten tests covering authentication,
product selection, cart, and checkout, with page objects, fixtures, Faker, and
a CI pipeline. The suite here goes somewhat beyond that scope — the additional
coverage is noted below.

---

## Stack

- **Playwright** v1.60 with TypeScript
- **@faker-js/faker** for test data generation
- **dotenvx** for environment variable loading
- **ESLint** (flat config) + **Prettier**, with `eslint-plugin-playwright`
- **GitHub Actions** for CI

---

## Setup

```bash
npm ci
npx playwright install
```

Copy the environment template and fill in your own values:

```bash
cp env/.env.example env/.env.local
```

```dotenv
BASE_URL=https://shop.missionplaywright.fr
TEST_USER_EMAIL=
TEST_USER_PASSWORD=
```

The account referenced by `TEST_USER_EMAIL` must already exist on the target
site — the authentication setup signs in with it rather than creating it.

---

## Running the tests

Tests must be run through the npm scripts, which load environment variables via
`dotenvx`. Calling `npx playwright test` directly will leave `BASE_URL`
undefined.

```bash
npm run test:ui                          # UI mode, all tests
npm run test:ui -- 05_selectProduct.spec.ts   # a single spec
npm run test:ui -- --grep @smoke         # smoke subset only
```

In UI mode, the `setup` project does not run automatically. Enable it in the
project filter when authenticated state needs refreshing, then disable it again.

---

## Project structure

```
pages/                  Page objects
├── auth/               AuthPage composing SignupForm / SigninForm
├── checkout/           CheckoutPage composing ShippingForm,
│                       PaymentForm, OrderConfirmation
├── TopMenu.ts          Navigation, shared across pages
├── ProductsPage.ts     Composes ProductFilters
└── …

fixtures/index.ts       Fixture registration
helpers/
├── testData.ts         Faker-based factories
└── format.ts           Value transforms (date, order number)

tests/
├── ui/                 Feature-level specs
├── e2e/                Multi-page journeys
└── auth.setup.ts       Generates storageState
```

**Conventions applied throughout:**

- Locators live in page objects; spec files never construct a page object
  directly — fixtures supply them
- Navigation methods return the page object for their destination, so tests
  read as a flow
- Page objects perform actions and read values; assertions stay in specs
- Faker is confined to `helpers/testData.ts` and never imported into a page
  object
- `getByTestId` where test IDs exist, `getByRole` / `getByLabel` where they do
  not

---

## Coverage

**Required by the brief**

| Area | Spec |
|---|---|
| Account creation | `01_signup.spec.ts` |
| Sign in | `03_signin.spec.ts` |
| Product selection | `05_selectProduct.spec.ts` |
| Add to cart | `06_addToCart.spec.ts` |
| Checkout — shipping, payment, confirmation | `07_checkout.spec.ts` |
| End-to-end journey | `e2e/orderTracking.spec.ts` |

**Added beyond the brief**

| Area | Spec |
|---|---|
| Logout, and redirect for signed-out users | `04_logout.spec.ts` |
| Home page — hero content and both calls to action | `08_home.spec.ts` |
| Empty the cart | `09_emptyCart.spec.ts` |
| Remove one item from a multi-item cart | `10_removeCartItem.spec.ts` |
| Cart quantity — increase, decrease, total recalculation | `11_cartQuantity.spec.ts` |
| Out-of-stock product cannot be added | `12_outOfStock.spec.ts` |
| Filter products by category and price, and reset | `13_productFilters.spec.ts` |
| Contact form submission | `14_contact.spec.ts` |

The end-to-end test places an order and then verifies it in the account order
history, crossing eight page objects in a single flow.

---

## Continuous integration

Every push to `main` runs the full suite on GitHub Actions. The workflow can
also be triggered manually from the Actions tab.

Credentials are supplied as repository secrets and injected at runtime; nothing
sensitive is committed. `auth.setup.ts` generates a fresh `storageState` on each
run rather than relying on a stored file.

---

## Findings

Observations recorded while building the suite — application behaviour, HTML
validity, testability gaps, and a race condition that automation exposed but
manual testing structurally could not: **[FINDINGS.md](FINDINGS.md)**

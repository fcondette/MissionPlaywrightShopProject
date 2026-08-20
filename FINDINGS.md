# Findings

Observations collected while building an automated test suite for the TechHub
demo shop (`shop.missionplaywright.fr`) with Playwright and TypeScript.

Most are not blocking defects — the application is a practice environment and
works as intended for its purpose. They are recorded because writing automated
tests surfaces details that manual exploration tends to pass over, and because
documenting them is part of the testing work itself.

Each entry notes what was observed, why it matters, and how it came to light.

---

## Functional and UX observations

### Cart contents are lost on page reload

**Observed:** Cart state is held only in client-side memory. Adding a
product and then reloading the page — or pasting `/cart` into the address
bar — returns an empty cart. The state survives in-app link clicks and
nothing else.

**Why it matters:** Users refresh pages. They also open a cart in a new
tab, return to a bookmark, or come back after their browser restores a
session. Every one of those loses the basket silently, with no message
explaining what happened. Persisting the cart to `localStorage` or against
the session server-side is standard behaviour precisely because this
failure mode is invisible and costs the sale.

**Consequence for automation:** `page.goto()` cannot be used to reach the
cart once items have been added — the navigation itself clears the state,
and the test would then assert against an empty cart while appearing to
pass its earlier steps. Cart state has to be built through in-app clicks
within a single page lifecycle.

**How found:** Surfaced by an AI-assisted exploration run (Playwright test
agents) reporting that cart state did not survive direct navigation, then
reproduced manually with F5 and with a pasted URL.

---

### Destructive action without confirmation

**Observed:** The "Vider le panier" button empties the cart immediately on
click. There is no confirmation dialog, no undo, and no toast offering to
restore.

**Why it matters:** Emptying a cart is irreversible from the user's point of
view — the items and any quantity adjustments are gone. Destructive actions
normally carry a confirmation step, particularly when the control sits close to
other frequently used buttons.

**How found:** While writing `emptyCart()` in the cart page object, the flow was
checked for an intermediate dialog. There was none, which simplified the page
object but raised the question.

---

### No upper bound on cart quantity

**Observed:** The quantity "+" control on a cart line can be clicked
indefinitely. A quantity of 311 was reached manually with no ceiling, no
warning, and no reference to available stock. Quantity cannot be typed directly;
the field is display-only and adjusts through the +/− controls.

**Why it matters:** A cart quantity that ignores stock levels can produce orders
that cannot be fulfilled. The absence of keyboard entry also means a user
wanting 50 units must click 50 times, which is a usability cost as well as an
accessibility one.

**How found:** Boundary exploration before writing quantity tests. The lower
bound behaves sensibly — decreasing below 1 removes the line entirely — which
made the missing upper bound more conspicuous.

**Note:** Deliberately not automated. A test clicking 300+ times would be slow
and would prove nothing a single manual check does not.

---

### Order number formatted differently in two places

**Observed:** The same order is displayed with two different identifiers:

| Location | Format |
|---|---|
| Checkout confirmation | `#TH-9B88AC19` |
| Account → order history | `#9b88ac19` |

The prefix is dropped and the case is changed.

**Why it matters:** A customer who notes their order number from the
confirmation screen and later looks for it in their history sees a different
string. If they contact support quoting `#TH-9B88AC19`, an agent searching
history for that exact value may not find it.

**How found:** The end-to-end order-tracking test needed to match the number
captured at checkout against the one shown in history. A direct string
comparison failed, which exposed the difference. The test now normalises the
value (strip prefix, lowercase) before comparing.

---

### Search control has no effect

**Observed:** The magnifying-glass icon in the top navigation renders as an
enabled `<button>` but produces no visible response on click — no input field,
no overlay, no navigation.

**Why it matters:** A control that looks interactive but does nothing is worse
than an absent one; users repeat the click and assume the page is broken.

**How found:** While mapping the top navigation for the `TopMenu` page object.
Excluded from the test suite, since there is no behaviour to assert.

---

### Quick-add button on product cards is unreliable

**Observed:** Each product card carries an add-to-cart button
(`add-to-cart-{id}`) revealed on hover via `group-hover:opacity-100`,
positioned in the bottom-right corner of the product image. In practice the
button often failed to appear during normal mouse movement across the card.

**Why it matters:** A shortcut that only works within a narrow region, with no
visual hint of where that region is, is effectively undiscoverable.

**How found:** Considered as a faster way to build a multi-item cart for a
removal test. It proved unreliable enough that the test was built through the
product detail page instead.

---

## HTML validity and accessibility

### Interactive elements nested inside each other

**Observed:** Several controls wrap a `<button>` inside an `<a>`:

```html
<a data-testid="cart-link" href="/cart">
  <button data-testid="cart-button">…</button>
</a>
```

The same pattern appears on the cart icon, the account icon, the checkout
button, and the confirmation-page buttons.

**Why it matters:** The HTML specification does not permit interactive content
inside an anchor. Assistive technology has to decide which element to announce,
and may announce both, giving a screen-reader user two overlapping controls
where a sighted user sees one. Keyboard tab order can also behave unexpectedly.

**Why it is not just theoretical:** it also forces a choice when writing
locators — the outer link and the inner button are both clickable and both
carry test IDs, so the test author must decide which represents the user's
intent.

**How found:** Reading the DOM while building navigation page objects.

---

### Filters panel is collapsed with no visual affordance

**Observed:** On the products page, the category and price filters are hidden
behind a "Filtres" toggle. In the collapsed state the toggle shows only an icon
and the word "Filtres" — no chevron, arrow, or other indication that content
expands below it.

**Why it matters:** Users may not realise filtering is available at all.

**How found:** A filter test failed with a 30-second timeout waiting for a
category button. The DOM snapshot in the trace showed the buttons did not exist
yet — the panel had been expanded manually when the HTML was first captured,
which hid the default state.

---

## Testability observations

These concern how easy the application is to automate. They are not user-facing
defects, but they are the kind of feedback a QA engineer would normally give a
development team.

Test ID coverage across the application is inconsistent: thorough in some areas
(navigation, product grid, checkout forms, order history) and entirely absent in
others.

### Areas with no test IDs at all

| Area | Elements affected | Locator strategy used instead |
|---|---|---|
| Product filters | Category buttons, price buttons, "Réinitialiser", result count | `getByRole('button', { name })` |
| Contact form | All four fields and the submit button | `getByLabel()` |

Role- and label-based locators are perfectly good — arguably better, since they
assert the accessible name a screen reader would announce. But they are more
sensitive to copy changes, and in a French-language interface that means every
locator depends on wording that a content edit could break.

### Cart item rows have no container identifier

**Observed:** Each cart line carries test IDs on its individual controls
(`remove-item-4`, `quantity-4`, `increase-quantity-4`) but the row itself has
none. This differs from the product grid, where the whole card carries
`product-card-{id}`.

**Consequence:** Scoping an assertion to "everything belonging to this cart
line" requires traversing upward from a child element rather than selecting the
row directly.

### Cart summary values have no identifiers, and collide

**Observed:** In the "Récapitulatif" panel, neither "Sous-total" nor "Total"
carries a test ID. When a cart contains a single item, the same amount appears
three times on the page — as the line-item price, the subtotal, and the total.

**Consequence:** A text-based locator for the amount matches three elements and
fails Playwright's strict mode. The working approach anchors on the unique
"Total" label and steps up to its containing row, which is documented as a
fallback in Playwright's own guidance precisely because it depends on DOM
structure.

---

## Timing and state

### Shipping form auto-fill is timing-dependent

**Observed:** For a signed-in user, the checkout shipping form pre-populates
first name, last name, and email from the account profile. This population is
asynchronous. A user filling the form at human speed always sees the values
arrive first. An automated client that begins typing immediately can reach the
form before the fetch resolves, leaving those fields empty — and because all
three are `required`, the form silently refuses to submit with no error message
shown.

**Why it matters:** This is a genuine race condition, not a test artefact.
A user on a slow connection could plausibly hit the same window, tab past the
name fields assuming they will fill in, and be unable to submit without
understanding why.

**Why it is worth recording:** it is a concrete case of automated testing
finding something manual testing structurally cannot. The delay introduced by
moving a mouse and reading the screen is enough to mask it every time.

**How found:** The checkout test failed at the payment step. The trace showed
the shipping form still on screen after submission, with phone, address, city,
and postal code filled but the three profile fields blank. The test now supplies
every field explicitly rather than relying on auto-fill.

---

## Security — positive observation

### No account enumeration on sign-in

**Observed:** Signing in with a registered email and the wrong password, and
signing in with an email that has no account, both produce the same message:
*"Email ou mot de passe incorrect"*.

**Why it matters:** Applications that distinguish these cases let an attacker
confirm which email addresses are registered, which is useful for targeted
phishing and credential stuffing. Returning an identical message is the
recommended behaviour and it is implemented correctly here.

**How found:** Writing negative sign-in tests. Both cases were expected to need
different assertions; they did not, which is the correct outcome.

---

## What the CI pipeline exposed

Two defects existed in the test suite for weeks without being visible, because
specs were normally run one file at a time on a fast local machine. Running the
full suite serially on a slower CI runner surfaced both immediately.

**Double menu open.** The logout spec called `openMenu()` and then `logout()`,
which calls `openMenu()` internally. With the dropdown already open, Radix sets
`pointer-events: none` on the page behind it, so the second click could never
land and the test timed out after 30 seconds.

**Wrong element after logout.** The same spec then clicked
`user-menu-button` to verify that a logged-out user is redirected to `/auth`.
That test ID only exists while signed in; once logged out the icon is
`auth-link` wrapping `login-button`. The assertion failed on a URL that had
never changed.

Neither was caused by CI. Both were pre-existing errors that local conditions
had been hiding — which is a reasonable argument for running the full suite in a
clean environment on every push.

---

## Method

Findings were gathered as a by-product of building the test suite rather than
through a dedicated review pass. In practice this meant:

- reading the rendered DOM before writing any locator, rather than guessing at
  structure — several of the observations above are simply what became visible
  while doing that
- treating every unexplained failure as informative until proven otherwise, and
  reading the Playwright trace before forming a theory
- checking boundaries during exploration (quantity limits, empty states,
  out-of-stock products) as a matter of habit

# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: combined/billPay.combined.spec.ts >> Bill Pay UI + API Tests >> Bill Pay using API and validation by UI
- Location: tests/combined/billPay.combined.spec.ts:18:7

# Error details

```
TimeoutError: locator.fill: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('[id="customer.firstName"]')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - heading "Error 1015" [level=1] [ref=e5]
    - generic [ref=e6]: "Ray ID: a160cd772aa98909 •"
    - generic [ref=e7]: 2026-07-04 20:15:32 UTC
    - heading "You are being rate limited" [level=2] [ref=e8]
  - generic [ref=e10]:
    - heading "What happened?" [level=2] [ref=e11]
    - paragraph [ref=e12]: The owner of this website (parabank.parasoft.com) has banned you temporarily from accessing this website.
    - paragraph [ref=e13]:
      - text: Please see
      - link "https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1015/" [ref=e14] [cursor=pointer]:
        - /url: https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1015/
      - text: for more details.
  - generic [ref=e16]:
    - text: Was this page helpful?
    - button "Yes" [ref=e17] [cursor=pointer]
    - button "No" [ref=e18] [cursor=pointer]
  - paragraph [ref=e20]:
    - generic [ref=e21]:
      - text: "Cloudflare Ray ID:"
      - strong [ref=e22]: a160cd772aa98909
    - text: •
    - generic [ref=e23]:
      - text: "Your IP:"
      - button "Click to reveal" [ref=e24] [cursor=pointer]
      - text: •
    - generic [ref=e25]:
      - text: Performance & security by
      - link "Cloudflare" [ref=e26] [cursor=pointer]:
        - /url: https://www.cloudflare.com/5xx-error-landing
```

# Test source

```ts
  1  | import { Page, Locator, expect } from '@playwright/test';
  2  | 
  3  | export abstract class BasePage {
  4  |   constructor(protected readonly page: Page) {}
  5  | 
  6  |   /*---------Navigation------------*/
  7  |   // Navigate to a specific URL path.
  8  |   protected async goToUrl(path: string) {
  9  |     await this.page.goto(path);
  10 |   }
  11 | 
  12 |   /*---------Low-level helpers (protected)------------*/
  13 |   protected async BasePageClick(selector: string | Locator) {
  14 |     await this.toLocator(selector).click();
  15 |   }
  16 | 
  17 |   protected async BasePageClickWithTestId(testId: string) {
  18 |     await this.page.getByTestId(testId).click();
  19 |   }
  20 | 
  21 |   protected async BasePageFill(selector: string | Locator, value: string) {
> 22 |     await this.toLocator(selector).fill(value);
     |                                    ^ TimeoutError: locator.fill: Timeout 15000ms exceeded.
  23 |   }
  24 | 
  25 |   protected async BasePageSelectOption(selector: string | Locator, value: string) {
  26 |     await this.toLocator(selector).selectOption(value);
  27 |   }
  28 | 
  29 |   protected async BasePageCheck(selector: string | Locator) {
  30 |     await this.toLocator(selector).check();
  31 |   }
  32 | 
  33 |   protected async BasePageFillWithTestId(testId: string, value: string) {
  34 |     await this.page.getByTestId(testId).fill(value);
  35 |   }
  36 | 
  37 |   protected async BasePageExpectVisible(selector: string | Locator) {
  38 |     await expect(this.toLocator(selector)).toBeVisible();
  39 |   }
  40 | 
  41 |   protected async BasePageExpectHidden(selector: string | Locator) {
  42 |     await expect(this.toLocator(selector)).toBeHidden();
  43 |   }
  44 | 
  45 |    protected async BasePageExpectEnabled(selector: string | Locator) {
  46 |     await expect(this.toLocator(selector)).toBeEnabled();
  47 |   }
  48 | 
  49 |   /*---------Utility------------*/
  50 |   // This method is used to convert a string selector into a Locator.
  51 |   protected toLocator(selector: string | Locator): Locator {
  52 |     return typeof(selector) === 'string' ? this.page.locator(selector) : selector;
  53 |   }
  54 | 
  55 |   public Locator(selector: string | Locator): Locator {
  56 |     return this.toLocator(selector);
  57 |   }
  58 | }
```
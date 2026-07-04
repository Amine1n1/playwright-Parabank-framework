# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/loanRequest.spec.ts >> Loan Request Tests >> Successful Loan Request
- Location: tests/ui/loanRequest.spec.ts:16:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('#loanRequestApproved')
Expected: visible
Received: hidden
Timeout:  20000ms

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for locator('#loanRequestApproved')
    43 × locator resolved to <div id="loanRequestApproved">…</div>
       - unexpected value "hidden"

```

```yaml
- link:
  - /url: admin.htm
  - img
- link "ParaBank":
  - /url: index.htm
  - img "ParaBank"
- paragraph: Experience the difference
- list:
  - listitem: Solutions
  - listitem:
    - link "About Us":
      - /url: about.htm
  - listitem:
    - link "Services":
      - /url: services.htm
  - listitem:
    - link "Products":
      - /url: http://www.parasoft.com/jsp/products.jsp
  - listitem:
    - link "Locations":
      - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
  - listitem:
    - link "Admin Page":
      - /url: admin.htm
- list:
  - listitem:
    - link "home":
      - /url: index.htm
  - listitem:
    - link "about":
      - /url: about.htm
  - listitem:
    - link "contact":
      - /url: contact.htm
- paragraph: Welcome amine test
- heading "Account Services" [level=2]
- list:
  - listitem:
    - link "Open New Account":
      - /url: openaccount.htm
  - listitem:
    - link "Accounts Overview":
      - /url: overview.htm
  - listitem:
    - link "Transfer Funds":
      - /url: transfer.htm
  - listitem:
    - link "Bill Pay":
      - /url: billpay.htm
  - listitem:
    - link "Find Transactions":
      - /url: findtrans.htm
  - listitem:
    - link "Update Contact Info":
      - /url: updateprofile.htm
  - listitem:
    - link "Request Loan":
      - /url: requestloan.htm
  - listitem:
    - link "Log Out":
      - /url: logout.htm
- heading "Error!" [level=1]
- paragraph: An internal error has occurred and has been logged.
- list:
  - listitem:
    - link "Home":
      - /url: index.htm
    - text: "|"
  - listitem:
    - link "About Us":
      - /url: about.htm
    - text: "|"
  - listitem:
    - link "Services":
      - /url: services.htm
    - text: "|"
  - listitem:
    - link "Products":
      - /url: http://www.parasoft.com/jsp/products.jsp
    - text: "|"
  - listitem:
    - link "Locations":
      - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
    - text: "|"
  - listitem:
    - link "Forum":
      - /url: http://forums.parasoft.com/
    - text: "|"
  - listitem:
    - link "Site Map":
      - /url: sitemap.htm
    - text: "|"
  - listitem:
    - link "Contact Us":
      - /url: contact.htm
- paragraph: © Parasoft. All rights reserved.
- list:
  - listitem: "Visit us at:"
  - listitem:
    - link "www.parasoft.com":
      - /url: http://www.parasoft.com/
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
  22 |     await this.toLocator(selector).fill(value);
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
> 38 |     await expect(this.toLocator(selector)).toBeVisible();
     |                                            ^ Error: expect(locator).toBeVisible() failed
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
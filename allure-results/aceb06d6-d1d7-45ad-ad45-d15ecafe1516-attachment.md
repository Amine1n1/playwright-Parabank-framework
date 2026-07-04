# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/login.spec.ts >> Login Tests >> Failed Login
- Location: tests/ui/login.spec.ts:27:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('The username and password could not be verified.')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByText('The username and password could not be verified.')

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
- paragraph: Welcome John Smith
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
- heading "Accounts Overview" [level=1]
- table:
  - rowgroup:
    - row "Account Balance* Available Amount":
      - columnheader "Account"
      - columnheader "Balance*"
      - columnheader "Available Amount"
  - rowgroup:
    - row "13344 $4722.93 $4722.93":
      - cell "13344":
        - link "13344":
          - /url: activity.htm?id=13344
      - cell "$4722.93"
      - cell "$4722.93"
    - row "14121 $100.00 $100.00":
      - cell "14121":
        - link "14121":
          - /url: activity.htm?id=14121
      - cell "$100.00"
      - cell "$100.00"
    - row "14565 $100.00 $100.00":
      - cell "14565":
        - link "14565":
          - /url: activity.htm?id=14565
      - cell "$100.00"
      - cell "$100.00"
    - row "14676 $100.00 $100.00":
      - cell "14676":
        - link "14676":
          - /url: activity.htm?id=14676
      - cell "$100.00"
      - cell "$100.00"
    - row "Total $5022.93":
      - cell "Total"
      - cell "$5022.93"
      - cell
  - rowgroup:
    - row "*Balance includes deposits that may be subject to holds":
      - cell "*Balance includes deposits that may be subject to holds"
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
  58 | 
  59 |   public async waitForTimeOut(timeout: number) {
  60 |     await this.page.waitForTimeout(timeout);
  61 |   }
  62 | }
```
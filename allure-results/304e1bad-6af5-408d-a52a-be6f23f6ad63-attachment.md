# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: combined/checkTransactionInfo.combined.spec.ts >> Check Transaction Infos Tests API + UI >> Transfer funds Successful using API and validation by UI
- Location: tests/combined/checkTransactionInfo.combined.spec.ts:17:7

# Error details

```
Error: locator.fill: value: expected string, got undefined
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - link:
        - /url: admin.htm
        - img [ref=e4] [cursor=pointer]
      - link "ParaBank":
        - /url: index.htm
        - img "ParaBank" [ref=e5] [cursor=pointer]
      - paragraph [ref=e6]: Experience the difference
    - generic [ref=e7]:
      - list [ref=e8]:
        - listitem [ref=e9]: Solutions
        - listitem [ref=e10]:
          - link "About Us" [ref=e11] [cursor=pointer]:
            - /url: about.htm
        - listitem [ref=e12]:
          - link "Services" [ref=e13] [cursor=pointer]:
            - /url: services.htm
        - listitem [ref=e14]:
          - link "Products" [ref=e15] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/products.jsp
        - listitem [ref=e16]:
          - link "Locations" [ref=e17] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - listitem [ref=e18]:
          - link "Admin Page" [ref=e19] [cursor=pointer]:
            - /url: admin.htm
      - list [ref=e20]:
        - listitem [ref=e21]:
          - link "home" [ref=e22] [cursor=pointer]:
            - /url: index.htm
        - listitem [ref=e23]:
          - link "about" [ref=e24] [cursor=pointer]:
            - /url: about.htm
        - listitem [ref=e25]:
          - link "contact" [ref=e26] [cursor=pointer]:
            - /url: contact.htm
    - generic [ref=e27]:
      - generic [ref=e28]:
        - paragraph [ref=e29]: Welcome amine test
        - heading "Account Services" [level=2] [ref=e30]
        - list [ref=e31]:
          - listitem [ref=e32]:
            - link "Open New Account" [ref=e33] [cursor=pointer]:
              - /url: openaccount.htm
          - listitem [ref=e34]:
            - link "Accounts Overview" [ref=e35] [cursor=pointer]:
              - /url: overview.htm
          - listitem [ref=e36]:
            - link "Transfer Funds" [ref=e37] [cursor=pointer]:
              - /url: transfer.htm
          - listitem [ref=e38]:
            - link "Bill Pay" [ref=e39] [cursor=pointer]:
              - /url: billpay.htm
          - listitem [ref=e40]:
            - link "Find Transactions" [ref=e41] [cursor=pointer]:
              - /url: findtrans.htm
          - listitem [ref=e42]:
            - link "Update Contact Info" [ref=e43] [cursor=pointer]:
              - /url: updateprofile.htm
          - listitem [ref=e44]:
            - link "Request Loan" [ref=e45] [cursor=pointer]:
              - /url: requestloan.htm
          - listitem [ref=e46]:
            - link "Log Out" [ref=e47] [cursor=pointer]:
              - /url: logout.htm
      - generic [ref=e50]:
        - heading "Find Transactions" [level=1] [ref=e51]
        - generic [ref=e52]:
          - generic [ref=e53]:
            - text: "Select an account:"
            - combobox [ref=e54]:
              - option "39873" [selected]
              - option "40095"
          - separator [ref=e55]
          - generic [ref=e56]:
            - text: "Find by Transaction ID:"
            - textbox [ref=e57]
          - button "Find Transactions" [ref=e59] [cursor=pointer]
          - separator [ref=e60]
          - generic [ref=e61]:
            - text: "Find by Date:"
            - textbox [ref=e62]
            - text: ( MM-DD-YYYY )
          - button "Find Transactions" [ref=e64] [cursor=pointer]
          - separator [ref=e65]
          - generic [ref=e66]:
            - paragraph [ref=e67]: Find by Date Range
            - generic [ref=e68]:
              - text: Between
              - textbox [ref=e69]
              - text: and
              - textbox [ref=e70]
              - text: ( MM-DD-YYYY )
          - button "Find Transactions" [ref=e72] [cursor=pointer]
          - separator [ref=e73]
          - generic [ref=e74]:
            - text: "Find by Amount:"
            - textbox [ref=e75]
          - button "Find Transactions" [ref=e77] [cursor=pointer]
  - generic [ref=e79]:
    - list [ref=e80]:
      - listitem [ref=e81]:
        - link "Home" [ref=e82] [cursor=pointer]:
          - /url: index.htm
        - text: "|"
      - listitem [ref=e83]:
        - link "About Us" [ref=e84] [cursor=pointer]:
          - /url: about.htm
        - text: "|"
      - listitem [ref=e85]:
        - link "Services" [ref=e86] [cursor=pointer]:
          - /url: services.htm
        - text: "|"
      - listitem [ref=e87]:
        - link "Products" [ref=e88] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/products.jsp
        - text: "|"
      - listitem [ref=e89]:
        - link "Locations" [ref=e90] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - text: "|"
      - listitem [ref=e91]:
        - link "Forum" [ref=e92] [cursor=pointer]:
          - /url: http://forums.parasoft.com/
        - text: "|"
      - listitem [ref=e93]:
        - link "Site Map" [ref=e94] [cursor=pointer]:
          - /url: sitemap.htm
        - text: "|"
      - listitem [ref=e95]:
        - link "Contact Us" [ref=e96] [cursor=pointer]:
          - /url: contact.htm
    - paragraph [ref=e97]: © Parasoft. All rights reserved.
    - list [ref=e98]:
      - listitem [ref=e99]: "Visit us at:"
      - listitem [ref=e100]:
        - link "www.parasoft.com" [ref=e101] [cursor=pointer]:
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
> 22 |     await this.toLocator(selector).fill(value);
     |                                    ^ Error: locator.fill: value: expected string, got undefined
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
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/login.spec.ts >> Login Tests >> Failed Login
- Location: tests/ui/login.spec.ts:19:7

# Error details

```
TimeoutError: locator.fill: Timeout 15000ms exceeded.
Call log:
  - waiting for getByLabel('Username')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - link:
        - /url: admin.htm;jsessionid=16A379EED557F1FA814F74D936AF6FD6
        - img [ref=e4] [cursor=pointer]
      - link "ParaBank":
        - /url: index.htm;jsessionid=16A379EED557F1FA814F74D936AF6FD6
        - img "ParaBank" [ref=e5] [cursor=pointer]
      - paragraph [ref=e6]: Experience the difference
    - generic [ref=e7]:
      - list [ref=e8]:
        - listitem [ref=e9]: Solutions
        - listitem [ref=e10]:
          - link "About Us" [ref=e11] [cursor=pointer]:
            - /url: about.htm;jsessionid=16A379EED557F1FA814F74D936AF6FD6
        - listitem [ref=e12]:
          - link "Services" [ref=e13] [cursor=pointer]:
            - /url: services.htm;jsessionid=16A379EED557F1FA814F74D936AF6FD6
        - listitem [ref=e14]:
          - link "Products" [ref=e15] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/products.jsp
        - listitem [ref=e16]:
          - link "Locations" [ref=e17] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - listitem [ref=e18]:
          - link "Admin Page" [ref=e19] [cursor=pointer]:
            - /url: admin.htm;jsessionid=16A379EED557F1FA814F74D936AF6FD6
      - list [ref=e20]:
        - listitem [ref=e21]:
          - link "home" [ref=e22] [cursor=pointer]:
            - /url: index.htm;jsessionid=16A379EED557F1FA814F74D936AF6FD6
        - listitem [ref=e23]:
          - link "about" [ref=e24] [cursor=pointer]:
            - /url: about.htm;jsessionid=16A379EED557F1FA814F74D936AF6FD6
        - listitem [ref=e25]:
          - link "contact" [ref=e26] [cursor=pointer]:
            - /url: contact.htm;jsessionid=16A379EED557F1FA814F74D936AF6FD6
    - generic [ref=e27]:
      - generic [ref=e28]:
        - heading "Customer Login" [level=2] [ref=e29]
        - generic [ref=e30]:
          - generic [ref=e31]:
            - paragraph [ref=e32]: Username
            - textbox [active] [ref=e34]
            - paragraph [ref=e35]: Password
            - textbox [ref=e37]
            - button "Log In" [ref=e39] [cursor=pointer]
          - paragraph [ref=e40]:
            - link "Forgot login info?" [ref=e41] [cursor=pointer]:
              - /url: lookup.htm;jsessionid=16A379EED557F1FA814F74D936AF6FD6
          - paragraph [ref=e42]:
            - link "Register" [ref=e43] [cursor=pointer]:
              - /url: register.htm;jsessionid=16A379EED557F1FA814F74D936AF6FD6
      - generic [ref=e44]:
        - heading "Error!" [level=1] [ref=e45]
        - paragraph [ref=e46]: The requested page /parabank/login was not found on the server.
  - generic [ref=e48]:
    - list [ref=e49]:
      - listitem [ref=e50]:
        - link "Home" [ref=e51] [cursor=pointer]:
          - /url: index.htm;jsessionid=16A379EED557F1FA814F74D936AF6FD6
        - text: "|"
      - listitem [ref=e52]:
        - link "About Us" [ref=e53] [cursor=pointer]:
          - /url: about.htm;jsessionid=16A379EED557F1FA814F74D936AF6FD6
        - text: "|"
      - listitem [ref=e54]:
        - link "Services" [ref=e55] [cursor=pointer]:
          - /url: services.htm;jsessionid=16A379EED557F1FA814F74D936AF6FD6
        - text: "|"
      - listitem [ref=e56]:
        - link "Products" [ref=e57] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/products.jsp
        - text: "|"
      - listitem [ref=e58]:
        - link "Locations" [ref=e59] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - text: "|"
      - listitem [ref=e60]:
        - link "Forum" [ref=e61] [cursor=pointer]:
          - /url: http://forums.parasoft.com/
        - text: "|"
      - listitem [ref=e62]:
        - link "Site Map" [ref=e63] [cursor=pointer]:
          - /url: sitemap.htm;jsessionid=16A379EED557F1FA814F74D936AF6FD6
        - text: "|"
      - listitem [ref=e64]:
        - link "Contact Us" [ref=e65] [cursor=pointer]:
          - /url: contact.htm;jsessionid=16A379EED557F1FA814F74D936AF6FD6
    - paragraph [ref=e66]: © Parasoft. All rights reserved.
    - list [ref=e67]:
      - listitem [ref=e68]: "Visit us at:"
      - listitem [ref=e69]:
        - link "www.parasoft.com" [ref=e70] [cursor=pointer]:
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
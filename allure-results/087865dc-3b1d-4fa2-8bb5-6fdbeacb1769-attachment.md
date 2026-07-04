# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/register.spec.ts >> Register Tests >> Failed Register
- Location: tests/ui/register.spec.ts:21:7

# Error details

```
TimeoutError: locator.inputValue: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('[id="customer.firstName"]')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - main [ref=e2]:
    - generic [ref=e3]:
      - heading "parabank.parasoft.com" [level=1] [ref=e5]
      - heading "Performing security verification" [level=2] [ref=e6]
      - paragraph [ref=e7]: This website uses a security service to protect against malicious bots. This page is displayed while the website verifies you are not a bot.
  - contentinfo [ref=e11]:
    - generic [ref=e13]:
      - generic [ref=e15]:
        - text: "Ray ID:"
        - code [ref=e16]: a11eeb4f7b8f9d85
      - generic [ref=e17]:
        - generic [ref=e18]:
          - text: Performance and Security by
          - link "Cloudflare" [ref=e19] [cursor=pointer]:
            - /url: https://www.cloudflare.com?utm_source=challenge&utm_campaign=m
        - link "Privacy" [ref=e21] [cursor=pointer]:
          - /url: https://www.cloudflare.com/privacypolicy/
```

# Test source

```ts
  1  | import { BasePage } from "./BasePage";
  2  | import { expect } from '@playwright/test';
  3  | import { User } from "../types/user.types";
  4  | 
  5  | export class RegisterPage extends BasePage {
  6  | 
  7  |   async goToRegisterPage() {
  8  |     await this.goToUrl('/parabank/register.htm');
  9  |   }
  10 | 
  11 |   async registerUser(newUser : User) {
  12 |     await this.BasePageFill('[id="customer.firstName"]', newUser.firstname);
  13 |     await this.BasePageFill('[id="customer.lastName"]', newUser.lastname);
  14 |     await this.BasePageFill('[id="customer.address.street"]', newUser.address.street);
  15 |     await this.BasePageFill('[id="customer.address.city"]', newUser.address.city);
  16 |     await this.BasePageFill('[id="customer.address.state"]', newUser.address.state);
  17 |     await this.BasePageFill('[id="customer.address.zipCode"]', newUser.address.zipcode);
  18 |     await this.BasePageFill('[id="customer.phoneNumber"]', newUser.phone);
  19 |     await this.BasePageFill('[id="customer.ssn"]', newUser.ssn);
  20 |     await this.BasePageFill('[id="customer.username"]', newUser.username);
  21 |     await this.BasePageFill('[id="customer.password"]', newUser.password);
  22 |     await this.BasePageFill('[id="repeatedPassword"]', newUser.password);
  23 | 
  24 |     await this.BasePageClick(this.page.getByRole('button', {name: "Register"}));
  25 |   }
  26 | 
  27 |   async expectRegisterSuccessful() {
  28 |     await this.BasePageExpectVisible(this.page.getByText('Your account was created successfully. You are now logged in.'));
  29 |   }
  30 | 
  31 |   async expectRegisterFailure(user: User) {
  32 |     const fields = [
  33 |       {selector: '[id="customer.firstName"]', errorId: '[id="customer.firstName.errors"]'},
  34 |       {selector: '[id="customer.lastName"]', errorId: '[id ="customer.lastName.errors"]'},
  35 |       {selector: '[id="customer.address.street"]', errorId: '[id="customer.address.street.errors"]'},
  36 |       {selector: '[id="customer.address.city"]', errorId: '[id="customer.address.city.errors"]'},
  37 |       {selector: '[id="customer.address.state"]', errorId: '[id="customer.address.state.errors"]'},
  38 |       {selector: '[id="customer.address.zipCode"]', errorId: '[id="customer.address.zipCode.errors"]'},
  39 |       {selector: '[id="customer.ssn"]', errorId: '[id="customer.ssn.errors"]'},
  40 |       {selector: '[id="customer.username"]', errorId: '[id="customer.username.errors"]'},
  41 |       {selector: '[id="customer.password"]', errorId: '[id="customer.password.errors"]'},
  42 |       {selector: '[id="repeatedPassword"]', errorId: '[id="repeatedPassword.errors"]'},
  43 |     ]
  44 | 
  45 |     for (const field of fields ) {
> 46 |       if (await this.Locator(field.selector).inputValue() === '') {
     |                                              ^ TimeoutError: locator.inputValue: Timeout 15000ms exceeded.
  47 |         if (field.selector === '[id="customer.password"]' || field.selector ===  '[id="repeatedPassword"]'){ 
  48 |             if (user.password === '') {
  49 |               await this.BasePageExpectVisible(field.errorId);
  50 |             } 
  51 |         } else {
  52 |             await this.BasePageExpectVisible(field.errorId);
  53 |         }
  54 |       }
  55 |     }
  56 |   }
  57 | }
```
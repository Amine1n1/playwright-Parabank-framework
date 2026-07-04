# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: combined/transferFunds.combined.spec.ts >> Transfer Funds Tests API + UI >> Transfer funds Successful using API and validation by UI
- Location: tests/combined/transferFunds.combined.spec.ts:17:7

# Error details

```
Error: expect(received).toBeCloseTo(expected, precision)

Expected: 565.5
Received: 515.5

Expected precision:    2
Expected difference: < 0.005
Received difference:   50
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
        - heading "Accounts Overview" [level=1] [ref=e51]
        - table [ref=e52]:
          - rowgroup [ref=e53]:
            - row "Account Balance* Available Amount" [ref=e54]:
              - columnheader "Account" [ref=e55]
              - columnheader "Balance*" [ref=e56]
              - columnheader "Available Amount" [ref=e57]
          - rowgroup [ref=e58]:
            - row "14454 $365.50 $365.50" [ref=e59]:
              - cell "14454" [ref=e60]:
                - link "14454" [ref=e61] [cursor=pointer]:
                  - /url: activity.htm?id=14454
              - cell "$365.50" [ref=e62]
              - cell "$365.50" [ref=e63]
            - row "14565 $150.00 $150.00" [ref=e64]:
              - cell "14565" [ref=e65]:
                - link "14565" [ref=e66] [cursor=pointer]:
                  - /url: activity.htm?id=14565
              - cell "$150.00" [ref=e67]
              - cell "$150.00" [ref=e68]
            - row "Total $515.50" [ref=e69]:
              - cell "Total" [ref=e70]
              - cell "$515.50" [ref=e71]
              - cell [ref=e72]
          - rowgroup [ref=e73]:
            - row "*Balance includes deposits that may be subject to holds" [ref=e74]:
              - cell "*Balance includes deposits that may be subject to holds" [ref=e75]
  - generic [ref=e77]:
    - list [ref=e78]:
      - listitem [ref=e79]:
        - link "Home" [ref=e80] [cursor=pointer]:
          - /url: index.htm
        - text: "|"
      - listitem [ref=e81]:
        - link "About Us" [ref=e82] [cursor=pointer]:
          - /url: about.htm
        - text: "|"
      - listitem [ref=e83]:
        - link "Services" [ref=e84] [cursor=pointer]:
          - /url: services.htm
        - text: "|"
      - listitem [ref=e85]:
        - link "Products" [ref=e86] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/products.jsp
        - text: "|"
      - listitem [ref=e87]:
        - link "Locations" [ref=e88] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - text: "|"
      - listitem [ref=e89]:
        - link "Forum" [ref=e90] [cursor=pointer]:
          - /url: http://forums.parasoft.com/
        - text: "|"
      - listitem [ref=e91]:
        - link "Site Map" [ref=e92] [cursor=pointer]:
          - /url: sitemap.htm
        - text: "|"
      - listitem [ref=e93]:
        - link "Contact Us" [ref=e94] [cursor=pointer]:
          - /url: contact.htm
    - paragraph [ref=e95]: © Parasoft. All rights reserved.
    - list [ref=e96]:
      - listitem [ref=e97]: "Visit us at:"
      - listitem [ref=e98]:
        - link "www.parasoft.com" [ref=e99] [cursor=pointer]:
          - /url: http://www.parasoft.com/
```

# Test source

```ts
  1  | import { test, expect } from '../../fixtures/pom.fixture';
  2  | import 'dotenv/config';
  3  | import { newUser } from '../../test-data/userData';
  4  | 
  5  | test.describe('Transfer Funds Tests API + UI', () => {
  6  | 
  7  |    // ✅ Override storageState for this entire describe block → start fresh (not logged in)
  8  |   test.use({ storageState: { cookies: [], origins: [] } });
  9  | 
  10 |   test.beforeEach(async ({ pm }) => {
  11 |     await pm.registerPage.goToRegisterPage();
  12 |     await pm.registerPage.registerUser(newUser);
  13 |     await pm.registerPage.expectRegisterSuccessful();
  14 | 
  15 |   });
  16 | 
  17 |   test('Transfer funds Successful using API and validation by UI', async ({ pm,accountsApi }) => {
  18 |     
  19 |     await pm.overviewPage.goToOverviewPage();
  20 |     await pm.overviewPage.waitForTableFilled();
  21 | 
  22 |     const accounts = await pm.overviewPage.getAllAccounts();
  23 |     const accounId = accounts[0];
  24 |     const accountType = 1;   
  25 | 
  26 |     const response = await accountsApi.getAccountById(accounId);
  27 | 
  28 |     expect(response.status()).toBe(200);
  29 | 
  30 |     const responseBody = await response.json();
  31 | 
  32 |     const customerId = responseBody.customerId;
  33 | 
  34 |     //open new Account using API Endpoint createAccount
  35 | 
  36 |     const createNewAccount = await accountsApi.openNewAccount(customerId, accountType, accounId);
  37 | 
  38 |     expect(createNewAccount.status()).toBe(200);
  39 | 
  40 |     const createNewAccountBody = await createNewAccount.json();
  41 | 
  42 |     const toAccount = createNewAccountBody.id;
  43 |     const fromAccount = accounId;
  44 |     const amount = 50;
  45 | 
  46 |     await pm.overviewPage.goToOverviewPage();
  47 |     await pm.overviewPage.waitForTableFilled();
  48 | 
  49 |     //Get accounts balance before the transfer from UI
  50 |     const fromAccountBalanceBeforeTransfer = await pm.overviewPage.getAccountBalance(fromAccount);
  51 |     const toAccountBalanceBeforeTransfer = await pm.overviewPage.getAccountBalance(toAccount);
  52 | 
  53 |     const transferFunds = await accountsApi.transferFunds(fromAccount, toAccount, amount);
  54 | 
  55 |     expect(transferFunds.status()).toBe(200);
  56 | 
  57 |     const transferFundsText = await transferFunds.text();
  58 | 
  59 |     expect(transferFundsText).toContain(`Successfully transferred $${amount} from account #${fromAccount} to account #${toAccount}`);
  60 | 
  61 |     //Get accounts balance after the transfer from UI
  62 |     await pm.overviewPage.goToOverviewPage();
  63 |     await pm.overviewPage.waitForTableFilled();
  64 | 
  65 |     const fromAccountBalanceAfterTransfer = await pm.overviewPage.getAccountBalance(fromAccount);
  66 |     const toAccountBalanceAfterTransfer = await pm.overviewPage.getAccountBalance(toAccount);
  67 | 
  68 |     console.log(fromAccountBalanceBeforeTransfer);
  69 |     console.log(fromAccountBalanceAfterTransfer);
  70 |     console.log(toAccountBalanceBeforeTransfer);
  71 |     console.log(toAccountBalanceAfterTransfer);
  72 | 
  73 |     expect(fromAccountBalanceAfterTransfer).toBeCloseTo(fromAccountBalanceBeforeTransfer - amount, 2);
  74 | 
> 75 |     expect(toAccountBalanceAfterTransfer).toBeCloseTo(toAccountBalanceBeforeTransfer + amount, 2);
     |                                           ^ Error: expect(received).toBeCloseTo(expected, precision)
  76 |     
  77 |   });
  78 | });
```
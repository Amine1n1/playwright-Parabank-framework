# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: combined/checkTransactionInfo.combined.spec.ts >> Check Transaction Infos Tests API + UI >> Transfer funds Successful using API and validation by UI
- Location: tests/combined/checkTransactionInfo.combined.spec.ts:17:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "35"
Received: ["$35.00"]
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
        - heading "Transaction Results" [level=1] [ref=e51]
        - table [ref=e52]:
          - rowgroup [ref=e53]:
            - row "Date Transaction Debit (-) Credit (+)" [ref=e54]:
              - columnheader "Date" [ref=e55]
              - columnheader "Transaction" [ref=e56]
              - columnheader "Debit (-)" [ref=e57]
              - columnheader "Credit (+)" [ref=e58]
          - rowgroup [ref=e59]:
            - row "06-29-2026 Funds Transfer Sent $35.00" [ref=e60]:
              - cell "06-29-2026" [ref=e61]
              - cell "Funds Transfer Sent" [ref=e62]:
                - link "Funds Transfer Sent" [ref=e63] [cursor=pointer]:
                  - /url: /parabank/transaction.htm?id=53881
              - cell "$35.00" [ref=e64]
              - cell [ref=e65]
  - generic [ref=e67]:
    - list [ref=e68]:
      - listitem [ref=e69]:
        - link "Home" [ref=e70] [cursor=pointer]:
          - /url: index.htm
        - text: "|"
      - listitem [ref=e71]:
        - link "About Us" [ref=e72] [cursor=pointer]:
          - /url: about.htm
        - text: "|"
      - listitem [ref=e73]:
        - link "Services" [ref=e74] [cursor=pointer]:
          - /url: services.htm
        - text: "|"
      - listitem [ref=e75]:
        - link "Products" [ref=e76] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/products.jsp
        - text: "|"
      - listitem [ref=e77]:
        - link "Locations" [ref=e78] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - text: "|"
      - listitem [ref=e79]:
        - link "Forum" [ref=e80] [cursor=pointer]:
          - /url: http://forums.parasoft.com/
        - text: "|"
      - listitem [ref=e81]:
        - link "Site Map" [ref=e82] [cursor=pointer]:
          - /url: sitemap.htm
        - text: "|"
      - listitem [ref=e83]:
        - link "Contact Us" [ref=e84] [cursor=pointer]:
          - /url: contact.htm
    - paragraph [ref=e85]: © Parasoft. All rights reserved.
    - list [ref=e86]:
      - listitem [ref=e87]: "Visit us at:"
      - listitem [ref=e88]:
        - link "www.parasoft.com" [ref=e89] [cursor=pointer]:
          - /url: http://www.parasoft.com/
```

# Test source

```ts
  1  | import { test, expect } from '../../fixtures/pom.fixture';
  2  | import 'dotenv/config';
  3  | import { newUser } from '../../test-data/userData';
  4  | 
  5  | test.describe('Check Transaction Infos Tests API + UI', () => {
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
  23 |     const fromAccount = accounts[0];
  24 | 
  25 |     const accountType = 0;   
  26 |     const amount = 35;
  27 | 
  28 |     const response = await accountsApi.getAccountById(fromAccount);
  29 | 
  30 |     expect(response.status()).toBe(200);
  31 | 
  32 |     const responseBody = await response.json();
  33 | 
  34 |     const customerId = responseBody.customerId;
  35 | 
  36 |     const createAccount = await accountsApi.openNewAccount(customerId, accountType, fromAccount);
  37 | 
  38 |     expect(createAccount.status()).toBe(200);
  39 | 
  40 |     const createAccountBody = await createAccount.json();
  41 | 
  42 |     const toAccount = createAccountBody.id.toString();
  43 | 
  44 |     const transferFunds = await accountsApi.transferFunds(fromAccount, toAccount, amount);
  45 | 
  46 |     expect(transferFunds.status()).toBe(200);
  47 | 
  48 |     const getTransactionsAccount = await accountsApi.getTransactionsForAccount(fromAccount);
  49 | 
  50 |     expect(getTransactionsAccount.status()).toBe(200);
  51 | 
  52 |     const getTransactionsAccountBody = await getTransactionsAccount.json();
  53 | 
  54 |     console.log(getTransactionsAccountBody);
  55 | 
  56 |     const transactionId = getTransactionsAccountBody[1].id.toString();
  57 | 
  58 |     await pm.findTransactionPage.goToTxPage();
  59 | 
  60 |     await pm.findTransactionPage.findTransactionById(transactionId, fromAccount);
  61 | 
  62 |     await pm.findTransactionPage.waitForTableFilled();
  63 | 
  64 |     const TxDesc = await pm.findTransactionPage.getTransactionDescription();
  65 | 
  66 |     const TxDebit = await pm.findTransactionPage.getTransactionDebit();
  67 | 
  68 |     expect(TxDesc).toContain('Funds Transfer Sent');
> 69 |     expect(TxDebit).toBe(amount.toString());
     |                     ^ Error: expect(received).toBe(expected) // Object.is equality
  70 |     
  71 |   });
  72 | });
```
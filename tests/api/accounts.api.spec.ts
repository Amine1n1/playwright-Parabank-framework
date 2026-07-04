import { test, expect } from '../../fixtures/pom.fixture';
import 'dotenv/config';
import { createNewUser } from '../../test-data/userData';
import { User } from '../../types/user.types';

test.describe('Accounts Tests', () => {

  let newUser : User;
   // ✅ Override storageState for this entire describe block → start fresh (not logged in)
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ pm }) => {
    newUser = createNewUser();
    await pm.registerPage.goToRegisterPage();
    await pm.registerPage.registerUser(newUser);
    await pm.registerPage.expectRegisterSuccessful();
    
  });

  test('Open new Account Successful using API Endpoint createAccount', async ({ pm, accountsApi }) => {
    
    await pm.overviewPage.goToOverviewPage();
    await pm.overviewPage.waitForTableFilled();

    const accounts = await pm.overviewPage.getAllAccounts();
    const accounId = accounts[0];
    const accountType = 0;

    const accountTypes = [
      {accountType: 0, accountTypeName: 'CHECKING'},
      {accountType: 1, accountTypeName: 'SAVINGS'},
    ];

    //Use getAccount to get the CustomerId
    const response = await accountsApi.getAccountById(accounId);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    const customerId = responseBody.customerId;

    //open new Account using API Endpoint createAccount

    const createNewAccount = await accountsApi.openNewAccount(customerId, accountType, accounId);

    expect(createNewAccount.status()).toBe(200);

    const createNewAccountBody = await createNewAccount.json();

    expect(createNewAccountBody.customerId).toBe(customerId);
    if (accountType) {
      expect(createNewAccountBody.type).toBe(accountTypes[1].accountTypeName);
    } else {
      expect(createNewAccountBody.type).toBe(accountTypes[0].accountTypeName);
    }
    expect(createNewAccountBody).toHaveProperty('balance');
   
  });

  test('Open new Account Failed using API Endpoint createAccount, invalid customerId', async ({ pm,accountsApi }) => {
    
    await pm.overviewPage.goToOverviewPage();
    await pm.overviewPage.waitForTableFilled();

    const accounts = await pm.overviewPage.getAllAccounts();
    const accounId = accounts[0];
    const accountType = 1;
    const customerId = '00000';

    const createNewAccount = await accountsApi.openNewAccount(customerId, accountType, accounId);

    expect(createNewAccount.status()).toBe(400);
  });

  test('Transfer funds Successful using API Endpoint transfer', async ({ pm,accountsApi }) => {
    
    await pm.overviewPage.goToOverviewPage();
    await pm.overviewPage.waitForTableFilled();

    const accounts = await pm.overviewPage.getAllAccounts();
    const accounId = accounts[0];
    const accountType = 1;   

    const response = await accountsApi.getAccountById(accounId);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    const customerId = responseBody.customerId;

    //open new Account using API Endpoint createAccount

    const createNewAccount = await accountsApi.openNewAccount(customerId, accountType, accounId);

    expect(createNewAccount.status()).toBe(200);

    const createNewAccountBody = await createNewAccount.json();

    const toAccount = createNewAccountBody.id;
    const fromAccount = accounId;
    const amount = 50;

    const transferFunds = await accountsApi.transferFunds(fromAccount, toAccount, amount);

    expect(transferFunds.status()).toBe(200);

    const transferFundsText = await transferFunds.text();

    expect(transferFundsText).toContain(`Successfully transferred $${amount} from account #${fromAccount} to account #${toAccount}`);
  });

   test('Transfer funds Failed using API Endpoint createAccount, invalid fromAccountId', async ({ pm,accountsApi }) => {
    
    await pm.overviewPage.goToOverviewPage();
    await pm.overviewPage.waitForTableFilled();

    const accounts = await pm.overviewPage.getAllAccounts();
    const accounId = accounts[0];
    const accountType = 1;   

    const response = await accountsApi.getAccountById(accounId);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    const customerId = responseBody.customerId;

    //open new Account using API Endpoint createAccount

    const createNewAccount = await accountsApi.openNewAccount(customerId, accountType, accounId);

    expect(createNewAccount.status()).toBe(200);

    const createNewAccountBody = await createNewAccount.json();

    const toAccount = createNewAccountBody.id;
    const fromAccount = '11111';

    const amount = 30;

    const transferFunds = await accountsApi.transferFunds(fromAccount, toAccount, amount);

    expect(transferFunds.status()).toBe(400);

    const transferFundsText = await transferFunds.text();
    console.log(transferFundsText);
    expect(transferFundsText).toContain(`Could not find account number ${fromAccount}`);
  });

  test('Get all Accounts of a customer using API Endpoint accounts', async ({ pm,accountsApi }) => {

    await pm.overviewPage.goToOverviewPage();
    await pm.overviewPage.waitForTableFilled();

    const accounts = await pm.overviewPage.getAllAccounts();
    const accounId = accounts[0];

    const response = await accountsApi.getAccountById(accounId);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    const customerId = responseBody.customerId;

    const getAccounts = await accountsApi.getAccounts(customerId);

    expect(getAccounts.status()).toBe(200);

    const getAccountsBody = await getAccounts.json();

    expect(getAccountsBody.length).toBeGreaterThan(0);

  });

   test('Deposit Funds into an Account Successfull ', async ({ pm,accountsApi }) => {

    await pm.overviewPage.goToOverviewPage();
    await pm.overviewPage.waitForTableFilled();

    const accounts = await pm.overviewPage.getAllAccounts();
    const accounId = accounts[0];
    const amount = 60;

    const depositFunds = await accountsApi.deposit(accounId, amount);

    expect(depositFunds.status()).toBe(200);
    
    const depositFundsText = await depositFunds.text();
  
    expect(depositFundsText).toContain(`Successfully deposited $${amount} to account #${accounId}`);
  });

});
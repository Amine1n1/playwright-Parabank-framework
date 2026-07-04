import { test, expect } from '../../fixtures/pom.fixture';
import 'dotenv/config';
import { createNewUser } from '../../test-data/userData';
import { User } from '../../types/user.types';

test.describe('Transfer Funds Tests API + UI', () => {

  let newUser: User;
   // ✅ Override storageState for this entire describe block → start fresh (not logged in)
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ pm }) => {
    newUser = createNewUser();
    await pm.registerPage.goToRegisterPage();
    await pm.registerPage.registerUser(newUser);
    await pm.registerPage.expectRegisterSuccessful();

  });

  test('Transfer funds Successful using API and validation by UI', async ({ pm,accountsApi }) => {
    
    await pm.overviewPage.goToOverviewPage();
    await pm.overviewPage.waitForTableFilled();

    const accounts = await pm.overviewPage.getAllAccounts();
    const accounId = accounts[0];
    const accountType = 0;   

    const response = await accountsApi.getAccountById(accounId);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    const customerId = responseBody.customerId;

    //open new Account using API Endpoint createAccount

    const createNewAccount = await accountsApi.openNewAccount(customerId, accountType, accounId);

    expect(createNewAccount.status()).toBe(200);

    const createNewAccountBody = await createNewAccount.json();

    await pm.overviewPage.goToOverviewPage();
    await pm.overviewPage.waitForTableFilled();

    const toAccount = createNewAccountBody.id.toString();
    const fromAccount = accounId;
    const amount = 90;

    //Get accounts balance before the transfer from UI
    const fromAccountBalanceBeforeTransfer = await pm.overviewPage.getAccountBalance(fromAccount);
    const toAccountBalanceBeforeTransfer = await pm.overviewPage.getAccountBalance(toAccount);

    const transferFunds = await accountsApi.transferFunds(fromAccount, toAccount, amount);

    expect(transferFunds.status()).toBe(200);

    const transferFundsText = await transferFunds.text();

    expect(transferFundsText).toContain(`Successfully transferred $${amount} from account #${fromAccount} to account #${toAccount}`);

    //Get accounts balance after the transfer from UI
    await pm.overviewPage.goToOverviewPage();
    await pm.overviewPage.waitForTableFilled();

    const fromAccountBalanceAfterTransfer = await pm.overviewPage.getAccountBalance(fromAccount);
    const toAccountBalanceAfterTransfer = await pm.overviewPage.getAccountBalance(toAccount);

    expect(fromAccountBalanceAfterTransfer).toBeCloseTo(fromAccountBalanceBeforeTransfer - amount, 2);

    expect(toAccountBalanceAfterTransfer).toBeCloseTo(toAccountBalanceBeforeTransfer + amount, 2);
    
  });
});
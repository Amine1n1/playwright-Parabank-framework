import { test, expect } from '../../fixtures/pom.fixture';
import 'dotenv/config';
import { createNewUser } from '../../test-data/userData';
import { User } from '../../types/user.types';

test.describe('Transfer Funds Tests', () => {

  let newUser: User;
   // ✅ Override storageState for this entire describe block → start fresh (not logged in)
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ pm }) => {

    newUser = createNewUser();
    await pm.registerPage.goToRegisterPage();
    await pm.registerPage.registerUser(newUser);
    await pm.registerPage.expectRegisterSuccessful();

    await pm.overviewPage.goToOverviewPage();
    await pm.overviewPage.waitForTableFilled();
  });

  test('Transfer Funds Successful', async ({ pm }) => {
    
    let accounts = await pm.overviewPage.getAllAccounts();

    const fromAccount = accounts[0];

    await pm.openAccountPage.goToOpenAccountPage();

    await pm.openAccountPage.openNewAccount('1', fromAccount);

    await pm.openAccountPage.expectAccountOpenedSuccessfull();

    const createdAccountId = await pm.openAccountPage.getCreatedAccountId();

    await pm.overviewPage.goToOverviewPage();

    await pm.overviewPage.waitForTableFilled();

    accounts = await pm.overviewPage.getAllAccounts();

    const toAccount = createdAccountId;
    const amountToTransfer = 70;

    const fromAccountBalanceBeforeTransfer = await pm.overviewPage.getAccountBalance(fromAccount);
    const toAccountBalanceBeforeTransfer = await pm.overviewPage.getAccountBalance(toAccount);

    await pm.transferPage.goToTransferPage();

    await pm.transferPage.transferFunds(fromAccount, toAccount, amountToTransfer);

    await pm.overviewPage.goToOverviewPage();
    await pm.overviewPage.waitForTableFilled();

    const fromAccountBalanceAfterTransfer = await pm.overviewPage.getAccountBalance(fromAccount);
    const toAccountBalanceAfterTransfer = await pm.overviewPage.getAccountBalance(toAccount);

    expect(fromAccountBalanceAfterTransfer).toBeCloseTo(fromAccountBalanceBeforeTransfer - amountToTransfer, 2);

    expect(toAccountBalanceAfterTransfer).toBeCloseTo(toAccountBalanceBeforeTransfer + amountToTransfer, 2);

  });

});
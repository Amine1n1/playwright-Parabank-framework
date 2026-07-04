import { test, expect } from '../../fixtures/pom.fixture';
import 'dotenv/config';
import { createNewUser } from '../../test-data/userData';
import { User } from '../../types/user.types';

test.describe('Open Account Tests', () => {

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

  test('Open new Account Successful', async ({ pm }) => {
    
    const accounts = await pm.overviewPage.getAllAccounts();

    const fromAccount = accounts[0];

    console.log(accounts);

    const accountBalanceBefore = await pm.overviewPage.getAccountBalance(fromAccount);

    await pm.openAccountPage.goToOpenAccountPage();

    await pm.openAccountPage.openNewAccount('1', fromAccount);

    await pm.openAccountPage.expectAccountOpenedSuccessfull();

    const createdAccountId = await pm.openAccountPage.getCreatedAccountId();

    await pm.overviewPage.goToOverviewPage();

    await pm.overviewPage.waitForTableFilled();

    const transferred = await pm.overviewPage.getAccountBalance(createdAccountId);

    //await pm.overviewPage.expectBalanceNewAccount('$100.00', createdAccountId);

    const accountBalanceAfter = await pm.overviewPage.getAccountBalance(fromAccount);


    expect(accountBalanceAfter).toBeCloseTo(accountBalanceBefore - transferred, 2);
  });

  test('Open multiple new Accounts Successful', async ({ pm }) => {
    let i;
    const accountsToOpen = 2;

    for (i= 0; i < accountsToOpen; i++) {
      const accounts = await pm.overviewPage.getAllAccounts();

      const fromAccount = accounts[i];

      const accountBalanceBefore = await pm.overviewPage.getAccountBalance(fromAccount);

      await pm.openAccountPage.goToOpenAccountPage();

      await pm.openAccountPage.openNewAccount('1', fromAccount);

      await pm.openAccountPage.expectAccountOpenedSuccessfull();

      const createdAccountId = await pm.openAccountPage.getCreatedAccountId();

      await pm.overviewPage.goToOverviewPage();

      await pm.overviewPage.waitForTableFilled();

      const transferred = await pm.overviewPage.getAccountBalance(createdAccountId);

      //await pm.overviewPage.expectBalanceNewAccount('$100.00', createdAccountId);

      const accountBalanceAfter = await pm.overviewPage.getAccountBalance(fromAccount);


      expect(accountBalanceAfter).toBeCloseTo(accountBalanceBefore - transferred, 2);
    }
  });

});
import { test, expect } from '../../fixtures/pom.fixture';
import 'dotenv/config';
import { createNewUser } from '../../test-data/userData';
import { User } from '../../types/user.types';

test.describe('Withdraw Tests API + UI', () => {

  let newUser: User;
   // ✅ Override storageState for this entire describe block → start fresh (not logged in)
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ pm }) => {
    newUser = createNewUser();
    await pm.registerPage.goToRegisterPage();
    await pm.registerPage.registerUser(newUser);
    await pm.registerPage.expectRegisterSuccessful();

  });

  test('Withdraw funds Successful using API and validation by UI', async ({ pm,accountsApi }) => {
    
    await pm.overviewPage.goToOverviewPage();
    await pm.overviewPage.waitForTableFilled();

    const accounts = await pm.overviewPage.getAllAccounts();

    const fromAccount = accounts[0];
    const amount = 85.5;

    const accountBalanceBeforeWithrawal = await pm.overviewPage.getAccountBalance(fromAccount);

    const withrawal = await accountsApi.withdraw(fromAccount, amount);

    expect(withrawal.status()).toBe(200);

    const withrawalText = await withrawal.text();

    expect(withrawalText).toContain(`Successfully withdrew $${amount} from account #${fromAccount}`);

    await pm.overviewPage.goToOverviewPage();
    await pm.overviewPage.waitForTableFilled();

    const accountBalanceAfterWithrawal = await pm.overviewPage.getAccountBalance(fromAccount);

    expect(accountBalanceAfterWithrawal).toBeCloseTo(accountBalanceBeforeWithrawal - amount, 2);
    
  });
});
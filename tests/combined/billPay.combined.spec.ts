import { test, expect } from '../../fixtures/pom.fixture';
import 'dotenv/config';
import { createNewUser } from '../../test-data/userData';
import { User } from '../../types/user.types';
import { newBill } from '../../test-data/billData';

test.describe('Bill Pay UI + API Tests', () => {

  let newUser: User;
   // ✅ Override storageState for this entire describe block → start fresh (not logged in)
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ pm }) => {
    newUser = createNewUser();
    await pm.registerPage.goToRegisterPage();
    await pm.registerPage.registerUser(newUser);
    await pm.registerPage.expectRegisterSuccessful();

  });

  test('Bill Pay using API and validation by UI', async ({ pm, billPayApi }) => {

    await pm.overviewPage.goToOverviewPage();
    await pm.overviewPage.waitForTableFilled();

    const allAccounts = await pm.overviewPage.getAllAccounts();

    const accountId = allAccounts[0];
    const amount = 40;

    const accountBalanceBeforePay = await pm.overviewPage.getAccountBalance(accountId);

    const response = await billPayApi.payBill(accountId, amount, newBill);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log(responseBody);

    await pm.overviewPage.goToOverviewPage();
    await pm.overviewPage.waitForTableFilled();

    const accountBalanceAfterPay = await pm.overviewPage.getAccountBalance(accountId);

    expect(accountBalanceAfterPay).toBeCloseTo(accountBalanceBeforePay - amount, 2);
    
  });
});
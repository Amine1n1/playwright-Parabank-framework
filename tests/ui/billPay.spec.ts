import { test, expect } from '../../fixtures/pom.fixture';
import 'dotenv/config';
import { createNewUser } from '../../test-data/userData';
import { User } from '../../types/user.types';
import { newBill, partiallyEmptyBill } from '../../test-data/billData';

test.describe('Bill Pay Tests', () => {

  let newUser: User;
   // ✅ Override storageState for this entire describe block → start fresh (not logged in)
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ pm }) => {
    newUser = createNewUser();
    await pm.registerPage.goToRegisterPage();
    await pm.registerPage.registerUser(newUser);
    await pm.registerPage.expectRegisterSuccessful();

  });

  test('Successful Bill Pay', async ({ pm }) => {

    await pm.overviewPage.goToOverviewPage();
    await pm.overviewPage.waitForTableFilled();

    const allAccounts = await pm.overviewPage.getAllAccounts();

    const accountId = allAccounts[0];
    const amount = 70;

    //const balanceBeforePay = await pm.overviewPage.getAccountBalance(accountId);

    await pm.billPayPage.goToBillPayPage();

    await pm.billPayPage.payBill(newBill, accountId, amount);
    await pm.billPayPage.waitForBillPayComplete();
    await pm.billPayPage.expectBillPayComplete(accountId, amount.toString());

    await pm.overviewPage.goToOverviewPage();
    await pm.overviewPage.waitForTableFilled();

    //const balanceAfterPay = await pm.overviewPage.getAccountBalance(accountId);

    //expect(balanceAfterPay).toBeCloseTo(balanceBeforePay - parseFloat(newBill.amount), 2);

  });

  test('Failed Bill Pay', async ({ pm }) => {

    await pm.overviewPage.goToOverviewPage();
    await pm.overviewPage.waitForTableFilled();

    const allAccounts = await pm.overviewPage.getAllAccounts();

    const accountId = allAccounts[0];
    const amount = 70;

    await pm.billPayPage.goToBillPayPage();

    await pm.billPayPage.payBill(partiallyEmptyBill, accountId, amount);

    await pm.billPayPage.expectBillPayFailed();
  });

});
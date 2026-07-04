import { test, expect } from '../../fixtures/pom.fixture';
import 'dotenv/config';
import { createNewUser } from '../../test-data/userData';
import { User } from '../../types/user.types';
import { newBill } from '../../test-data/billData';

test.describe('Bill Pay API Tests', () => {

  let newUser: User;
   // ✅ Override storageState for this entire describe block → start fresh (not logged in)
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ pm }) => {
    newUser = createNewUser();
    await pm.registerPage.goToRegisterPage();
    await pm.registerPage.registerUser(newUser);
    await pm.registerPage.expectRegisterSuccessful();

  });

  test('Successful Bill Pay using API Endpoint billpay', async ({ pm, billPayApi }) => {

    await pm.overviewPage.goToOverviewPage();
    await pm.overviewPage.waitForTableFilled();

    const allAccounts = await pm.overviewPage.getAllAccounts();

    const accountId = allAccounts[0];
    const amount = 40;

    const response = await billPayApi.payBill(accountId, amount, newBill);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log(responseBody);

    expect(responseBody.payeeName).toBe(newBill.name);
    expect(responseBody.amount).toBe(amount);
    expect(responseBody.accountId).toBe(parseInt(accountId));
  });

  test('Failed Bill Pay using API Endpoint billpay, invalid accountId used', async ({ billPayApi }) => {

    const accountId = '00000';
    const amount = 70;

    const response = await billPayApi.payBill(accountId, amount, newBill);

    expect(response.status()).toBe(500);

    const responseText = await response.text();
    expect(responseText).toContain('Error');
  });

});
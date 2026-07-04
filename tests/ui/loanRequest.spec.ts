import { test, expect } from '../../fixtures/pom.fixture';
import 'dotenv/config';
import { createNewUser } from '../../test-data/userData';
import { User } from '../../types/user.types';

test.describe('Loan Request Tests', () => {

  let newUser: User;
   // ✅ Override storageState for this entire describe block → start fresh (not logged in)
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ pm }) => {
    newUser = createNewUser();
    await pm.registerPage.goToRegisterPage();
    await pm.registerPage.registerUser(newUser);
    await pm.registerPage.expectRegisterSuccessful();
  });

  test('Successful Loan Request', async ({ pm }) => {
    
    await pm.overviewPage.goToOverviewPage();
    await pm.overviewPage.waitForTableFilled();

    let accounts = await pm.overviewPage.getAllAccounts();
    const accountId = accounts[0];
    
    const amount = 30;
    const downPayment = 10;

    await pm.requestLoanPage.goToRequestLoanPage();
    await pm.requestLoanPage.requestLoan(accountId, amount, downPayment);

    await pm.requestLoanPage.expectLoanRequestedApproved();

    const newAccountId = await pm.requestLoanPage.getNewAccountId();

    await pm.overviewPage.goToOverviewPage();
    await pm.overviewPage.waitForTableFilled();

    accounts = await pm.overviewPage.getAllAccounts();

    expect(accounts).toContain(newAccountId);

  });

});
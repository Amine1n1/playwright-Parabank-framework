import { test, expect } from '../../fixtures/pom.fixture';
import 'dotenv/config';
import { createNewUser } from '../../test-data/userData';
import { User } from '../../types/user.types';

test.describe('Check Transaction Infos Tests API + UI', () => {
  let newUser: User;
   // ✅ Override storageState for this entire describe block → start fresh (not logged in)
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ pm }) => {
    newUser = createNewUser();
    await pm.registerPage.goToRegisterPage();
    await pm.registerPage.registerUser(newUser);
    await pm.registerPage.expectRegisterSuccessful();

  });

  test('Transfer Funds, use the API to get the TransactionId and Check using UI, if the transaction is available and Infos are correct', async ({ pm,accountsApi }) => {
    
    await pm.overviewPage.goToOverviewPage();
    await pm.overviewPage.waitForTableFilled();

    const accounts = await pm.overviewPage.getAllAccounts();
    const fromAccount = accounts[0];

    const accountType = 0;   
    const amount = 40.5;

    const response = await accountsApi.getAccountById(fromAccount);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    const customerId = responseBody.customerId;

    const createAccount = await accountsApi.openNewAccount(customerId, accountType, fromAccount);

    expect(createAccount.status()).toBe(200);

    const createAccountBody = await createAccount.json();

    const toAccount = createAccountBody.id.toString();

    const transferFunds = await accountsApi.transferFunds(fromAccount, toAccount, amount);

    expect(transferFunds.status()).toBe(200);

    const getTransactionsAccount = await accountsApi.getTransactionsForAccount(fromAccount);

    expect(getTransactionsAccount.status()).toBe(200);

    const getTransactionsAccountBody = await getTransactionsAccount.json();

    const transactionId = getTransactionsAccountBody[getTransactionsAccountBody.length - 1].id.toString();

    await pm.findTransactionPage.goToTxPage();

    await pm.findTransactionPage.findTransactionById(transactionId, fromAccount);

    await pm.findTransactionPage.waitForTableFilled();

    const TxDesc = await pm.findTransactionPage.getTransactionDescription();

    const TxDebit = await pm.findTransactionPage.getTransactionDebit();


    expect(TxDesc[0]).toContain(getTransactionsAccountBody[getTransactionsAccountBody.length - 1].description);
    expect(TxDebit[0]).toBe(getTransactionsAccountBody[getTransactionsAccountBody.length - 1].amount);
    
  });
});
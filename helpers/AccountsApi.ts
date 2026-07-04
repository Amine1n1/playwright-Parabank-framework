import { APIRequestContext } from '@playwright/test';

export class AccountsApi {
  constructor(private request: APIRequestContext) {}
  
  async getAccountById(accoundId: string) {
    const response = await this.request.get(`parabank/services/bank/accounts/${accoundId}`,
      {
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      }
    );
    return response;
  }

  async openNewAccount(customerId: string, accountType: number, accountId: string) {
    const response = await this.request.post(`parabank/services/bank/createAccount?customerId=${customerId}&newAccountType=${accountType}&fromAccountId=${accountId}`,
      {
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      });

    return response;
  }

  async getAccounts(customerId: string) {
    const response = await this.request.get(`parabank/services/bank/customers/${customerId}/accounts`,
      {
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      });

    return response;
  }

  async transferFunds(fromAccount: string, toAccount: string, amount: number) {
    const response = await this.request.post(`parabank/services/bank/transfer?fromAccountId=${fromAccount}&toAccountId=${toAccount}&amount=${amount}`,
    {
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      });

    return response;
  }

  async deposit(account: string, amount: number) {
    const response = await this.request.post(`parabank/services/bank/deposit?accountId=${account}&amount=${amount}`,
      {
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      });
      return response;
  }

  async login(username: string, password: string) {
    const response = await this.request.get(`parabank/services/bank/login/${username}/${password}`,
      {
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      });
      return response;
  }

  async withdraw(account: string, amount: number) {
    const response = await this.request.post(`parabank/services/bank/withdraw?accountId=${account}&amount=${amount}`,
     {
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      });

      return response;
  }

  async getTransactionsForAccount(accountId: string) {
    const response = await this.request.get(`parabank/services/bank/accounts/${accountId}/transactions`,
     {
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      });

      return response;
  }

  async getTransactionsForAccountOnDate(accountId: string, date: string) {
    const response = await this.request.get(`parabank/services/bank/accounts/${accountId}/transactions/onDate/${date}`,
     {
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      });

      return response;
  }
  }
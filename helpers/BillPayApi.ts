import { APIRequestContext } from '@playwright/test';
import { Bill } from '../types/bill.types';

export class BillPayApi {
  constructor(private request: APIRequestContext) {}
  
  async payBill(accountId: string, amount: number, bill?: Bill) {
    const response = await this.request.post(`parabank/services/bank/billpay?accountId=${accountId}&amount=${amount}`,
      {
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        data: bill ?? {},
      });
    return response;
  }
  }
import { BasePage } from "./BasePage";
import { Bill } from '../types/bill.types';
import { expect } from '@playwright/test';

export class BillPayPage extends BasePage {

  async goToBillPayPage() {
    await this.goToUrl('/parabank/billpay.htm');
  }

  async payBill(newBill: Bill, accountId: string, amount: number) {
    await this.BasePageFill('input[name = "payee.name"]', newBill.name);
    await this.BasePageFill('input[name = "payee.address.street"]', newBill.address.street);
    await this.BasePageFill('input[name = "payee.address.city"]', newBill.address.city);
    await this.BasePageFill('input[name = "payee.address.state"]', newBill.address.state);
    await this.BasePageFill('input[name = "payee.address.zipCode"]', newBill.address.zipCode);
    await this.BasePageFill('input[name = "payee.phoneNumber"]', newBill.phoneNumber);
    await this.BasePageFill('input[name = "payee.accountNumber"]', newBill.accountNumber);
    await this.BasePageFill('input[name = "verifyAccount"]', newBill.accountNumber);
    await this.BasePageFill('input[name = "amount"]', amount.toString());
    await this.BasePageSelectOption('select[name="fromAccountId"]', accountId);

    await this.BasePageClick(this.page.getByRole('button', {name: 'Send Payment'}));
  }

  async expectBillPayComplete(accountId: string, amount: string) {
    await this.BasePageExpectVisible(this.page.getByText('Bill Payment Complete'));

    expect(await this.Locator('#billpayResult p #amount').innerText()).toBe('$' + amount + '.00');

    expect(await this.Locator('#billpayResult p #fromAccountId').innerText()).toBe(accountId);
  }

  async expectBillPayFailed() {
    const fields = [
    { selector: 'input[name="payee.name"]',             errorId: '#validationModel-name' },
    { selector: 'input[name="payee.address.street"]',   errorId: '#validationModel-address' },
    { selector: 'input[name="payee.address.city"]',     errorId: '#validationModel-city' },
    { selector: 'input[name="payee.address.state"]',    errorId: '#validationModel-state' },
    { selector: 'input[name="payee.address.zipCode"]',  errorId: '#validationModel-zipCode' },
    { selector: 'input[name="payee.phoneNumber"]',      errorId: '#validationModel-phoneNumber' },
    { selector: 'input[name="payee.accountNumber"]',    errorId: '#validationModel-account-empty' },
    { selector: 'input[name="verifyAccount"]',          errorId: '#validationModel-verifyAccount-empty' },
    { selector: 'input[name="amount"]',                 errorId: '#validationModel-amount-empty' },
  ];

  for (const field of fields) {
    const value = await this.Locator(field.selector).inputValue();
    if (value === '') {
      await this.BasePageExpectVisible(field.errorId);
    }
  }
}

  async waitForBillPayComplete() {
    await this.page.waitForSelector('#billpayResult h1', {timeout: 20000});
  }
}
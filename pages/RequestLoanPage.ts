import { BasePage } from "./BasePage";
import { Bill } from '../types/bill.types';
import { expect } from '@playwright/test';

export class RequestLoanPage extends BasePage {

  async goToRequestLoanPage() {
    await this.goToUrl('/parabank/requestloan.htm');
  }

  async requestLoan(accountId: string, amount: number, downPayment: number) {
   await this.BasePageFill('#requestLoanForm #amount', amount.toString());

   await this.BasePageFill('#requestLoanForm #downPayment', downPayment.toString());

   await this.BasePageSelectOption('#requestLoanForm #fromAccountId', accountId);

   await this.BasePageClick(this.page.getByRole('button', {name: 'Apply Now'}));
  }

  async expectLoanRequestedApproved() {
    await this.BasePageExpectVisible('#loanRequestApproved');
  }

  async getNewAccountId(): Promise<string> {
    return this.Locator('#loanRequestApproved #newAccountId').innerText();
  }

}
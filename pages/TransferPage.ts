import { BasePage } from "./BasePage";
import { expect } from '@playwright/test';

export class TransferPage extends BasePage {

  async goToTransferPage() {
    await this.goToUrl('/parabank/transfer.htm');
  }

  async transferFunds(fromAccount: string, toAccount: string, amount: number) {
    await this.BasePageFill('#transferForm #amount', amount.toString());

    await this.BasePageSelectOption('select[id="fromAccountId"]', fromAccount);

    await this.BasePageSelectOption('select[id="toAccountId"]', toAccount);

    await this.BasePageClick(this.page.getByRole('button', {name: "Transfer"}));
  }

  async expectTransferComplete() {
    await this.BasePageExpectVisible(this.page.getByText('Transfer Complete!'));
  }
}
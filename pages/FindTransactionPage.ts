import { BasePage } from "./BasePage";

export class FindTransactionPage extends BasePage {

  async goToTxPage() {
    await this.goToUrl('/parabank/findtrans.htm');
  }

  async findTransactionById(txId: string, accountId: string) {
    await this.BasePageSelectOption('#accountId', accountId);

    await this.BasePageFill('#transactionId', txId);

    await this.BasePageClick(this.page.getByRole('button', { name: 'Find Transactions' }).first());
  }

  async findTransactionByDate(date: string, accountId: string) {
    await this.BasePageSelectOption('#accountId', accountId);

    await this.BasePageFill('#transactionDate', date);

    await this.BasePageClick(this.page.getByRole('button', { name: 'Find Transactions' }).nth(1));
  }

  async waitForTableFilled() {
    await this.page.waitForSelector('#transactionTable tbody tr td a', {timeout: 20000});
  }

  async getTransactionDescription(): Promise<string[]> {
    const rows = this.Locator('#transactionTable tbody tr');
    const count = await rows.count();
    const description: string[] = [];
    for (let i = 0; i < count; i++) {
      description[i] = await rows.nth(i).locator('td').nth(1).innerText();
    }
    return description;
  }

  async getTransactionDebit(): Promise<number[]> {
    const rows = this.Locator('#transactionTable tbody tr');
    const count = await rows.count();
    const description: string[] = [];
    let debits = [];

    for (let i=0; i < count; i++) {
        const debitStr = await rows.nth(i).locator('td').nth(2).innerText();
        debits.push(parseFloat(debitStr.replace(/[$,]/g, '').trim()))
    }

    return debits;
    
  }
}
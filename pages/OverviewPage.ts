import { BasePage } from "./BasePage";
import { expect } from '@playwright/test';

export class OverviewPage extends BasePage {

  async goToOverviewPage() {
    await this.goToUrl('/parabank/overview.htm');
  }

  async waitForTableFilled() {
    await this.page.waitForSelector('#accountTable tbody tr td a', {timeout: 20000});
  }

  async getAllAccounts(): Promise<string[]> {
    const accounts = await this.Locator('#accountTable tbody tr td a').allTextContents();

    return accounts;
  }

  async expectBalanceNewAccount(expectedBalance: string, accountId: string) {
    let i;
    const accounts = await this.getAllAccounts();

    for (i = 0; i <= accounts.length - 1 ; i++ ) {
      if (accounts[i] === accountId) {
        break;
      }
    }
    const balance = await this.Locator('#accountTable tbody tr').nth(i).locator('td').nth(1).innerText();

    expect(balance).toBe(expectedBalance);
  }

  async getAccountBalance(accountId: string): Promise<number> {
    let i;
    const accounts = await this.getAllAccounts();
    
    for (i = 0; i <= accounts.length - 1; i++ ) {
      if (accounts[i] === accountId) {
        break;
      }
    }

    let balanceString = await this.Locator('#accountTable tbody tr').nth(i).locator('td').nth(1).innerText();

    balanceString = balanceString.replace(/[$,]/g, '').trim();

    const balance = parseFloat(balanceString);

    return balance;
  }
}
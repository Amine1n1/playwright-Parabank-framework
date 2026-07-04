import { BasePage } from "./BasePage";

export class OpenAccountPage extends BasePage {

  async goToOpenAccountPage() {
    await this.goToUrl('/parabank/openaccount.htm');
  }

  async openNewAccount(type: string, account: string ) {
    await this.BasePageSelectOption('#type', type);
    await this.BasePageSelectOption('#fromAccountId', account);

    await this.BasePageClick(this.page.getByRole('button', {name: 'Open New Account'}));
  }

  async expectAccountOpenedSuccessfull(){
    await this.BasePageExpectVisible(this.page.getByText('Account Opened!'));
  }

  async getCreatedAccountId(): Promise<string> {
    const accountId = await this.Locator('#newAccountId').textContent() || '';
    return accountId;
  }
}
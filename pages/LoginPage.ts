import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  
  async goToLoginPage() {
    await this.goToUrl('/parabank/index.htm?ConnType=JDBC');
  }

  async login(username : string, password : string) {
    await this.BasePageFill(`input[name = "username"]`, username);

    await this.BasePageFill(`input[name = "password"]`, password);

    await this.BasePageClick(this.page.getByRole('button', {name: 'Log In'}));
  }

  async expectLoginSuccessful() {
    await this.BasePageExpectVisible('#accountTable');
  }

  async expectLoginfailure() {
    await this.BasePageExpectVisible(this.page.getByText('The username and password could not be verified.'));
  }

  async logout() {
    await this.BasePageClick(this.page.getByRole('link', {name: "Log Out"}));
  }

  async expectLogoutsuccessful() {
    await this.BasePageExpectVisible(this.page.getByRole('heading', {name: 'Customer Login'}));
  }
}
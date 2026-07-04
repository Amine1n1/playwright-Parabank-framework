import { BasePage } from "./BasePage";
import { expect } from '@playwright/test';
import { User } from "../types/user.types";

export class RegisterPage extends BasePage {

  async goToRegisterPage() {
    await this.goToUrl('/parabank/register.htm');
  }

  async registerUser(newUser : User) {
    await this.BasePageFill('[id="customer.firstName"]', newUser.firstname);
    await this.BasePageFill('[id="customer.lastName"]', newUser.lastname);
    await this.BasePageFill('[id="customer.address.street"]', newUser.address.street);
    await this.BasePageFill('[id="customer.address.city"]', newUser.address.city);
    await this.BasePageFill('[id="customer.address.state"]', newUser.address.state);
    await this.BasePageFill('[id="customer.address.zipCode"]', newUser.address.zipCode);
    await this.BasePageFill('[id="customer.phoneNumber"]', newUser.phone);
    await this.BasePageFill('[id="customer.ssn"]', newUser.ssn);
    await this.BasePageFill('[id="customer.username"]', newUser.username);
    await this.BasePageFill('[id="customer.password"]', newUser.password);
    await this.BasePageFill('[id="repeatedPassword"]', newUser.password);

    await this.BasePageClick(this.page.getByRole('button', {name: "Register"}));
  }

  async expectRegisterSuccessful() {
    await this.BasePageExpectVisible(this.page.getByText('Your account was created successfully. You are now logged in.'));
  }

  async expectRegisterFailure(user: User) {
    const fields = [
      {selector: '[id="customer.firstName"]', errorId: '[id="customer.firstName.errors"]'},
      {selector: '[id="customer.lastName"]', errorId: '[id="customer.lastName.errors"]'},
      {selector: '[id="customer.address.street"]', errorId: '[id="customer.address.street.errors"]'},
      {selector: '[id="customer.address.city"]', errorId: '[id="customer.address.city.errors"]'},
      {selector: '[id="customer.address.state"]', errorId: '[id="customer.address.state.errors"]'},
      {selector: '[id="customer.address.zipCode"]', errorId: '[id="customer.address.zipCode.errors"]'},
      {selector: '[id="customer.ssn"]', errorId: '[id="customer.ssn.errors"]'},
      {selector: '[id="customer.username"]', errorId: '[id="customer.username.errors"]'},
      {selector: '[id="customer.password"]', errorId: '[id="customer.password.errors"]'},
      {selector: '[id="repeatedPassword"]', errorId: '[id="repeatedPassword.errors"]'},
    ]

    for (const field of fields ) {
      if (await this.Locator(field.selector).inputValue() === '') {
        if (field.selector === '[id="customer.password"]' || field.selector ===  '[id="repeatedPassword"]'){ 
            if (user.password === '') {
              await this.BasePageExpectVisible(field.errorId);
            } 
        } else {
            await this.BasePageExpectVisible(field.errorId);
        }
      }
    }
  }
}
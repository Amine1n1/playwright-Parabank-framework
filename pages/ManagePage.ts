// ManagePage acts as a central hub for all page objects in the app.
// It uses lazy getters to create each page object only when needed.
// This saves resources in large test suites, as unused pages are not built.
// For small projects, you could create all page objects up front instead.

import { Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';
import { OpenAccountPage } from './OpenAccountPage';
import { OverviewPage } from './OverviewPage';
import { BillPayPage } from './BillPayPage';
import { TransferPage } from './TransferPage';
import { RequestLoanPage } from './RequestLoanPage';
import { FindTransactionPage } from './FindTransactionPage';


export default class ManagePage {
    constructor(private readonly page: Page) { }

    // private caches (undefined until first access)
    private _login?: LoginPage;
    private _register?: RegisterPage;
    private _openAccount?: OpenAccountPage;
    private _overview?: OverviewPage;
    private _billPay?: BillPayPage;
    private _transfer?: TransferPage;
    private _requestLoan?: RequestLoanPage;
    private _findTransaction?: FindTransactionPage;
    
    // Lazy getter: creates the page object only on first use, then reuses it.

    get loginPage(): LoginPage {
        if (!this._login) {
            this._login = new LoginPage(this.page);
        }
        return this._login;
    }

    get registerPage(): RegisterPage {
        if (!this._register) {
            this._register = new RegisterPage(this.page);
        }
        return this._register;
    }

     get openAccountPage(): OpenAccountPage {
        if (!this._openAccount) {
            this._openAccount = new OpenAccountPage(this.page);
        }
        return this._openAccount;
    }

    get overviewPage(): OverviewPage {
        if (!this._overview) {
            this._overview = new OverviewPage(this.page);
        }
        return this._overview;
    }

    get billPayPage(): BillPayPage {
        if (!this._billPay) {
            this._billPay = new BillPayPage(this.page);
        }
        return this._billPay;
    }

    get transferPage(): TransferPage {
        if (!this._transfer) {
            this._transfer = new TransferPage(this.page);
        }
        return this._transfer;
    }

    get requestLoanPage(): RequestLoanPage {
        if (!this._requestLoan) {
            this._requestLoan = new RequestLoanPage(this.page);
        }
        return this._requestLoan;
    }

    get findTransactionPage(): FindTransactionPage {
        if (!this._findTransaction) {
            this._findTransaction = new FindTransactionPage(this.page);
        }
        return this._findTransaction;
    }

}

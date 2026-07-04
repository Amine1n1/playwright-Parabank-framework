// We are creating a Playwright fixture that initializes a page object manager (PomManager) for each test.
// This allows us to access various page objects (like LoginPage, SecurePage, etc.) through the manager.
// The fixture also provides a valid user object for authentication tests.

import { test as base } from '@playwright/test';
import PomManager from '../pages/ManagePage';
import { validUser } from '../test-data/validUser';
import { invalidUser } from '../test-data/invalidUser';
import { BillPayApi } from '../helpers/BillPayApi';
import { AccountsApi } from '../helpers/AccountsApi';

type MyFixtures = {
  pm: PomManager;                       
  validUser: { username: string; password: string };
  invalidUser: { username: string; password: string };
  billPayApi: BillPayApi;
  accountsApi: AccountsApi;
};


export const test = base.extend<MyFixtures>({
  // Re-use Playwright’s default `page`
  pm: async ({ page }, use) => {
     // ✅ Block all ad networks
  await page.route('**/*', route => {
    const blockedDomains = [
      'googlesyndication',
      'googleadservices',
      'doubleclick',
      'google-analytics',
      'googletagmanager',
      'adsbygoogle',
      'amazon-adsystem',
      'facebook.net',
      'connect.facebook',
    ];

    const url = route.request().url();
    if (blockedDomains.some(domain => url.includes(domain))) {
      route.abort();
    } else {
      route.continue();
    }
  });
    await use(new PomManager(page));
  },

  // Plain value fixture (available in every test)
  validUser,
  invalidUser,
  billPayApi: async ({ request }, use) => {
    await use(new BillPayApi(request));
  },
  accountsApi: async ({ request }, use) => {
    await use(new AccountsApi(request));
  }

});

export { expect } from '@playwright/test';

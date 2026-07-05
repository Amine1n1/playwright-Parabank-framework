import { test as setup, expect } from '@playwright/test';
import 'dotenv/config';
import { createNewUser } from './test-data/userData';
import { User } from './types/user.types';

setup('authenticate', async ({ page }) => {

   // ✅ Block ads during login setup too
  await page.route('**/*', route => {
    const blockedDomains = [
      'googlesyndication',
      'googleadservices',
      'doubleclick',
      'google-analytics',
      'googletagmanager',
      'adsbygoogle',
    ];
    const url = route.request().url();
    if (blockedDomains.some(domain => url.includes(domain))) {
      route.abort();
    } else {
      route.continue();
    }
  });
  let newUser: User;
  newUser = createNewUser();
  //Register a new user
  await page.goto('/parabank/register.htm');
  await page.fill('[id="customer.firstName"]', newUser.firstname);
  await page.fill('[id="customer.lastName"]', newUser.lastname);
  await page.fill('[id="customer.address.street"]', newUser.address.street);
  await page.fill('[id="customer.address.city"]', newUser.address.city);
  await page.fill('[id="customer.address.state"]', newUser.address.state);
  await page.fill('[id="customer.address.zipCode"]', newUser.address.zipCode);
  await page.fill('[id="customer.phoneNumber"]', newUser.phone);
  await page.fill('[id="customer.ssn"]', newUser.ssn);
  await page.fill('[id="customer.username"]', newUser.username);
  await page.fill('[id="customer.password"]', newUser.password);
  await page.getByRole('button', {name: 'Register'}).click();
  
 
  /*await page.goto('/parabank/index.htm?ConnType=JDBC');
  await page.fill('input[name = "username"]', process.env.VALID_USERNAME!);
  await page.fill('input[name = "username"]', process.env.VALID_PASSWORD!);
  await page.click('input[type = "submit"]');*/

  await page.waitForURL('**/');
  await expect(page.locator('a[href= "/logout.htm"]')).toBeVisible();

  await page.context().storageState({ path: 'auth/user.json' });
});
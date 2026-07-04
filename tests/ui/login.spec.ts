import { test } from '../../fixtures/pom.fixture';
import 'dotenv/config';
import { createNewUser } from '../../test-data/userData';
import { User } from '../../types/user.types';

test.describe('Login Tests', () => {

  let newUser: User;
   // ✅ Override storageState for this entire describe block → start fresh (not logged in)
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ pm }) => {
    newUser = createNewUser();
    await pm.registerPage.goToRegisterPage();
    await pm.registerPage.registerUser(newUser);
    await pm.registerPage.expectRegisterSuccessful();

    await pm.loginPage.logout();
  });

  test('Successful Login', async ({ pm }) => {
  
    await pm.loginPage.login(newUser.username, newUser.password);
    await pm.loginPage.expectLoginSuccessful();
  });

  test('Failed Login', async ({ pm, invalidUser }) => {
  
    await pm.loginPage.login(invalidUser.username, invalidUser.password);
    await pm.loginPage.expectLoginfailure();
  });

  test('logout successful', async ({ pm }) => {

    await pm.loginPage.login(newUser.username, newUser.password);
    await pm.loginPage.expectLoginSuccessful();

    await pm.loginPage.logout();
    await pm.loginPage.expectLogoutsuccessful();
  });

});
import { test, expect } from '../../fixtures/pom.fixture';
import 'dotenv/config';
import { createNewUser } from '../../test-data/userData';
import { User } from '../../types/user.types';


test.describe('Login Tests API', () => {

  let newUser: User;
   // ✅ Override storageState for this entire describe block → start fresh (not logged in)
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ pm }) => {
    newUser = createNewUser();
    await pm.registerPage.goToRegisterPage();
    await pm.registerPage.registerUser(newUser);
    await pm.registerPage.expectRegisterSuccessful();

  });

  test('Successful Login', async ({ pm, accountsApi }) => {
    
    const login = await accountsApi.login(newUser.username, newUser.password);

    expect(login.status()).toBe(200);

    const loginBody = await login.json();

    expect(loginBody.firstName).toBe(newUser.firstname);
    expect(loginBody.lastName).toBe(newUser.lastname);
    expect(loginBody.ssn).toBe(newUser.ssn);

  });

  test('Failed Login', async ({ accountsApi, invalidUser }) => {
    const login = await accountsApi.login(invalidUser.username, invalidUser.password);

    expect(login.status()).toBe(400);

    const loginText = await login.text();

    expect(loginText).toContain('Invalid username and/or password');
  });

});
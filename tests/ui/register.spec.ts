import { test } from '../../fixtures/pom.fixture';
import 'dotenv/config';
import { createNewUser, createEmptyFieldsUser } from '../../test-data/userData';
import { User } from '../../types/user.types';

test.describe('Register Tests', () => {

  let newUser: User;
  let newUserWithEmptyFields: User;
   // ✅ Override storageState for this entire describe block → start fresh (not logged in)
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ pm }) => {
    await pm.registerPage.goToRegisterPage();
  });

  test('Successful Register', async ({ pm }) => {
    
    newUser = createNewUser();
    await pm.registerPage.registerUser(newUser);

    await pm.registerPage.expectRegisterSuccessful();
  });

  test('Failed Register', async ({ pm }) => {
    
    newUserWithEmptyFields = createEmptyFieldsUser();
    await pm.registerPage.registerUser(newUserWithEmptyFields);

    await pm.registerPage.expectRegisterFailure(newUserWithEmptyFields);
  });

});
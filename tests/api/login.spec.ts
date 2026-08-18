import { test, expect } from '@playwright/test';
import { LoginApi } from '../../pages/api/LoginApi';
import { loginData } from '../../data/login.data';

test.describe('Authentication API', () => {

  let loginApi: LoginApi;

  test.beforeEach(async ({ request }) => {
    loginApi = new LoginApi(request);
  });

  test('TC-001 - Valid Login', async () => {

    const response = await loginApi.login(
      loginData.validLogin
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.message).toBe('Successfull');
    expect(body.token).toBeDefined();
  });

  test('TC-002 - Invalid Password', async () => {

    const response = await loginApi.login(
      loginData.invalidPassword
    );

    expect(response.status()).toBe(401);

    const body = await response.json();

    expect(body.message).toBe('Invalid Email or Password');
    expect(body.token).toBeUndefined();
  });

  test('TC-003 - Email tidak terdaftar', async () => {

    const response = await loginApi.login(
      loginData.unregisteredEmail
    );

    expect(response.status()).toBe(401);

    const body = await response.json();

    expect(body.message).toBe('Invalid Email or Password');
    expect(body.token).toBeUndefined();
  });

  test('TC-004 - Invalid email format', async () => {

    const response = await loginApi.login(
      loginData.invalidEmailFormat
    );

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.message).toBe('Invalid email format');
    expect(body.token).toBeUndefined();
  });

  test('TC-005 - Empty email', async () => {

    const response = await loginApi.login(
      loginData.emptyEmail
    );

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.message).toBe('Invalid mandatory field Email or Password');
    expect(body.token).toBeUndefined();
  });

  test('TC-006 - Empty password', async () => {

    const response = await loginApi.login(
      loginData.emptyPassword
    );

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.message).toBe('Invalid mandatory field Email or Password');
    expect(body.token).toBeUndefined();
  });

  test('TC-007 - Empty email dan password', async () => {

    const response = await loginApi.login(
      loginData.emptyEmailAndPassword
    );

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.message).toBe('Invalid mandatory field Email or Password');
    expect(body.token).toBeUndefined();
  });

  test('TC-008 - Missing email field', async () => {

    const response = await loginApi.login(
      loginData.missingEmail
    );

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.message).toBe('Invalid mandatory field Email');
    expect(body.token).toBeUndefined();
  });

  test('TC-009 - Missing password field', async () => {

    const response = await loginApi.login(
      loginData.missingPassword
    );

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.message).toBe('Invalid mandatory field Password');
    expect(body.token).toBeUndefined();
  });

  test('TC-010 - Empty request body', async () => {

    const response = await loginApi.login(
      loginData.emptyBody
    );

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.message).toBe('Invalid mandatory field Email and Password');
    expect(body.token).toBeUndefined();
  });

});
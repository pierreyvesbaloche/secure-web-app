import { test, expect } from '@playwright/test';

const LOGIN_URL = 'http://localhost:4200/login';
const VALID_USER = 'user';
const VALID_PASS = 'password';
const INVALID_USER = 'invalid';
const INVALID_PASS = 'wrongpass';

test.describe('Login Page', () => {
  test('should show validation errors for empty fields', async ({ page }) => {
    await page.goto(LOGIN_URL);
    await page.click('button[type="submit"]');
    await expect(page.locator('.error')).toContainText('Please enter username and password.');
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto(LOGIN_URL);
    await page.fill('input#username', INVALID_USER);
    await page.fill('input#password', INVALID_PASS);
    await page.click('button[type="submit"]');
    await expect(page.locator('.error')).toContainText('Login failed');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.goto(LOGIN_URL);
    await page.fill('input#username', VALID_USER);
    await page.fill('input#password', VALID_PASS);
    await page.click('button[type="submit"]');
    await expect(page.locator('.error')).toBeHidden();
    // Optionally check for redirect or token in localStorage
    await expect(page.evaluate(() => localStorage.getItem('auth_token'))).not.toBeNull();
  });

  test('should display welcome page with greeting after login', async ({ page }) => {
    await page.goto(LOGIN_URL);
    await page.fill('input#username', VALID_USER);
    await page.fill('input#password', VALID_PASS);
    await page.click('button[type="submit"]');
    await page.waitForURL('**/welcome');
    await expect(page.locator('.welcome-container h2')).toContainText(`Welcome, ${VALID_USER}!`);
  });
});

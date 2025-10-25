import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear any existing storage
    await page.context().clearCookies();
    await page.goto('/');
    
    // Wait for the application to be ready
    await page.waitForLoadState('networkidle');
  });

  test('should display login form', async ({ page }) => {
    // Wait for the form to be fully rendered
    await page.waitForSelector('form');
    
    // Verify all form elements are present
    await expect(page.getByRole('heading', { name: /login/i })).toBeVisible();
    await expect(page.getByLabel(/username/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
    
    // Take screenshot of login form
    await page.screenshot({ path: 'test-results/login-form.png' });
  });

  test('should show error for invalid credentials', async ({ page }) => {
    // Wait for the form to be ready
    await page.waitForSelector('form');
    
    // Fill in invalid credentials
    await page.getByLabel(/username/i).fill('wronguser');
    await page.getByLabel(/password/i).fill('wrongpass');
    
    // Submit form
    await Promise.all([
      page.waitForResponse(response => response.url().includes('/api/auth/login') && response.status() === 401),
      page.getByRole('button', { name: /login/i }).click()
    ]);
    
    // Wait for and verify error message
    const errorMessage = await page.getByText(/invalid credentials/i);
    await expect(errorMessage).toBeVisible();
    
    // Take screenshot of error state
    await page.screenshot({ path: 'test-results/login-error.png' });
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    // Wait for the form to be ready
    await page.waitForSelector('form');
    
    // Fill in valid credentials
    await page.getByLabel(/username/i).fill('admin');
    await page.getByLabel(/password/i).fill('admin123');
    
    // Submit form and wait for successful response
    await Promise.all([
      page.waitForResponse(response => response.url().includes('/api/auth/login') && response.status() === 200),
      page.getByRole('button', { name: /login/i }).click()
    ]);
    
    // Wait for successful login and verify welcome message
    await page.waitForSelector('[data-testid="welcome-message"]', { timeout: 5000 });
    await expect(page.getByTestId('welcome-message')).toBeVisible();
    
    // Take screenshot of logged in state
    await page.screenshot({ path: 'test-results/login-success.png' });
  });
});
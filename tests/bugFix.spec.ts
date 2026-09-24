import { test, expect } from '@playwright/test';
import { generateRandomInvalidEmail } from '../utils/utils';
//https://github.com/pshaddel/qa-case-study-radoslav-petrov/issues/18
test('#18 Registration Regex Bug Test', async ({ page }) => {
  await page.goto('https://qa-sample-radoslav-petrov.up.railway.app/');
  await page.getByTestId('signin-go-to-signup-button').click();
  await page.getByRole('textbox', { name: 'you@example.com' }).fill(generateRandomInvalidEmail());
  await page.getByTestId('signup-password-input').fill('--');
  await page.getByTestId('signup-confirm-password-input').fill('--');
  await page.getByTestId('signup-submit-button').click();
  await page.waitForTimeout(5000);
  await expect(page.locator('.sign-out-button')).not.toBeVisible();
  await expect(page.getByTestId('signup-error-banner')).toBeVisible();
});
//https://github.com/pshaddel/qa-case-study-radoslav-petrov/issues/17 
test('#17 Refresh Bug Test', async ({ page }) => {
  await page.goto('https://qa-sample-radoslav-petrov.up.railway.app/');
  await page.locator('[data-testid="signin-email-input"]').fill('qa.tester@example.com');
  await page.locator('[data-testid="signin-password-input"]').fill('Password123');
  await page.locator('[data-testid="signin-submit-button"]').click();
  await expect(page.locator('.sign-out-button')).toBeVisible();
  await page.reload();
  await expect(page.locator('.sign-out-button')).toBeVisible();
});

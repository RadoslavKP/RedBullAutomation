import { test, expect } from '@playwright/test';
import { verifyNoElementContainsText, verifyAtLeastOneElementContainsText } from '../utils/utils';

//Timeouts are added to Demo purposes.

test('Device Filtering By Offline Status', async ({ page }) => {
  await page.goto('https://qa-sample-radoslav-petrov.up.railway.app/');
  await page.locator('[data-testid="signin-email-input"]').fill('qa.tester@example.com');
  await page.locator('[data-testid="signin-password-input"]').fill('Password123');
  await page.locator('[data-testid="signin-submit-button"]').click();
  await page.locator('[data-testid="filter-presence-status"]').click();
  await page.waitForTimeout(2000);
  await page.selectOption('[data-testid="filter-presence-status"]',  'Offline' );
  await page.waitForTimeout(2000);
  await expect(page.locator('.pill-online')).not.toBeVisible();
  await page.locator('.clickable-row').nth(1).click();
  await page.waitForTimeout(2000);
  await verifyNoElementContainsText(page, '.drawer-section', 'Online');
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForTimeout(2000);
  await expect(page.locator('.pill-online')).not.toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForTimeout(2000);
  await expect(page.locator('.pill-online')).not.toBeVisible();
});

test('Device Filtering By Up To Date Core Services', async ({ page }) => {
  await page.goto('https://qa-sample-radoslav-petrov.up.railway.app/');
  await page.locator('[data-testid="signin-email-input"]').fill('qa.tester@example.com');
  await page.locator('[data-testid="signin-password-input"]').fill('Password123');
  await page.locator('[data-testid="signin-submit-button"]').click();
  await page.locator('[data-testid="filter-core-services-status"]').click();
  await page.waitForTimeout(2000);
  await page.selectOption('[data-testid="filter-core-services-status"]',  'Up to date' );
  await page.waitForTimeout(2000);
  await expect(page.locator('.pill-outdated')).not.toBeVisible();
  await expect(page.locator('.pill-unavailable')).not.toBeVisible();
  await page.locator('.clickable-row').nth(1).click();
  await page.waitForTimeout(2000);
  await verifyNoElementContainsText(page, '.drawer-section', 'outdated');
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForTimeout(2000);
  await expect(page.locator('.pill-outdated')).not.toBeVisible();
  await expect(page.locator('.pill-unavailable')).not.toBeVisible();
});

test('Device Filtering By Landscape Orientation', async ({ page }) => {
  await page.goto('https://qa-sample-radoslav-petrov.up.railway.app/');
  await page.locator('[data-testid="signin-email-input"]').fill('qa.tester@example.com');
  await page.locator('[data-testid="signin-password-input"]').fill('Password123');
  await page.locator('[data-testid="signin-submit-button"]').click();
  await page.locator('[data-testid="filter-orientation"]').click();
  await page.waitForTimeout(2000);
  await page.selectOption('[data-testid="filter-orientation"]',  'Landscape' );
  await page.waitForTimeout(2000);
  await verifyNoElementContainsText(page, '.clickable-row', 'portrait');
  await page.locator('.clickable-row').nth(1).click();
  await page.waitForTimeout(2000);
  await verifyNoElementContainsText(page, '.drawer-section', 'portrait');
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForTimeout(2000);
  await verifyNoElementContainsText(page, '.clickable-row', 'portrait');
});

test('Device Filtering By Metadata Field And Value', async ({ page }) => {
  await page.goto('https://qa-sample-radoslav-petrov.up.railway.app/');
  await page.locator('[data-testid="signin-email-input"]').fill('qa.tester@example.com');
  await page.locator('[data-testid="signin-password-input"]').fill('Password123');
  await page.locator('[data-testid="signin-submit-button"]').click();
  await page.locator('[data-testid="filter-metadata-key"]').click();
  await page.waitForTimeout(2000);
  await page.selectOption('[data-testid="filter-metadata-key"]',  'IMEI LTE Device' );
  await page.waitForTimeout(2000);
  await page.locator('[data-testid="filter-metadata-value"]').click();
  await page.waitForTimeout(2000);
  await page.selectOption('[data-testid="filter-metadata-value"]',  '352811044505810' );
  await page.waitForTimeout(20000);
  await page.locator('.clickable-row').nth(0).click();
  await page.waitForTimeout(2000);
  await verifyAtLeastOneElementContainsText(page, '.drawer-section', '352811044505810');
  await page.getByRole('button', { name: 'Close' }).click();
});
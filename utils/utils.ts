import { expect, Page } from '@playwright/test';

export async function verifyNoElementContainsText (page: Page, selector: string, forbidenText: string)
 : Promise<void> {
    const element = page.locator(selector);
    const elementCount = await element.count();
    for (let i = 0; i < elementCount; i++) {
        await expect(element.nth(i)).not.toContainText(forbidenText);
    }
}

export async function verifyAtLeastOneElementContainsText(
  page: Page,
  selector: string,
  allowedText: string
): Promise<void> {
  const texts = await page.locator(selector).allTextContents();

  expect(
    texts.some(text => text.includes(allowedText))
  ).toBeTruthy();
}

export function generateRandomInvalidEmail(): string {
const randomFiveDigits = Math.floor(10000 + Math.random() * 90000);
 return `automationuser${randomFiveDigits}@redbull.com.com.com`;
}
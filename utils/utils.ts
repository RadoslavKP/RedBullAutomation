import { expect, Page } from '@playwright/test';

export async function verifyNoElementContainsText (page: Page, selector: string, forbidenText: string)
 : Promise<void> {
    const element = page.locator(selector);
    const elementCount = await element.count();
    for (let i = 0; i < elementCount; i++) {
        await expect(element.nth(i)).not.toContainText(forbidenText);
    }
}

export async function verifyElementContainsText (page: Page, selector: string, allowedText: string)
 : Promise<void> {
    const element = page.locator(selector);
    const elementCount = await element.count();
    for (let i = 0; i < elementCount; i++) {
        await expect(element.nth(i)).toContainText(allowedText);
    }
}
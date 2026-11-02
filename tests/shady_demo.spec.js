import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://automationintesting.online/');
  await page.getByRole('textbox').first().click();
  await page.getByRole('gridcell', { name: 'Choose Monday, 10 August' }).click();
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('gridcell', { name: 'Choose Wednesday, 12 August' }).click();
  await page.getByRole('button', { name: 'Check Availability' }).click();

  //wait for the page to load and display the "Book now" button
  // await page.waitForSelector('a:has-text("Book now")', { timeout: 50000 });

  // Wait for room booking links
  await expect(page.locator('a[href*="/reservation/"]')).toHaveCount(3);
  // Click first available room
  await page.locator('a[href*="/reservation/2"]').click();


  await page.getByRole('button', { name: 'Reserve Now' }).click();
  await page.getByRole('textbox', { name: 'Firstname' }).click();
  await page.getByRole('textbox', { name: 'Firstname' }).fill('Piyumi');
  await page.getByRole('textbox', { name: 'Lastname' }).click();
  await page.getByRole('textbox', { name: 'Lastname' }).fill('Wanigasekara');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('piyumi@gmail.com');
  await page.getByRole('textbox', { name: 'Phone' }).click();
  await page.getByRole('textbox', { name: 'Phone' }).fill('09888776549');
  await page.getByRole('button', { name: 'Reserve Now' }).click();

  //wait for the page to load and display the "Return home" link
  //await expect(page.getByRole('link', { name: 'Return home' })).toBeVisible({ timeout: 50000 });

  // await page.getByRole('link', { name: 'Return home' }).click();

});

test('test2', async ({ page }) => {
  await page.goto('https://automationintesting.online/');

  await page.getByRole('textbox').first().click();
  await page.getByRole('gridcell', { name: 'Choose Thursday, 13 August' }).click();
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('gridcell', { name: 'Choose Saturday, 15 August' }).click();
  await page.getByRole('button', { name: 'Check Availability' }).click();

  await page.locator('a[href*="/reservation/"]').nth(0).click();

  await page.getByText('Selected').click();
  await page.getByRole('button', { name: '18' }).click();
  await page.getByRole('button', { name: 'Reserve Now' }).click();

  await page.getByRole('textbox', { name: 'Firstname' }).click();
  await page.getByRole('textbox', { name: 'Firstname' }).fill('Harsha');
  await page.getByRole('textbox', { name: 'Lastname' }).click();
  await page.getByRole('textbox', { name: 'Lastname' }).fill('Bala');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('harsha.b@gmail.com');
  await page.getByRole('textbox', { name: 'Phone' }).fill('12345678912');

  await page.getByRole('button', { name: 'Reserve Now' }).click();


 
  // await expect(page.getByRole('link', { name: 'Return home' })).toBeVisible({ timeout: 50000 });
  // await page.getByRole('link', { name: 'Return home' }).click();

});
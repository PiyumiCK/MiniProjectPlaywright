import { test, expect } from '@playwright/test';

test('test to-do app @smoke', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/');

  const todoInput = page.getByPlaceholder('What needs to be done?');
  await todoInput.fill('swim');
  await todoInput.press('Enter');
  await todoInput.fill('buy food');
  await todoInput.press('Enter');
  await todoInput.fill('Pay bill');
  await todoInput.press('Enter');

  const buyFoodTodo = page.locator('li', { hasText: 'buy food' });
  await buyFoodTodo.locator('input.toggle').check();

  await page.getByRole('link', { name: 'Completed' }).click();
  await page.getByRole('link', { name: 'Active' }).click();
  await page.getByRole('link', { name: 'Completed' }).click();
  await page.getByRole('button', { name: 'Clear completed' }).click();
  await page.getByRole('link', { name: 'All' }).click();
  await expect(page.getByText('swim')).toBeVisible();
  await expect(page.locator('.todo-list')).toContainText('Pay bill');

  await expect(page.locator('.todo-list')).toHaveCount(1);
});
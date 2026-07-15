import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByTestId('login-link').click();
  await page.getByLabel('Email').fill(process.env.TEST_USER!);
  await page.getByLabel('Mot de passe').fill(process.env.TEST_PASSWORD!);
  await page.getByRole('button', { name: 'Se connecter' }).click();

  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('https://practice.missionplaywright.fr/account');

  // Assert on something that confirms login succeeded
  await expect(page.getByText('Tous les exercices Advanced sont débloqués')).toBeVisible();
  
  // Save the authenticated session to disk
  await page.context().storageState({ path: authFile });
});
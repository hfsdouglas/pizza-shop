import { test, expect } from '@playwright/test'

test('sign-in successfully', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('e-mail').fill('johndoe@example.com')
  await page.getByRole('button', { name: 'Acessar painel' }).click()

  const toast = page.getByText(
    'Enviamos um link de autenticação para seu e-mail.'
  )

  await expect(toast).toBeVisible()
})

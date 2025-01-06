import { test, expect } from '@playwright/test'

test('update profile successfully', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Pizza Shop' }).click()
  await page.getByRole('menuitem', { name: 'Perfil da Loja' }).click()

  await page.getByLabel('Nome').fill('Rocket Pizza')
  await page.getByRole('button', { name: 'Salvar' }).click()

  const toast = page.getByText('Perfil atualizado com sucesso!')

  await expect(toast).toBeVisible()

  await page.waitForLoadState('networkidle')

  await page.getByRole('button', { name: 'Close' }).click()

  await expect(page.getByRole('button', { name: 'Rocket Pizza' })).toBeVisible()
})

test('update profile with error', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Pizza Shop' }).click()
  await page.getByRole('menuitem', { name: 'Perfil da Loja' }).click()

  await page.getByLabel('Nome').fill('Pizzaria Tompero')
  await page.getByRole('button', { name: 'Salvar' }).click()

  const toast = page.getByText('Falha ao atualizar o perfil. Tente novamente!')

  await expect(toast).toBeVisible()

  await page.waitForLoadState('networkidle')

  await page.getByRole('button', { name: 'Close' }).click()

  await expect(page.getByRole('button', { name: 'Pizza Shop' })).toBeVisible()
})

import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('homepage renders images and the gift opens and closes', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await expect(page).toHaveTitle(/House of Hampers/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Good things.')
  await page.getByRole('button', { name: 'Unwrap a little happy' }).click()
  await expect(page.getByText('You deserve', { exact: false })).toBeVisible()
  await page.getByRole('button', { name: 'Wrap the gift again' }).click()
  await expect(page.getByRole('button', { name: 'Unwrap a little happy' })).toBeVisible()
  await page.locator('footer').scrollIntoViewIfNeeded()
  await expect.poll(() => page.locator('img').evaluateAll((images) => images.every((image) => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true)
  expect(errors).toEqual([])
})

test('occasion filters show matching products and restore the collection', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Thank you', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Explore The Very Good Thank You' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Explore A Little Box of Love' })).toHaveCount(0)
  await page.getByRole('button', { name: 'All hampers', exact: true }).click()
  await expect(page.locator('.product-card')).toHaveCount(3)
})

test('personalisation carries into the bag, supports quantities, and protects gift notes', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('Your little note', { exact: true }).fill('For all our brilliant little adventures.')
  await page.getByRole('radio', { name: 'Rose', exact: true }).check()
  await expect(page.locator('.note-message')).toHaveText('For all our brilliant little adventures.')
  await page.getByRole('button', { name: 'Make it yours', exact: true }).click()
  const dialog = page.getByRole('dialog')
  await expect(dialog.getByLabel('Add your personal note')).toHaveValue('For all our brilliant little adventures.')
  await expect(dialog.getByRole('radio', { name: 'Rose', exact: true })).toBeChecked()
  await dialog.getByRole('button', { name: 'Add to your bag' }).click()
  await page.getByRole('button', { name: 'Open gift bag, 1 items' }).click()
  await expect(page.locator('.bag-note')).toContainText('For all our brilliant little adventures.')
  await page.getByRole('button', { name: 'Increase A Little Box of Love quantity' }).click()
  await expect(page.locator('.subtotal')).toContainText('₹3,798')
  await page.getByRole('button', { name: 'Decrease A Little Box of Love quantity' }).click()
  await expect(page.locator('.subtotal')).toContainText('₹1,899')
  await expect(page.getByText('Live checkout isn’t open yet.', { exact: false })).toBeVisible()
  const stored = await page.evaluate(() => localStorage.getItem('hoh-bag-v1'))
  expect(stored).not.toContain('brilliant little adventures')
  await page.reload()
  await page.getByRole('button', { name: 'Open gift bag, 1 items' }).click()
  await expect(page.locator('.bag-note')).toHaveCount(0)
  await expect(page.locator('.bag-item')).toContainText('Rose ribbon')
  await page.getByRole('button', { name: 'Remove A Little Box of Love' }).click()
  await expect(page.getByText('A little empty.', { exact: false })).toBeVisible()
})

test('dialogs trap focus, close with Escape, and return it to their opener', async ({ page }) => {
  await page.goto('/')
  const opener = page.getByRole('button', { name: 'Explore The Big Little Celebration' })
  await opener.click()
  const dialog = page.getByRole('dialog')
  for (let index = 0; index < 10; index++) {
    await page.keyboard.press('Tab')
    expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true)
  }
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(opener).toBeFocused()
})

test('enquiry validates fields and downloads an honest local draft', async ({ page }) => {
  await page.goto('/')
  await page.locator('#corporate').getByRole('button', { name: 'Let’s talk gifting' }).click()
  await page.getByRole('button', { name: 'Download enquiry draft' }).click()
  await expect(page.getByText('Please add your name.')).toBeVisible()
  await expect(page.getByText('Please use a valid email address.')).toBeVisible()
  await page.getByLabel('Your name', { exact: true }).fill('Gift Preview Tester')
  await page.getByLabel('Work email').fill('tester@example.com')
  await page.getByLabel('Company / team').fill('Preview team')
  await page.getByLabel('Number of gifts').fill('42')
  const downloadEvent = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Download enquiry draft' }).click()
  const download = await downloadEvent
  expect(download.suggestedFilename()).toBe('hoh-gifting-enquiry.txt')
  await expect(page.getByText('Your draft is ready.', { exact: false })).toBeVisible()
})

test('invalid storage is ignored and storage unavailability does not break shopping', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('hoh-bag-v1', JSON.stringify([{ id: 'bad', productId: 'missing', quantity: -1 }]))
  })
  await page.goto('/')
  await expect(page.getByRole('button', { name: 'Open gift bag, 0 items' })).toBeVisible()
  await page.evaluate(() => {
    Storage.prototype.setItem = () => { throw new Error('Storage unavailable') }
    Storage.prototype.getItem = () => { throw new Error('Storage unavailable') }
  })
  await page.getByRole('button', { name: 'Explore A Little Box of Love' }).click()
  await page.getByRole('button', { name: 'Add to your bag' }).click()
  await expect(page.getByRole('button', { name: 'Open gift bag, 1 items' })).toBeVisible()
})

for (const width of [390, 768, 1440]) {
  test(`layout fits ${width}px and mobile navigation works`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    if (width < 1024) {
      await page.getByRole('button', { name: 'Open navigation' }).click()
      await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Shop hampers' }).click()
      await expect(page.getByRole('dialog')).toHaveCount(0)
      await expect(page).toHaveURL(/#collection/)
    }
    await page.getByRole('button', { name: 'Switch to dark mode' }).click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  })
}

test('light and dark themes pass automated accessibility checks', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'light' })
  await page.goto('/')
  await page.locator('footer').scrollIntoViewIfNeeded()
  await page.locator('#home').scrollIntoViewIfNeeded()
  const light = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  expect(light.violations).toEqual([])
  await page.getByRole('button', { name: 'Switch to dark mode' }).click()
  const dark = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  expect(dark.violations).toEqual([])
  await page.getByRole('button', { name: 'Explore A Little Box of Love' }).click()
  const product = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  expect(product.violations).toEqual([])
})

test('FAQ disclosures and privacy explanation are usable', async ({ page }) => {
  await page.goto('/')
  await page.getByText('Can I place an order right now?', { exact: true }).click()
  await expect(page.getByText('Not just yet.', { exact: false })).toBeVisible()
  await page.getByRole('button', { name: 'Privacy & this preview' }).click()
  await expect(page.getByRole('dialog')).toContainText('There are no payments, accounts, analytics')
  await page.getByRole('button', { name: 'Close dialog' }).click()
  await expect(page.getByRole('dialog')).toHaveCount(0)
})

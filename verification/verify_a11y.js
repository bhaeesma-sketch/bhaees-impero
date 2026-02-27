
import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to the local server
  await page.goto('http://localhost:8080');

  // Wait for content to load
  await page.waitForLoadState('networkidle');

  // Verify aria-labels are present
  const searchButton = page.locator('button[aria-label="Search"]');
  const accountButton = page.locator('button[aria-label="My account"]');

  // Check visibility (desktop view)
  if (await searchButton.isVisible()) {
    console.log('✅ Search button with aria-label found');
  } else {
    console.error('❌ Search button with aria-label NOT found');
  }

  if (await accountButton.isVisible()) {
      console.log('✅ Account button with aria-label found');
  } else {
      // It might be hidden if not logged in, let's check the DOM presence at least
       const accountBtnCount = await accountButton.count();
       if (accountBtnCount > 0) {
           console.log('✅ Account button with aria-label present in DOM');
       } else {
           console.error('❌ Account button with aria-label NOT found');
       }
  }

  // Mobile view test
  await page.setViewportSize({ width: 375, height: 667 });
  const menuButton = page.locator('button[aria-label="Open main menu"]');
  if (await menuButton.isVisible()) {
    console.log('✅ Mobile menu button with aria-label found');
    await menuButton.click();

    // Wait for menu to open
    await page.waitForTimeout(500);

    const closeButton = page.locator('button[aria-label="Close menu"]');
    if (await closeButton.isVisible()) {
        console.log('✅ Mobile close button with aria-label found');
    } else {
        console.error('❌ Mobile close button with aria-label NOT found');
    }
  } else {
    console.error('❌ Mobile menu button with aria-label NOT found');
  }

  // Take screenshot
  await page.screenshot({ path: 'verification/accessibility_check.png' });

  await browser.close();
})();

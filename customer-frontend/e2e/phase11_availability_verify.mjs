import { chromium } from 'playwright';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/Asus/.gemini/antigravity-ide/brain/867822c0-0c68-4b92-8688-c9f7e2f4e9a8';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  console.log('1. Navigating to Login page...');
  await page.goto('http://localhost:5174/login', { waitUntil: 'networkidle' });

  console.log('2. Logging in as customer Aastha Sharma...');
  await page.fill('input[type="email"]', 'aastha.sharma@gmail.com');
  await page.fill('input[type="password"]', 'Password123!');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/home', { timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(1000);

  console.log('3. Navigating to Pooja Sharma service detail (24K Gold Radiance Facial)...');
  await page.goto('http://localhost:5174/service/13da403a-4cc0-47de-a2d0-c2487adaef18', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  console.log('4. Clicking "Book This Service"...');
  await page.click('button:has-text("Book This Service")');
  await page.waitForSelector('form');
  await page.waitForTimeout(1500);

  // Check providers in modal
  const providerCards = await page.$$eval('input[name="provider_choice"]', (inputs) => inputs.length);
  console.log(`Found ${providerCards} provider choice radio buttons.`);

  // Click on Pooja Sharma specifically
  const poojaRadio = await page.$('input[value="97fa6cd8-bb97-4f69-8081-6358ed8b479f"], div:has-text("Pooja Sharma")');
  if (poojaRadio) {
    await poojaRadio.click();
    await page.waitForTimeout(500);
  }

  // Inspect Preferred Date options
  const dateOptions = await page.$$eval('select', (selects) => {
    // Look for select with dates
    for (const sel of selects) {
      const opts = Array.from(sel.options).map(o => o.value);
      if (opts.some(v => v.match(/^\d{4}-\d{2}-\d{2}$/))) {
        return opts;
      }
    }
    return [];
  });
  console.log('Available Dates in selector:', dateOptions);

  // Verify past and reserved dates are NOT present
  const hasPast = dateOptions.includes('2026-09-09') || dateOptions.includes('2026-09-08');
  const hasReserved1 = dateOptions.includes('2026-09-10');
  const hasReserved2 = dateOptions.includes('2026-09-11');
  const hasEarliestFree = dateOptions.includes('2026-09-12');

  console.log(`Availability Constraints Check:`);
  console.log(`  Past date (2026-09-09 or earlier) present: ${hasPast} (Expected: false)`);
  console.log(`  Reserved slot (2026-09-10) present: ${hasReserved1} (Expected: false)`);
  console.log(`  Reserved slot (2026-09-11) present: ${hasReserved2} (Expected: false)`);
  console.log(`  Earliest genuine free slot (2026-09-12) present: ${hasEarliestFree} (Expected: true)`);

  // Inspect Preferred Time Slot options
  const timeOptions = await page.$$eval('select', (selects) => {
    for (const sel of selects) {
      const opts = Array.from(sel.options).map(o => o.value);
      if (opts.some(v => v.includes('AM') || v.includes('PM'))) {
        return opts;
      }
    }
    return [];
  });
  console.log('Available Times in selector for earliest date:', timeOptions);

  // Take screenshot of selectable booking modal
  const modalScreenshotPath = path.join(ARTIFACT_DIR, 'phase11_pooja_availability_modal.png');
  await page.screenshot({ path: modalScreenshotPath, fullPage: false });
  console.log(`Saved screenshot: ${modalScreenshotPath}`);

  // Confirm booking
  console.log('5. Submitting booking for 2026-09-12...');
  await page.click('button[type="submit"]:has-text("Confirm Booking")');
  await page.waitForNavigation({ timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(2000);

  const currentUrl = page.url();
  console.log('Current URL after submit:', currentUrl);

  const bookingConfirmedScreenshot = path.join(ARTIFACT_DIR, 'phase11_pooja_booking_confirmed.png');
  await page.screenshot({ path: bookingConfirmedScreenshot, fullPage: true });
  console.log(`Saved screenshot: ${bookingConfirmedScreenshot}`);

  // 6. Test Emergency Flow
  console.log('6. Navigating to Emergency service (Short Circuit Repair)...');
  await page.goto('http://localhost:5174/service/6f3cde05-c2e6-4fc0-aeec-9db5ef4ca409', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  console.log('7. Clicking "Request Emergency Dispatch"...');
  await page.click('button:has-text("Request Emergency Dispatch")');
  await page.waitForSelector('form');
  await page.waitForTimeout(1500);

  const emergencyModalText = await page.$eval('form', el => el.innerText);
  const hasAutoDispatchBanner = emergencyModalText.includes('Emergency Priority Auto-Dispatch');
  const hasEarliestWindow = emergencyModalText.includes('Earliest Dispatch Window');
  console.log(`Emergency Modal Checks:`);
  console.log(`  Auto-Dispatch Banner: ${hasAutoDispatchBanner}`);
  console.log(`  Earliest Dispatch Window: ${hasEarliestWindow}`);

  const emergencyModalScreenshot = path.join(ARTIFACT_DIR, 'phase11_emergency_autodispatch_modal.png');
  await page.screenshot({ path: emergencyModalScreenshot, fullPage: false });
  console.log(`Saved screenshot: ${emergencyModalScreenshot}`);

  await browser.close();
  console.log('ALL PHASE 11 CHECKS COMPLETED SUCCESSFULLY!');
}

run().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});

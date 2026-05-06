/**
 * End-to-end tests for the triage questionnaire widget.
 *
 * Requires a running Hugo server. Run via:
 *   bash scripts/triage-check.sh
 * or set BASE_URL and run playwright directly.
 */

const { test, expect } = require('@playwright/test');

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';
const TRIAGE_URL = `${BASE_URL}/docs/triage/`;

async function loadTriage(page, hash = '') {
  await page.goto(TRIAGE_URL + hash);
  await page.waitForLoadState('domcontentloaded');
  // Widget starts hidden and JS shows it
  await expect(page.locator('#triage-questionnaire')).toBeVisible();
}

test.describe('Triage questionnaire - initial state', () => {
  test('widget is visible and shows the first question', async ({ page }) => {
    await loadTriage(page);
    await expect(page.locator('.triage-question-text')).toContainText('What is the problem');
  });

  test('back button is hidden at start', async ({ page }) => {
    await loadTriage(page);
    await expect(page.locator('#triage-back')).toBeHidden();
  });

  test('start over button is visible', async ({ page }) => {
    await loadTriage(page);
    await expect(page.locator('#triage-restart')).toBeVisible();
  });

  test('shows six options at the entry question', async ({ page }) => {
    await loadTriage(page);
    const options = page.locator('.triage-option');
    await expect(options).toHaveCount(6);
  });

  test('noscript fallback is not rendered as visible content when JS runs', async ({ page }) => {
    await loadTriage(page);
    // The noscript block should not produce visible interactive elements
    // (browsers hide noscript content when JS is enabled)
    const noscriptDetails = page.locator('noscript details');
    await expect(noscriptDetails).toHaveCount(0);
  });
});

test.describe('Triage questionnaire - navigation', () => {
  test('clicking an option navigates to the next question', async ({ page }) => {
    await loadTriage(page);
    await page.locator('.triage-option', { hasText: 'Our tests are causing problems' }).click();
    await expect(page.locator('.triage-question-text')).toContainText('What best describes the test problem');
  });

  test('back button appears after navigating', async ({ page }) => {
    await loadTriage(page);
    await page.locator('.triage-option', { hasText: 'Our tests are causing problems' }).click();
    await expect(page.locator('#triage-back')).toBeVisible();
  });

  test('back button returns to previous question', async ({ page }) => {
    await loadTriage(page);
    await page.locator('.triage-option', { hasText: 'Our tests are causing problems' }).click();
    await expect(page.locator('.triage-question-text')).toContainText('What best describes the test problem');

    await page.locator('#triage-back').click();
    await expect(page.locator('.triage-question-text')).toContainText('What is the problem');
    await expect(page.locator('#triage-back')).toBeHidden();
  });

  test('start over resets to first question from a follow-up question', async ({ page }) => {
    await loadTriage(page);
    await page.locator('.triage-option', { hasText: 'Our tests are causing problems' }).click();
    await page.locator('#triage-restart').click();
    await expect(page.locator('.triage-question-text')).toContainText('What is the problem');
    await expect(page.locator('#triage-back')).toBeHidden();
  });

  test('multi-step navigation reaches a result', async ({ page }) => {
    await loadTriage(page);
    // start → testing-root → flaky-or-env → result:environment-dependent-failures
    await page.locator('.triage-option', { hasText: 'Our tests are causing problems' }).click();
    await page.locator('.triage-option', { hasText: 'Tests pass sometimes and fail sometimes' }).click();
    await page.locator('.triage-option', { hasText: 'They fail in CI but pass locally' }).click();

    await expect(page.locator('.triage-result')).toBeVisible();
    await expect(page.locator('.triage-result-title')).toContainText('Tests Pass in One Environment');
  });

  test('breadcrumb shows step number when navigating', async ({ page }) => {
    await loadTriage(page);
    await page.locator('.triage-option', { hasText: 'Our tests are causing problems' }).click();
    await expect(page.locator('#triage-breadcrumb')).toContainText('Step 2');
  });
});

test.describe('Triage questionnaire - result card', () => {
  async function navigateToResult(page) {
    await loadTriage(page);
    // start → testing-root → direct result: high-coverage-ineffective
    await page.locator('.triage-option', { hasText: 'Our tests are causing problems' }).click();
    await page.locator('.triage-option', { hasText: 'good coverage numbers but bugs still reach production' }).click();
  }

  test('result card shows reframe section', async ({ page }) => {
    await navigateToResult(page);
    await expect(page.locator('.triage-reframe')).toBeVisible();
    await expect(page.locator('.triage-reframe-label')).toContainText('The real problem may be');
    await expect(page.locator('.triage-reframe-text')).not.toBeEmpty();
  });

  test('result card shows title', async ({ page }) => {
    await navigateToResult(page);
    await expect(page.locator('.triage-result-title')).toContainText('High Coverage but Tests Miss Defects');
  });

  test('result card CTA links to the symptom page', async ({ page }) => {
    await navigateToResult(page);
    const cta = page.locator('.triage-result-cta');
    await expect(cta).toBeVisible();
    await expect(cta).toContainText('Read the symptom page');
    const href = await cta.getAttribute('href');
    expect(href).toContain('/docs/symptoms/testing/high-coverage-ineffective-tests');
  });

  test('start over from result resets to first question', async ({ page }) => {
    await navigateToResult(page);
    await expect(page.locator('.triage-result')).toBeVisible();

    await page.locator('#triage-restart').click();
    await expect(page.locator('.triage-question-text')).toContainText('What is the problem');
    await expect(page.locator('.triage-result')).not.toBeVisible();
  });

  test('back button from result returns to the question that led to it', async ({ page }) => {
    await navigateToResult(page);
    await page.locator('#triage-back').click();
    await expect(page.locator('.triage-question-text')).toContainText('What best describes the test problem');
  });
});

test.describe('Triage questionnaire - context text', () => {
  test('context text shows for questions that have it', async ({ page }) => {
    await loadTriage(page);
    // automation-lag-probe has context
    await page.locator('.triage-option', { hasText: 'Our tests are causing problems' }).click();
    await page.locator('.triage-option', { hasText: 'We never have enough test automation' }).click();
    await expect(page.locator('.triage-context')).toBeVisible();
    await expect(page.locator('.triage-context')).toContainText('Before pointing you');
  });

  test('context text is absent for questions without it', async ({ page }) => {
    await loadTriage(page);
    // start question has no context
    await expect(page.locator('.triage-context')).toHaveCount(0);
  });
});

test.describe('Triage questionnaire - deep linking', () => {
  test('hash #q-deploy-root loads the deploy-root question directly', async ({ page }) => {
    await loadTriage(page, '#q-deploy-root');
    await expect(page.locator('.triage-question-text')).toContainText('What is the nature of the deployment pain');
  });

  test('back button is hidden on deep-linked question (empty history)', async ({ page }) => {
    await loadTriage(page, '#q-deploy-root');
    await expect(page.locator('#triage-back')).toBeHidden();
  });

  test('hash #r-fear-of-deploying loads the result directly', async ({ page }) => {
    await loadTriage(page, '#r-fear-of-deploying');
    await expect(page.locator('.triage-result-title')).toContainText('The Team Is Afraid to Deploy');
  });

  test('back button is hidden on deep-linked result (empty history)', async ({ page }) => {
    await loadTriage(page, '#r-fear-of-deploying');
    await expect(page.locator('#triage-back')).toBeHidden();
  });

  test('unknown hash falls back to first question', async ({ page }) => {
    await loadTriage(page, '#q-does-not-exist');
    await expect(page.locator('.triage-question-text')).toContainText('What is the problem');
  });
});

test.describe('Triage questionnaire - all six entry branches', () => {
  const branches = [
    { label: 'Our tests are causing problems', expectedText: 'What best describes the test problem' },
    { label: 'Deploying is painful or risky', expectedText: 'What is the nature of the deployment pain' },
    { label: 'Work piles up and moves slowly', expectedText: 'Where does the work pile up' },
    { label: "We don't know what's happening in prod", expectedText: 'What is the visibility problem' },
    { label: 'A person or team is a bottleneck', expectedText: 'What kind of bottleneck is it' },
    { label: 'Leadership or process is blocking us', expectedText: 'What is the organizational or process problem' },
  ];

  for (const branch of branches) {
    test(`"${branch.label}" opens its sub-question`, async ({ page }) => {
      await loadTriage(page);
      await page.locator('.triage-option', { hasText: branch.label }).click();
      await expect(page.locator('.triage-question-text')).toContainText(branch.expectedText);
    });
  }
});

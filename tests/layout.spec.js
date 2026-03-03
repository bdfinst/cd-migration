const { test, expect } = require('@playwright/test');

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';

const PAGES_TO_CHECK = [
  '/docs/migrate-to-cd/foundations/trunk-based-development/',
  '/docs/migrate-to-cd/foundations/trunk-based-development/tbd-migration/',
  '/docs/agentic-cd/getting-started/adoption-roadmap/',
  '/docs/agentic-cd/specification/agent-assisted-specification/',
  '/docs/agentic-cd/architecture/agent-configuration/',
  '/docs/reference/testing/static/',
];

test.describe('Code block layout', () => {
  for (const path of PAGES_TO_CHECK) {
    test(`code blocks do not break page layout on ${path}`, async ({ page }) => {
      await page.goto(`${BASE_URL}${path}`);
      await page.waitForLoadState('domcontentloaded');

      // A code block breaking the layout would push the page scrollWidth far
      // beyond the viewport. A threshold of 50px allows for small pre-existing
      // margins/shadows in the theme while catching real code-block overflow
      // (which typically extends hundreds of pixels past the viewport).
      const overflowPx = await page.evaluate(() => {
        return document.documentElement.scrollWidth - document.documentElement.clientWidth;
      });

      expect(
        overflowPx,
        `Page has ${overflowPx}px of horizontal overflow - a code block may be breaking the layout`
      ).toBeLessThan(50);
    });

    test(`pre elements are contained within the content column on ${path}`, async ({ page }) => {
      await page.goto(`${BASE_URL}${path}`);
      await page.waitForLoadState('domcontentloaded');

      const overflowingBlocks = await page.evaluate(() => {
        const content = document.querySelector('.td-content');
        if (!content) return [];

        const contentRect = content.getBoundingClientRect();
        const blocks = content.querySelectorAll('pre');
        const overflowing = [];

        for (const block of blocks) {
          const rect = block.getBoundingClientRect();
          if (rect.right > contentRect.right + 5) {
            overflowing.push({
              text: block.textContent.trim().substring(0, 80),
              blockRight: Math.round(rect.right),
              contentRight: Math.round(contentRect.right),
              overflow: Math.round(rect.right - contentRect.right),
            });
          }
        }

        return overflowing;
      });

      expect(
        overflowingBlocks,
        `Found ${overflowingBlocks.length} code block(s) overflowing the content area:\n${JSON.stringify(overflowingBlocks, null, 2)}`
      ).toHaveLength(0);
    });
  }
});

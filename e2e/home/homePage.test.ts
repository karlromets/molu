import { expect, test } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display PLAY and INSTRUCTIONS buttons", async ({ page }) => {
    const playButton = page.getByRole("link", { name: "PLAY" });
    const instructionsButton = page.getByRole("link", { name: "INSTRUCTIONS" });

    await expect(playButton).toBeVisible();
    await expect(instructionsButton).toBeVisible();
  });

  test("PLAY button navigates to game page", async ({ page }) => {
    const playButton = page.getByRole("link", { name: "PLAY" });
    await playButton.click();
    await expect(page).toHaveURL("/game");
  });

  test("INSTRUCTIONS button shows instructions section", async ({ page }) => {
    const instructionsButton = page.getByRole("link", { name: "INSTRUCTIONS" });
    await instructionsButton.click();
    const instructionsSection = page.locator("#juhend");
    await expect(instructionsSection).toBeVisible();
    await expect(instructionsSection).toBeInViewport();
  });

  test.describe("Localization", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/et");
    });

    test("should display Estonian translations", async ({ page }) => {
      const playButton = page.getByRole("link", { name: "MÄNGI" });
      const instructionsButton = page.getByRole("link", { name: "JUHEND" });

      await expect(playButton).toBeVisible();
      await expect(playButton).toHaveText("MÄNGI");
      await expect(instructionsButton).toBeVisible();
      await expect(instructionsButton).toHaveText("JUHEND");
    });

    test("navigation works in Estonian", async ({ page }) => {
      await page.goto("/et");
      const playButton = page.getByRole("link", { name: "MÄNGI" });
      await playButton.click();
      await expect(page).toHaveURL("/et/game");
    });
  });
});

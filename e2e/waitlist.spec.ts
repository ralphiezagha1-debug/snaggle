import { test, expect } from "@playwright/test";

test("waitlist join succeeds", async ({ page }) => {
  await page.goto("https://snaggle.fun", { waitUntil: "networkidle" });

  const emailInput = page.getByLabel("Email address").first();
  await emailInput.fill("ralphiezagha1@gmail.com");

  const joinBtn = page.getByRole("button", { name: /join waitlist/i });
  await Promise.all([
    page.waitForResponse(r => r.url().includes("/api/join-waitlist") && r.status() === 200, { timeout: 90000 }).includes("/api/join-waitlist") && resp.status() === 200
    ),
    joinBtn.click(),
  ]);

  // Button stops showing "Joining..." within 2s and success text appears
  await expect(joinBtn).not.toHaveText(/Joining/i, { timeout: 2000 });
  await expect(page.getByRole("status")).toContainText(/You're on the list!/i, { timeout: 2000 });
});

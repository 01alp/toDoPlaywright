import { test, expect } from "@playwright/test";
import { LoanPage } from "../pages/loan.page";

let loanPage: LoanPage;
test.beforeEach(async ({ page }) => {
  loanPage = new LoanPage(page);
  await loanPage.navigate();
});

test("Check Continue button Disabled while no Login credentials entered", async ({
  page,
}) => {
  await loanPage.applyNowButton.click();
  await expect(loanPage.loginButton).toBeDisabled();
});

test("Check success Login Flow", async ({ page }) => {
  await loanPage.applyNowButton.click();
  await loanPage.usernameInput.fill("John");
  await loanPage.passwordInput.fill("password");
  await expect(loanPage.loginButton).toBeEnabled();
  await loanPage.loginButton.click();
  await loanPage.continueButton.click();
  await expect(loanPage.successButton).toBeEnabled();
});

test('Loan amount out of defined range "500-10.000"', async ({ page }) => {
  await loanPage.amountInput.fill("350");
  await expect(loanPage.loanInputError).toBeVisible();
});

test('Loan amount in defined range "500-10.000"', async ({ page }) => {
  await loanPage.amountInput.fill("550");
  await expect(loanPage.loanInputError).not.toBeVisible();
});

test("Verify scroll In view point", async ({ page }) => {
  await loanPage.loanApplyButton1.click();
  await expect(loanPage.amountInput).toBeInViewport();
});
test("Verify Scroll in view point 2", async ({ page }) => {
  await loanPage.loanApplyButton2.click();
  await expect(loanPage.amountInput).toBeInViewport();
});
test("Loans List check number of period options", async ({ page }) => {
  await loanPage.amountInput.waitFor({ state: "visible" });
  const count = await loanPage.loanPeriodsCalc();
  await expect(count).toBe(7);
});

test.skip("Close Button is working", async ({ page }) => {
  await loanPage.applyNowButton.click();
  await page.getByRole("heading", { name: "Login" }).click();
  await page.getByTestId("login-popup-close-button").click();
  await expect(loanPage.amountInput).toBeInViewport();
});

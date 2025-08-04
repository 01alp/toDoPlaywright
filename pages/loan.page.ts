import { Locator, Page } from "@playwright/test";

export class LoanPage {
  page: Page;
  applyNowButton: Locator;
  loginButton: Locator;
  usernameInput: Locator;
  passwordInput: Locator;
  continueButton: Locator;
  successButton: Locator;
  amountInput: Locator;
  loanInputError: Locator;
  loanApplyButton1: Locator;
  loanApplyButton2: Locator;
  constructor(page: Page) {
    this.page = page;
    this.applyNowButton = page.getByTestId(
      "id-small-loan-calculator-field-apply"
    );
    this.loginButton = page.getByTestId("login-popup-continue-button");
    this.usernameInput = page.getByTestId("login-popup-username-input");
    this.passwordInput = page.getByTestId("login-popup-password-input");
    this.continueButton = page.getByTestId("final-page-continue-button");
    this.successButton = page.getByTestId("final-page-success-ok-button");
    this.amountInput = page.getByTestId(
      "id-small-loan-calculator-field-amount"
    );
    this.loanInputError = page.getByTestId(
      "id-small-loan-calculator-field-error"
    );
    this.loanApplyButton1 = page.getByTestId("id-image-element-button-image-1");
    this.loanApplyButton2 = page.getByTestId("id-image-element-button-image-2");
  }
  async navigate() {
    this.page.goto("https://loan-app.tallinn-learning.ee/small-loan");
  }
  async loanPeriodsCalc() {
    let count = 0;
    for (let i = 0; i <= 24; i += 4) {
      const expected = await this.page
        .getByTestId(`ib-small-loan-calculator-button-period-option-${i}`)
        .count();
      count += expected;
    }
    return count;
  }
}

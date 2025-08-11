// const {test} = require('@playwright/test')

const { expect } = require("@playwright/test");

class RegistrationPage {

    constructor(page) {
        this.page = page;
        this.firstNameLocator = page.locator("#first_name");
        this.lastNameLocator = page.locator("#last_name");
        this.emailLocator = page.locator("#email");
        this.phoneNumLocator = page.locator("#phone_number");
        this.stateLocator = page.locator("#state_id");
        this.cityLocator = page.locator('#city_id');
        this.passwordFieldLocator = page.locator("#password");
        this.confirmPasswordLocator = page.locator("#password_confirmation")
        this.OTPLocators = [
            page.locator("input[aria-label='Please enter verification code. Character 1']"),
            page.locator("input[aria-label='Character 2']"),
            page.locator("input[aria-label='Character 3']"),
            page.locator("input[aria-label='Character 4']"),
            page.locator("input[aria-label='Character 5']"),
            page.locator("input[aria-label='Character 6']")
        ];
        this.continueButtonLocator = page.locator("button[type='submit']")
        this.verificationTextLocator = page.locator("#success");
        this.welcomeText = page.locator(".k-typography.text-primary.text-gray");
        this.expectedUrl = "https://uat.airgate.ng/verification";
        this.regText = page.locator("h5[class='k-typography text-primary ']")

    }


    async goTo() {
        // await this.page.goto("https://uat.airgate.ng/register")
        await this.page.goto(process.env.REGURL)
        await expect(this.page).toHaveTitle(/.*Accept Payments Easy and /);
    }

    async enterFirstName(firstName) {
        await this.firstNameLocator.fill(firstName);
    }

    async enterLastName(lastName) {
        await this.lastNameLocator.fill(lastName);
    }

    async enterEmail(email) {
        await this.emailLocator.fill(email);
    }

    async enterPhoneNumber(phoneNumber) {
        await this.phoneNumLocator.fill(phoneNumber);
    }

    async selectState(state) {
        await this.stateLocator.click();
        await this.stateLocator.pressSequentially(state, { delay: 500 });
        await this.stateLocator.press('Enter');
    }

    async selectCity(city) {
        await this.cityLocator.click();
        await this.cityLocator.pressSequentially(city, { delay: 500 });
        await this.cityLocator.press('Enter');
    }

    async enterPassword(password) {
        await this.passwordFieldLocator.fill(password);

    }

    async enterConfirmPassword(password) {
        await this.confirmPasswordLocator.fill(password);

    }

    async clickContinueButton() {
        await this.continueButtonLocator.click();
    }

    async fillRegForm(firstName, lastName, email, number, password, confirmPassword) {
        await this.firstNameLocator.fill(firstName);
        await this.lastNameLocator.fill(lastName);
        await this.emailLocator.fill(email);
        await this.phoneNumLocator.fill(number);
        await this.passwordFieldLocator.fill(password);
        await this.confirmPasswordLocator.fill(confirmPassword);
        // await this.continueButtonLocator.click();
    }

    async assertRegistrationIsNotSuccessfully() {
        await expect(this.page).not.toHaveURL(this.expectedUrl);
    }

    async enterOTPCode(otpCode) {
        // Validate OTP length
        if (otpCode.length !== 6) {
            throw new Error(`OTP code must be 6 digits, received: ${otpCode.length} digits`);
        }

        // Fill each digit
        for (let i = 0; i < otpCode.length; i++) {
            await this.OTPLocators[i].fill(otpCode[i]);
        }
    }
    

    async clickVerifyEmail() {
        await this.continueButtonLocator.click();
    }

    async assertRegistrationIsSuccessfully() {
        // await expect(this.page).toHaveURL(this.expectedUrl);
        await this.verificationTextLocator.waitFor({ state: 'visible', timeout: 9000 });
        expect(this.verificationTextLocator).toBeVisible;
        expect(this.welcomeText).toBeVisible;
    }

}

module.exports = { RegistrationPage };
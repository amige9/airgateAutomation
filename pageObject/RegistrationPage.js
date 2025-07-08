// const {test} = require('@playwright/test')

const { expect } = require("@playwright/test");

class RegistrationPage {

    constructor(page) {
        this.page = page;
        this.firstNameLocator = page.locator("#first_name");
        this.lastNameLocator = page.locator("#last_name");
        this.emailLocator = page.locator("#email");
        this.phoneNumLocator = page.locator("#phone_number");
        this.passwordFieldLocator = page.locator("#password");
        this.confirmPasswordLocator = page.locator("#password_confirmation")
        this.continueButtonLocator = page.locator("button[type='submit']")
        this.expectedUrl = "https://uat.airgate.ng/verification";
        this.regText = page.locator("h5[class='k-typography text-primary ']")

    }



    async goTo(){
        // await this.page.goto("https://uat.airgate.ng/register")
        await this.page.goto(process.env.REGURL)
        await expect(this.page).toHaveTitle(/.*Accept Payments Easy and /);


    }

    async fillRegForm(firstName, lastName, email, number, password, confirmPassword){
        await this.firstNameLocator.fill(firstName);
        await this.lastNameLocator.fill(lastName);
        await this.emailLocator.fill(email);
        await this.phoneNumLocator.fill(number);
        await this.passwordFieldLocator.fill(password);
        await this.confirmPasswordLocator.fill(confirmPassword);
        await this.continueButtonLocator.click();
    }

    async assertRegistrationIsSuccessfully(){
        // await expect(this.page).toHaveURL(this.expectedUrl);
        const text = await this.regText.textContent();
        await expect(text).toEqual("Verify your email");
    }

    async assertRegistrationIsNotSuccessfully(){
        await expect(this.page).not.toHaveURL(this.expectedUrl);
    }
}

module.exports = {RegistrationPage};
// const { expect } = require("../playwright.config");
const { expect } = require('@playwright/test');
// const ENV = require('../utils/env')



class LoginPage {

    constructor(page) {
        this.page = page;
        this.email = this.page.locator("#email");
        this.password = this.page.locator("#password");
        this.signInButton = this.page.locator("button[type='submit']");
    }

    async goTo() {
        // await this.page.goto("https://uat.airgate.ng/login"); //, {timeout:60000}
        await this.page.goto(process.env.BASEURL, {timeout:100000}); 
    }

    async login(email, pass) {
        await this.email.fill(email);
        await this.password.fill(pass);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async assertLoggedInSuccessfully() {
        await expect(this.page).toHaveTitle("Accept Payments Easy and Fast, Anytime - Airgate");
        // await expect(this.page).toHaveURL("https://uat.airgate.ng/dashboard/overview");
    }

    async assertLoggedNotInSuccessfully() {
        await expect(this.page).not.toHaveURL("https://uat.airgate.ng/dashboard/overview");
    }

}
module.exports = { LoginPage };
const { Given, When, Then } = require('@cucumber/cucumber')
const { POManager } = require('../../pageObject/POManager');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');
const { timeout } = require('../../playwright.config');

const partialCountry = "Ind";
const fullCountryName = " India";
const email = "anshika@gmail.com"

Given('login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (email, password) {
    // Write code here that turns the phrase above into concrete actions
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(email, password);
});


When('add {string} to cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the cart', { timeout: 100 * 1000 }, async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
});

When('Enter valid details and place the order', { timeout: 200 * 1000 }, async function () {
    // Write code here that turns the phrase above into concrete actions
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(this.orderId);
});


Then('Verify order is present in the order History', async function () {
    // Write code here that turns the phrase above into concrete actions
    await this.dashboardPage.navigateToOrders();
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});

Given('login to Ecommerce2 application with {string} and {string}', async function (username, password) {
    const unserName = this.page.locator('#username');
    const pass = this.page.locator('#password');
    const signInButton = this.page.locator('#signInBtn');
    await this.page.goto("https://www.rahulshettyacademy.com/loginpagePractise/")
    console.log(await this.page.title());
    await unserName.fill(username);
    await pass.fill(password);
    await signInButton.click();
});

Then('Verify Error message is displayed', async function () {
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});

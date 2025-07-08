const { chromium } = require("@playwright/test");
const { POManager } = require('../../pageObject/POManager');
const playwright = require('@playwright/test');
const validDataset = JSON.parse(JSON.stringify(require('../../testData/validPaymentUrlTestData.json')))


async function createPaymentURL() {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();

    // Login into the application
    await loginPage.goTo();
    await loginPage.login(validDataset[0].email, validDataset[0].password); // Use any valid data for login

    const paymentPage = poManager.getPaymentURLPage();

    // Click Payment Link
    await paymentPage.clickPaymentLink();

    // Click Generate New Payment URL
    await paymentPage.clickGenerateNewPayment();

    // Fill payment link form
    await paymentPage.fillPaymentLinkForm(validDataset[0].amount, validDataset[0].ref, validDataset[0].remark);

    // Click Submit Button
    await paymentPage.clickSubmitButton();

    // Assert the Payment link is successfully created
    await paymentPage.assertPaymentLinkCreatedSuccessfully();

    await browser.close();
}

module.exports = { createPaymentURL };
const { test } = require('@playwright/test');
const { POManager } = require('../pageObject/POManager');
const { chromium } = require('@playwright/test')
const validDataset = JSON.parse(JSON.stringify(require('../testData/validNonRegOwnerTestData.json')));




test("Submit Valid Owner Form", async ({ browser }) => {
    browser = await chromium.launch({headless:false})
    const page = await browser.newPage()
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const nonRegOwnerPage = poManager.getNonRegOwnerPage();

    // Login into the application
    await loginPage.goTo();
    await loginPage.login(validDataset[0].email, validDataset[0].password);

    // Click Compliance
    await nonRegOwnerPage.clickComplianceButton()

    // await page.pause();

    // Enter full Name
    await nonRegOwnerPage.enterFullName(validDataset[0].fullName);

    // Enter DOB
    await nonRegOwnerPage.enterDOB(validDataset[0].DOB);

    // Enter NIN Number
    await nonRegOwnerPage.enterNINNumber(validDataset[0].NINNumber);

    // Upload NIN Document
    await nonRegOwnerPage.uploadNINDocument(validDataset[0].NINDocument)

    // Upload Proof of Address Document
    await nonRegOwnerPage.uploadProofOfAddressDocument(validDataset[0].addressDocument)

    // Click Complete Setup Button
    await nonRegOwnerPage.clickCompleteSetupButton();

    // Stark KYC
    await nonRegOwnerPage.clickStartKYCButton();

    // Assert KYC Started Successfully
    await nonRegOwnerPage.assertKYCStartedSuccessfully();



})
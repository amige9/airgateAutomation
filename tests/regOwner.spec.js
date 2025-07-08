const { test, chromium } = require('@playwright/test');
const { POManager } = require('../pageObject/POManager');
const validDataset = JSON.parse(JSON.stringify(require('../testData/validRegOwnerTestData.json')));



test("Submit Valid Owner Details", async ({browser})=>{
    browser = await chromium.launch({headless:false});
    const page = await browser.newPage();
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const regOwnerPage = poManager.getRegOwnerPage()


    // Login into the application
    await loginPage.goTo();
    await loginPage.login(validDataset[0].email, validDataset[0].password);

    // Click Compliance
    await regOwnerPage.clickComplianceButton()

    // Enter First Name
    // Enter Director Full Name
    await regOwnerPage.enterDirectorFullName(validDataset[0].fullName);

    // Enter Director DOB
    await regOwnerPage.enterDirectorDOB(validDataset[0].DOB);

    // Enter Director BVN Number
    await regOwnerPage.enterDirectorBVNNumber(validDataset[0].BVNNumber);

    // Enter Director NIN Number
    await regOwnerPage.enterDirectorNINNumber(validDataset[0].NINNumber);

    // Upload Director NIN Document
    await regOwnerPage.uploadDirectorNINDocument(validDataset[0].NINDocument)
    // await page.pause();

    // Enter Shareholder Full Name
    await regOwnerPage.enterShareholderFullName(validDataset[0].fullName1)

    // Enter Shareholder DOB
    await regOwnerPage.enterShareholderDOB(validDataset[0].DOB1);

    // Enter Shareholder BVN Number
    await regOwnerPage.enterShareholderBVNNumber(validDataset[0].BVNNumber1);

    // Enter Shareholder NIN Number
    await regOwnerPage.enterShareholderNINNumber(validDataset[0].NINNumber1);

    // Upload Shareholder NIN Document
    await regOwnerPage.uploadShareholderNINDocument(validDataset[0].NINDocument1)

    // Click Complete Setup Button
    await regOwnerPage.clickCompleteSetupButton();

    // Stark KYC
    await regOwnerPage.clickStartKYCButton();

    // Assert KYC Started Successfully
    await regOwnerPage.assertKYCStartedSuccessfully();
})
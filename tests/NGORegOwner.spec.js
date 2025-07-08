const { test, chromium } = require('@playwright/test');
const { POManager } = require('../pageObject/POManager');
const validDataset = JSON.parse(JSON.stringify(require('../testData/validNGOOwnerTestData.json')));



test("Submit Valid Owner Details", async ({browser})=>{
    browser = await chromium.launch({headless:false});
    const page = await browser.newPage();
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const ngoOwnerPage = poManager.getNGOOwnerPage()


    // Login into the application
    await loginPage.goTo();
    await loginPage.login(validDataset[0].email, validDataset[0].password);

    // Click Compliance
    await ngoOwnerPage.clickComplianceButton()

    // Enter Director Full Name
    await ngoOwnerPage.enterDirectorFullName(validDataset[0].fullName);

    // Enter Director DOB
    await ngoOwnerPage.enterDirectorDOB(validDataset[0].DOB);

    // Enter Director BVN Number
    await ngoOwnerPage.enterDirectorBVNNumber(validDataset[0].BVNNumber);

    // Enter Director NIN Number
    await ngoOwnerPage.enterDirectorNINNumber(validDataset[0].NINNumber);

    // Upload Director NIN Document
    await ngoOwnerPage.uploadDirectorNINDocument(validDataset[0].NINDocument)
    // await page.pause();

    // Enter Secretary Full Name
    await ngoOwnerPage.enterSecretaryFullName(validDataset[0].fullName1)

    // Enter Secretary DOB
    await ngoOwnerPage.enterSecretaryDOB(validDataset[0].DOB1);

    // Enter Secretary BVN Number
    await ngoOwnerPage.enterSecretaryBVNNumber(validDataset[0].BVNNumber1);

    // Enter Secretary NIN Number
    await ngoOwnerPage.enterSecretaryNINNumber(validDataset[0].NINNumber1);

    // Upload Secretary NIN Document
    await ngoOwnerPage.uploadSecretaryNINDocument(validDataset[0].NINDocument1)

    // Click Complete Setup Button
    await ngoOwnerPage.clickCompleteSetupButton();

    // Stark KYC
    await ngoOwnerPage.clickStartKYCButton();

    // Assert KYC Started Successfully
    await ngoOwnerPage.assertKYCStartedSuccessfully();
})
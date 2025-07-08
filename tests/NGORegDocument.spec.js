const { test, chromium } = require('@playwright/test');
const { POManager} = require('../pageObject/POManager');
const validDataset = JSON.parse(JSON.stringify(require('../testData/validNGODocumentTestData.json')));


test("Submit Valid Documents Details", async ({browser}) => {
    browser = await chromium.launch({headless:false});
    const page = await browser.newPage();
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();

    // Login into the application
    await loginPage.goTo();
    await loginPage.login(validDataset[0].email, validDataset[0].password);

    const ngoDocPage = poManager.getNGODocumentPage();

    // Click compliance button
    await ngoDocPage.clickComplianceButton();

    // Enter CAC Number
    await ngoDocPage.enterCACNumber(validDataset[0].CACNumber);

    // Upload CAC Certificate
    await ngoDocPage.uploadCACCertificate(validDataset[0].CACCertificate);

    // Enter TIN Number
    await ngoDocPage.enterTINNumber(validDataset[0].TINNumber);

    // Upload Constitution Document
    await ngoDocPage.uploadConstitutionDocument(validDataset[0].ConstitutionDocument);

    // Upload Business Sales Document
    await ngoDocPage.uploadAddressDocument(validDataset[0].addressDocument);

    // Click Complete Setup Button
    await ngoDocPage.clickCompleteButton();

    // Aseert Document is successful
    await ngoDocPage.assertDocumnentFormIsSuccessful();

})
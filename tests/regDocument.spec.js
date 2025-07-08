const { test, chromium } = require('@playwright/test');
const { POManager } = require('../pageObject/POManager');
const validDataset = JSON.parse(JSON.stringify(require('../testData/validRegDocumentTestData.json')));



test("Submit Valid Documents Details", async ({ browser }) => {
    browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();

    // Login into the application
    await loginPage.goTo();
    await loginPage.login(validDataset[0].email, validDataset[0].password);

    const regDocPage = poManager.getRegDocumentPage();

    // Click compliance button
    await regDocPage.clickComplianceButton();

    // await page.pause();


    // Enter CAC Number
    await regDocPage.enterCACNumber(validDataset[0].CACNumber);

    // Upload CAC Certificate
    await regDocPage.uploadCACCertificate(validDataset[0].CACCertificate);

    // Enter TIN Number
    await regDocPage.EnterTINNumber(validDataset[0].TINNumber);

    // upload Proof of Address Document
    await regDocPage.uploadAddressDocument(validDataset[0].proofOfAddress);

    // Upload Status Report Document
    await regDocPage.uploadCACStatusDocument(validDataset[0].statusReport);

    // Select Politically Exposed Persons
    await regDocPage.selectPEP(validDataset[0].PEP);

    // Upload Special Control Unit against Money Laundering Document
    await regDocPage.uplaodSCUMLDocument(validDataset[0].SCUMLDocument);

    // Click Complete Setup Button
    await regDocPage.clickCompleteButton();

    // Aseert Document is successful
    await regDocPage.assertDocumnentFormIsSuccessful();

})
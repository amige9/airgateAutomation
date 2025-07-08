const { test, chromium } = require('@playwright/test')
const { POManager } = require('../pageObject/POManager');
const validDataset = JSON.parse(JSON.stringify(require('../testData/validNonRegProfileTestData.json')));
const validDataSet = JSON.parse(JSON.stringify(require('../testData/validNonRegBankTestData.json')))
const validDataseT = JSON.parse(JSON.stringify(require('../testData/validNonRegOwnerTestData.json')));
const nonRegLogin = JSON.parse(JSON.stringify(require('../testData/nonRegMerchantLoginData.json')));




test("Non Registered Business Compliance", async ({ browser }) => {
    browser = await chromium.launch({headless:false})
    const page = await browser.newPage()
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const nonRegProfilePage = poManager.getnonRegProfilePage();
    const nonRegBankPage = poManager.getNonRegBankPage();
    const nonRegOwnerPage = poManager.getNonRegOwnerPage();


    // Login into the application
    await loginPage.goTo();
    await loginPage.login(nonRegLogin[0].email, nonRegLogin[0].password); // Use any valid data for login

    // Click compliance button
    await nonRegProfilePage.clickComplianceButton();

    //  Click the Non-registered Business Radio Button
    await nonRegProfilePage.clickNonRegRadioButton();

    // Click continue Button
    await nonRegProfilePage.clickContinueButton();

    // Enter Profile form
    await nonRegProfilePage.fillProfileForm(validDataset[0].filepath, validDataset[0].bizName, validDataset[0].bizEmail,
        validDataset[0].website, validDataset[0].instagram, validDataset[0].facebook, validDataset[0].twitter);
    // await page.pause();

    // Click Save and Continue Button
    await nonRegProfilePage.clickSaveAndContinueButton();

    // Assert the profile form was successful
    await nonRegProfilePage.assertProfileFormIsSuccessful();

    // Select Bank
    await nonRegBankPage.selectBank(validDataSet[0].bank);

    // Enter Bank Account Number
    await nonRegBankPage.enterBankAccountNumber(validDataSet[0].bankActNumber);

    // Enter BVN
    await nonRegBankPage.enterBVN(validDataSet[0].bvn);

    // Upload Bank Account Statement
    await nonRegBankPage.uploadBankStatement(validDataSet[0].bankStatment);

    // Click Save and Continue Button
    await nonRegBankPage.clcikSaveAndContinueButton();

    // Assert the Bank Form was Successfull
    await nonRegBankPage.assertBankFormIsSuccessful();


    // Enter full Name
    await nonRegOwnerPage.enterFullName(validDataseT[0].fullName);

    // Enter DOB
    await nonRegOwnerPage.enterDOB(validDataseT[0].DOB);

    // Enter NIN Number
    await nonRegOwnerPage.enterNINNumber(validDataseT[0].NINNumber);

    // Upload NIN Document
    await nonRegOwnerPage.uploadNINDocument(validDataseT[0].NINDocument)

    // Upload Proof of Address Document
    await nonRegOwnerPage.uploadProofOfAddressDocument(validDataseT[0].addressDocument)

    // Click Complete Setup Button
    await nonRegOwnerPage.clickCompleteSetupButton();

    // Stark KYC
    await nonRegOwnerPage.clickStartKYCButton();

    // Assert KYC Started Successfully
    await nonRegOwnerPage.assertKYCStartedSuccessfully();



})
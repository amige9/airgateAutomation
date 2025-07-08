const { test, chromium } = require('@playwright/test');
const { POManager } = require('../pageObject/POManager');
const playwright = require('@playwright/test')
const validDataSet = JSON.parse(JSON.stringify(require('../testData/validNGOBankTestData.json')))


test("Submit Valid Bank Details", async ({ browser }) => {
    browser = await chromium.launch({headless:false});
    const page = await browser.newPage();
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();

    // Login into the application
    await loginPage.goTo();
    // await loginPage.login(validDataset[0].email, validDataset[0].password); // Use any valid data for login
    await loginPage.login(validDataSet[0].email, validDataSet[0].password);

    // Click compliance button
    const ngoBankPage = poManager.getNGOBankPage();
    await ngoBankPage.clickComplianceButton();

    // Select Bank
    await ngoBankPage.selectBank(validDataSet[0].bank);

    // Enter Bank Account Number
    await ngoBankPage.enterBankAccountNumber(validDataSet[0].bankActNumber);

    // Enter BVN
    await ngoBankPage.enterBVN(validDataSet[0].bvn);

    // Upload Bank Account Statement
    await ngoBankPage.uploadBankStatement(validDataSet[0].bankStatment);

    // Click Save and Continue Button
    await ngoBankPage.clcikSaveAndContinueButton();

    // Assert the Bank Form was Successfull
    await ngoBankPage.assertBankFormIsSuccessful();


})
const { test, chromium } = require('@playwright/test');
const { POManager } = require('../pageObject/POManager');
const validDataset = JSON.parse(JSON.stringify(require('../testData/validRegBankTestData.json')))


test("Submit Valid Bank Details", async ({browser})=>{
    browser = await chromium.launch({headless:false});
    const page = await browser.newPage();
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();

    // Login into the application
    await loginPage.goTo();
    // await loginPage.login(validDataset[0].email, validDataset[0].password); // Use any valid data for login
    await loginPage.login(validDataset[0].email, validDataset[0].password);

    // Click compliance button
    const regBankPage = poManager.getRegBankPage();
    await regBankPage.clickComplianceButton();
    
    // Select Bank
    await regBankPage.selectBank(validDataset[0].bank);

    // Enter Bank Account Number
    await regBankPage.enterBankAccountNumber(validDataset[0].bankActNumber);

    // Enter BVN
    await regBankPage.enterBVN(validDataset[0].bvn);

    // Upload Bank Statement
    await regBankPage.uploadBankStatement(validDataset[0].bankStatement)

    // Click Save and Continue Button
    await regBankPage.clcikSaveAndContinueButton();

    // Assert the Bank Form was Successfull
    await regBankPage.assertBankFormIsSuccessful();

})
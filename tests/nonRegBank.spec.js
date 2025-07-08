const { test } = require('@playwright/test');
const { POManager } = require('../pageObject/POManager');
const {chromium } = require('@playwright/test')
const validDataset = JSON.parse(JSON.stringify(require('../testData/validNonRegBankTestData.json')))

let nonRegBankPage;
// test.beforeAll(async () => {
//     const browser = await playwright.chromium.launch(); // Use the browser you need
//     const context = await browser.newContext();
//     const page = await context.newPage();

//     const poManager = new POManager(page);
//     const loginPage = poManager.getLoginPage();

//     // Login into the application
//     await loginPage.goTo();
//     // await loginPage.login(validDataset[0].email, validDataset[0].password); // Use any valid data for login
//     await loginPage.login("jamiere.kierre@farmoaks.com", "BoBolets9%");

//     // Click compliance button
//     nonRegBankPage = poManager.getNonRegBankPage();
//     await nonRegBankPage.clickComplianceButton();

// });

test("Submit Valid Bank Details", async ({page})=>{
    const browser = await chromium.launch({headless:false})
    page = await browser.newPage();
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();

    // Login into the application
    await loginPage.goTo();
    // await loginPage.login(validDataset[0].email, validDataset[0].password); // Use any valid data for login
    await loginPage.login(validDataset[0].email, validDataset[0].password);

    // Click compliance button
    nonRegBankPage = poManager.getNonRegBankPage();
    await nonRegBankPage.clickComplianceButton();
    
    // Select Bank
    await nonRegBankPage.selectBank(validDataset[0].bank);

    // Enter Bank Account Number
    await nonRegBankPage.enterBankAccountNumber(validDataset[0].bankActNumber);

    // Enter BVN
    await nonRegBankPage.enterBVN(validDataset[0].bvn);

    // Upload Bank Account Statement
    await nonRegBankPage.uploadBankStatement(validDataset[0].bankStatment);

    // Click Save and Continue Button
    await nonRegBankPage.clcikSaveAndContinueButton();

    // Assert the Bank Form was Successfull
    await nonRegBankPage.assertBankFormIsSuccessful();


})
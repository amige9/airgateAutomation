const {test } = require('@playwright/test');
const { POManager } = require('../pageObject/POManager');
const playwright = require('@playwright/test');
const validDataset = JSON.parse(JSON.stringify(require('../testData/validPaymentUrlTestData.json')));
const ENV = require('../utils/env')


test.describe.configure({ mode: "parallel" });
test("Create a Naira Valid Payment Link",async ({page}) => {
    // browser = await playwright.chromium.launch({headless:false}); // Use the browser you need
    // const context = await browser.newContext();
    // const page = await context.newPage();

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();

    // Login into the application
    await loginPage.goTo();
    await loginPage.login(ENV.EMAIL, ENV.PASSWORD);

    // await loginPage.login(validDataset[0].email, validDataset[0].password); // Use any valid data for login

    const paymentPage = poManager.getPaymentURLPage();

    //Click Payment Link
    await paymentPage.clickPaymentLink();

    // Click Generate New Payment URL
    await paymentPage.clickGenerateNewPayment();


    //fill payment link form
    await paymentPage.fillPaymentLinkForm(validDataset[0].amount, validDataset[0].ref, validDataset[0].remark, validDataset[0].URL)

    // CLick Submit Button
    await paymentPage.clickSubmitButton();

    //Assert the Payment link in successfully
    await paymentPage.assertPaymentLinkCreatedSuccessfully();

});


// test("Create a Dollar Valid Payment Link",async ({page}) => {
//     // browser = await playwright.chromium.launch({headless:false}); // Use the browser you need
//     // const context = await browser.newContext();
//     // const page = await context.newPage();

//     const poManager = new POManager(page);
//     const loginPage = poManager.getLoginPage();

//     // Login into the application
//     await loginPage.goTo();
//     await loginPage.login(validDataset[0].email, validDataset[0].password); // Use any valid data for login

//     const paymentPage = poManager.getPaymentURLPage();

//     //Click Payment Link
//     await paymentPage.clickPaymentLink();

//     // Click Generate New Payment URL
//     await paymentPage.clickGenerateNewPayment();

//     // Select USD Amount
//     await paymentPage.selectUSDOption();

//     //fill payment link form
//     await paymentPage.fillPaymentLinkForm(validDataset[0].amount, validDataset[0].ref, validDataset[0].remark, validDataset[0].URL)

//     // CLick Submit Button
//     await paymentPage.clickSubmitButton();

//     //Assert the Payment link in successfully
//     await paymentPage.assertPaymentLinkCreatedSuccessfully();

// });

// test("Create a Valid Payment Link", async () => {
//     //Click Payment Link
//     await paymentPage.clickPaymentLink();

//     // Click Generate New Payment URL
//     await paymentPage.clickGenerateNewPayment();

//     //fill payment link form
//     await paymentPage.fillPaymentLinkForm("10", "Reference", "Remarks")

//     // CLick Submit Button
//     await paymentPage.clickSubmitButton();

//     //Assert the Payment link in successfully
//     await paymentPage.assertPaymentLinkCreatedSuccessfully();

// })
const { test, chromium } = require('@playwright/test')
const { POManager } = require('../../../pageObject/POManager')
const playwright = require('@playwright/test');
const dataset = JSON.parse(JSON.stringify(require('../../../testData/validCheckoutData.json')));



// test.describe.configure({ mode: "parallel" });
async function verveCheckout(page) {
    // browser = await chromium.launch({headless:false});
    // const page = await browser.newPage();
    const poManager = new POManager(page);
    const checkoutPage = poManager.getCheckoutPage();

    // Navigate to the Payment URL
    await checkoutPage.goTO();

    // Click on the Proceed to Payment Button
    await checkoutPage.clickProceedToPaymentButton();

    // Enter Card Details
    await checkoutPage.enterCardDetails(dataset[0].verveCardNumber, dataset[0].verveExpiringDate, dataset[0].verveCVV);

    // Click Continue Button
    await checkoutPage.clickcardDetailsContinue();

    // Enter Card Pin
    await checkoutPage.enterCardPin(dataset[0].vervePin);

    // Click Continue Button
    await checkoutPage.clickPinContinueButton();
    // await page.pause();

    // Verify Atm Pin Was Successful
    await checkoutPage.verifyAtmPinSubmittedSuccessfully();

    // Enter OTP Code
    await checkoutPage.enterOTP(dataset[0].verveOTP)

    // Click continue button
    await checkoutPage.clickOTPContiueButton();

    // Assert Checkout is successful
    await checkoutPage.assertCheckoutIsSuccessfully();

}

module.exports = {verveCheckout, };

// test(`@checkout Successful Visa Card Checkout`, async ({ browser }) => {
//     browser = await chromium.launch({headless:false});
//     const page = await browser.newPage();

//     const poManager = new POManager(page);
//     const checkoutPage = poManager.getCheckoutPage();

//     // Navigate to the Payment URL
//     await checkoutPage.goTO();

//     // Click on the Proceed to Payment Button
//     await checkoutPage.clickProceedToPaymentButton();

//     // Enter Card Details
//     await checkoutPage.enterCardDetails(dataset[1].visaCardNumber, dataset[1].visaExpiringDate, dataset[1].visaCVV);

//     // Click Continue Button
//     await checkoutPage.clickcardDetailsContinue();

//     // Enter Card Pin
//     await checkoutPage.enterCardPin(dataset[1].visaPin);

//     // Click Continue Button
//     await checkoutPage.clickPinContinueButton();

//     // Switching to the i-frame
//     await checkoutPage.switchToIframe();

//     // Enter the OTP Code
//     await checkoutPage.enterVisaOTP(dataset[1].visaOTP)

//     // Click the Submit Button
//     await checkoutPage.clickVisaSubmitButton();

//     // Assert Checkout is successful
//     await checkoutPage.assertCheckoutIsSuccessfully();

// })

// test(`@checkout Verve (Failure - Timeout calling issuing bank)`, async ({ browser }) => {
//     browser = await chromium.launch({headless:false});
//     const page = await browser.newPage();

//     const poManager = new POManager(page);
//     const checkoutPage = poManager.getCheckoutPage();

//     // Navigate to the Payment URL
//     await checkoutPage.goTO();

//     // Click on the Proceed to Payment Button
//     await checkoutPage.clickProceedToPaymentButton();

//     // Enter Card Details
//     await checkoutPage.enterCardDetails(dataset[2].verveCardNumber, dataset[2].verveExpiringDate, dataset[2].verveCVV);

//     // Click Continue Button
//     await checkoutPage.clickcardDetailsContinue();

//     // Enter Card Pin
//     await checkoutPage.enterCardPin(dataset[2].vervePin);

//     // Click Continue Button
//     await checkoutPage.clickPinContinueButton();

//     // Assert Error Message is displayes
//     await checkoutPage.assertErrorMessageIsDisplayed();

// })

// test(`@checkout Verve (Failure - Insufficient Funds))`, async ({ browser }) => {
//     browser = await chromium.launch({headless:false});
//     const page = await browser.newPage();

//     const poManager = new POManager(page);
//     const checkoutPage = poManager.getCheckoutPage();

//     // Navigate to the Payment URL
//     await checkoutPage.goTO();

//     // Click on the Proceed to Payment Button
//     await checkoutPage.clickProceedToPaymentButton();

//     // Enter Card Details
//     await checkoutPage.enterCardDetails(dataset[3].verveCardNumber, dataset[3].verveExpiringDate, dataset[3].verveCVV);

//     // Click Continue Button
//     await checkoutPage.clickcardDetailsContinue();

//     // Enter Card Pin
//     await checkoutPage.enterCardPin(dataset[3].vervePin);

//     // Click Continue Button
//     await checkoutPage.clickPinContinueButton();

//     // Verify Atm Pin Was Successful
//     await checkoutPage.verifyAtmPinSubmittedSuccessfully();

//     // Enter OTP Code
//     await checkoutPage.enterOTP(dataset[3].verveOTP)

//     // Click continue button
//     await checkoutPage.clickOTPContiueButton();

//     // Assert Error Message is displayes
//     await checkoutPage.assertInsufficentFundErrorMessageIsDisplayed();

// })

// test(`@checkout Verve (Failure - No card Record)`, async ({ browser }) => {
//     browser = await chromium.launch({headless:false});
//     const page = await browser.newPage();

//     const poManager = new POManager(page);
//     const checkoutPage = poManager.getCheckoutPage();

//     // Navigate to the Payment URL
//     await checkoutPage.goTO();

//     // Click on the Proceed to Payment Button
//     await checkoutPage.clickProceedToPaymentButton();

//     // Enter Card Details
//     await checkoutPage.enterCardDetails(dataset[4].verveCardNumber, dataset[4].verveExpiringDate, dataset[4].verveCVV);

//     // Click Continue Button
//     await checkoutPage.clickcardDetailsContinue();

//     // Enter Card Pin
//     await checkoutPage.enterCardPin(dataset[4].vervePin);

//     // Click Continue Button
//     await checkoutPage.clickPinContinueButton();

//     // Assert Error Message is displayes
//     await checkoutPage.assertErrorMessageIsDisplayed();

// })
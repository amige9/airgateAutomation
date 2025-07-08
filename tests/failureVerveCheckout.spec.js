const { test } = require('@playwright/test')
const { POManager } = require('../pageObject/POManager')
const playwright = require('@playwright/test');
const dataset = JSON.parse(JSON.stringify(require('../testData/validCheckoutData.json')));



// test.describe.configure({ mode: "parallel" });
test("Verve (Failure - Timeout calling issuing bank)", async ({ page }) => {
    const poManager = new POManager(page);
    const checkoutPage = poManager.getCheckoutPage();

    // Navigate to the Payment URL
    await checkoutPage.goTO();

    // Click on the Proceed to Payment Button
    await checkoutPage.clickProceedToPaymentButton();

    // Enter Card Details
    await checkoutPage.enterCardDetails(dataset[2].verveCardNumber, dataset[2].verveExpiringDate, dataset[2].verveCVV);

    // Click Continue Button
    await checkoutPage.clickcardDetailsContinue();

    // Enter Card Pin
    await checkoutPage.enterCardPin(dataset[2].vervePin);

    // Click Continue Button
    await checkoutPage.clickPinContinueButton();

    // Assert Error Message is displayes
    await checkoutPage.assertErrorMessageIsDisplayed();

})

test("Verve (Failure - Insufficient Funds))", async ({ page }) => {
    const poManager = new POManager(page);
    const checkoutPage = poManager.getCheckoutPage();

    // Navigate to the Payment URL
    await checkoutPage.goTO();

    // Click on the Proceed to Payment Button
    await checkoutPage.clickProceedToPaymentButton();

    // Enter Card Details
    await checkoutPage.enterCardDetails(dataset[3].verveCardNumber, dataset[3].verveExpiringDate, dataset[3].verveCVV);

    // Click Continue Button
    await checkoutPage.clickcardDetailsContinue();

    // Enter Card Pin
    await checkoutPage.enterCardPin(dataset[3].vervePin);

    // Click Continue Button
    await checkoutPage.clickPinContinueButton();

    // Verify Atm Pin Was Successful
    await checkoutPage.verifyAtmPinSubmittedSuccessfully();

    // Enter OTP Code
    await checkoutPage.enterOTP(dataset[3].verveOTP)

    // Click continue button
    await checkoutPage.clickOTPContiueButton();

    // Assert Error Message is displayes
    await checkoutPage.assertInsufficentFundErrorMessageIsDisplayed();

})

test("Verve (Failure - No card Record)", async ({ page }) => {
    const poManager = new POManager(page);
    const checkoutPage = poManager.getCheckoutPage();

    // Navigate to the Payment URL
    await checkoutPage.goTO();

    // Click on the Proceed to Payment Button
    await checkoutPage.clickProceedToPaymentButton();

    // Enter Card Details
    await checkoutPage.enterCardDetails(dataset[4].verveCardNumber, dataset[4].verveExpiringDate, dataset[4].verveCVV);

    // Click Continue Button
    await checkoutPage.clickcardDetailsContinue();

    // Enter Card Pin
    await checkoutPage.enterCardPin(dataset[4].vervePin);

    // Click Continue Button
    await checkoutPage.clickPinContinueButton();

    // Assert Error Message is displayes
    await checkoutPage.assertErrorMessageIsDisplayed();

})
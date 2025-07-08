const { test } = require('@playwright/test')
const { POManager } = require('../pageObject/POManager')
const playwright = require('@playwright/test');
const dataset = JSON.parse(JSON.stringify(require('../testData/validCheckoutData.json')));



// test.describe.configure({ mode: "parallel" });
test("Successful Verve Card Checkout", async ({ page }) => {
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


})

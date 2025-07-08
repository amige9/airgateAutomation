const { test } = require('@playwright/test')
const { POManager } = require('../pageObject/POManager')
const playwright = require('@playwright/test');
const dataset = JSON.parse(JSON.stringify(require('../testData/validCheckoutData.json')));





test("Successful Visa Card Checkout", async ({ page }) => {

    const poManager = new POManager(page);
    const checkoutPage = poManager.getCheckoutPage();

    // Navigate to the Payment URL
    await checkoutPage.goTO();

    // Click on the Proceed to Payment Button
    await checkoutPage.clickProceedToPaymentButton();

    // Enter Card Details
    await checkoutPage.enterCardDetails(dataset[1].visaCardNumber, dataset[1].visaExpiringDate, dataset[1].visaCVV);

    // Click Continue Button
    await checkoutPage.clickcardDetailsContinue();

    // Enter Card Pin
    await checkoutPage.enterCardPin(dataset[1].visaPin);

    // Click Continue Button
    await checkoutPage.clickPinContinueButton();

    // Switching to the i-frame
    await checkoutPage.switchToIframe();

    // Enter the OTP Code
    await checkoutPage.enterVisaOTP(dataset[1].visaOTP)

    // Click the Submit Button
    await checkoutPage.clickVisaSubmitButton();

    // Assert Checkout is successful
    await checkoutPage.assertCheckoutIsSuccessfully();


})


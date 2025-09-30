const { expect } = require("@playwright/test");

class CheckoutPage{

    constructor(page){
        this.page = page;
        this.proceedToPaymentButton = page.locator("text=Proceed to payment")
        this.cardNumberField = page.locator("input[placeholder='0000 0000 0000 0000']")
        this.expiringLocator = page.locator("#expDate")
        this.cvvLocator = page.locator("#cvv")
        this.cardDetailsContinueButton = page.locator("button[type='submit']")
        this.pinLocator = page.locator("input[autocomplete$='off']")
        this.continueButton = page.locator("button[type='submit']")
        this.atmPinSuccessMsg = page.locator("xpath=//div[contains(text(),'Kindly enter the OTP sent to 234805***1111')]")
        this.OTPHeader = page.locator(".app_otp_header_title");
        this.otpCodeLocator = page.locator("input[autocomplete$='off']");
        this.otpContinueButton = page.locator("button[type='submit']");
        // this.paymentSuccessLocator = page.locator("xpath=//p[@class='success_title']");
        this.paymentSuccessLocator = page.locator(".success_title");
        this.transactionErrorMessage = page.locator("div[role='alert'] div:nth-child(2)");
        this.visaURL = "https://centinelapistag.cardinalcommerce.com/V2/Cruise/StepUp";
        this.iframeLocator = `iframe[id^="cardinal-stepUpIframe-"]`
        this.framePage = null;
    
    }

  

    async goTO(){
        await this.page.goto("https://qpay.airgate.ng/payment_process/b6b7c0c8-f7e0-47f5-a07d-7807291d3341?mode=sandbox"); //Account Email keo.zayvon@freedrops.org
    }
    async clickProceedToPaymentButton(){
       await this.proceedToPaymentButton.click();
    }

    async enterCardDetails(number, expDate, cvv){
        await this.cardNumberField.fill(number);
        await this.expiringLocator.fill(expDate);
        await this.cvvLocator.fill(cvv);
    }

    async clickcardDetailsContinue(){
        await this.cardDetailsContinueButton.click();
    }

    async enterCardPin(pin) {
        for (let i = 0; i < pin.length; i++) {
            await this.pinLocator.nth(i).pressSequentially(pin[i], {delay: 200});
        }
    }

    async clickPinContinueButton(){
        await this.continueButton.waitFor('visible')
        await this.continueButton.click();
    
    }

    async verifyAtmPinSubmittedSuccessfully(){
        await this.OTPHeader.waitFor("visible");
        const msg = await this.atmPinSuccessMsg.textContent();
        // console.log(msg);
        expect(msg).toContain("Kindly enter the OTP sent to");

    }

    async enterOTP(code) {
        for (let i = 0; i < code.length; i++) {
            await this.otpCodeLocator.nth(i).pressSequentially(code[i]);
        }
    } 

    async clickOTPContiueButton(){
        await this.otpContinueButton.click();
    }

    async assertCheckoutIsSuccessfully() {
        // await this.paymentSuccessLocator.waitFor({state : "visible", timeout: 300000});
        await this.paymentSuccessLocator.waitFor("visible");
        const msg = await this.paymentSuccessLocator.textContent();
        expect(msg).toEqual("Payment Successful");
    }

    async assertErrorMessageIsDisplayed(){
        await this.transactionErrorMessage.waitFor('visible');
        await expect(this.transactionErrorMessage).toBeVisible();
    }

    async assertInsufficentFundErrorMessageIsDisplayed(){
        await this.transactionErrorMessage.waitFor('visible');
        await expect(this.transactionErrorMessage).toBeVisible();
        // const msg = await this.transactionErrorMessage.textContent();
        // expect(msg).toEqual("Insufficient Funds");
    }


    async switchToIframe(){
        await this.page.waitForURL(this.visaURL)
        this.framePage = await this.page.frameLocator(this.iframeLocator);
    }

    async enterVisaOTP(otp){
        await this.framePage.locator("input[type='text']").fill(otp);
    }

    async clickVisaSubmitButton(){
        await this.framePage.locator("input[value='SUBMIT']").click()
    }
}
module.exports = {CheckoutPage};
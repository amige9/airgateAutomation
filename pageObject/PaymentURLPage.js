const { expect } = require("@playwright/test");

class PaymentURLPage {

    constructor(page) {
        this.page = page;
        this.paymentLinkLocator = page.locator("span:has-text('Payment Links')")
        this.generateNewPaymentLocator = page.locator("span:has-text('Generate New Payment URL')")
        this.amountFieldLocator = page.locator("#amount")
        this.paymentRefLocator = page.locator("#order_reference");
        this.remarksLocator = page.locator("#description");
        this.submitButton = page.locator("button[type='submit'] span");
        this.successMsg = page.locator("xpath=//div[contains(text(),'CREATED')]");
        this.callBackLocator = page.locator("#merchant_redirect_url");
        this.amountDropdownLocator = page.locator(".ant-select-selection-item");
        this.usdLocator = page.locator('.ant-select-item-option:has-text("USD")');
    }

    async clickPaymentLink() {
        await this.paymentLinkLocator.click();
        // await expect(this.paymentLinkLocator).toHaveText("Payment Links");
        // console.log(this.paymentLinkText);
    }

    async clickGenerateNewPayment() {
        await this.generateNewPaymentLocator.click();
    }

    async fillPaymentLinkForm(amt, ref, remarks, URL) {
        await this.amountFieldLocator.fill(amt);
        await this.paymentRefLocator.fill(ref);
        await this.remarksLocator.fill(remarks);
        await this.callBackLocator.fill(URL);
    }

    async clickSubmitButton() {
        await this.submitButton.click();
    }

    async assertPaymentLinkCreatedSuccessfully() {
        const msg = await this.successMsg.textContent();
        expect(msg).toEqual("CREATED")
    }

    async selectUSDOption() {
        await this.amountDropdownLocator.click();
        await this.page.waitForSelector('.ant-select-dropdown:not(.ant-select-dropdown-hidden)');
        await this.usdLocator.click();
    }


}

module.exports = { PaymentURLPage };
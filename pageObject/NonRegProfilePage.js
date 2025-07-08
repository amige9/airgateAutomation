const { expect } = require("@playwright/test");

class NonRegProfilePage{

    constructor(page){
        this.page = page;
        this.complianceButton = page.locator("text=Compliance");
        this.nonRegCheckBox = page.locator("[name='business']");
        this.continueButton = page.locator("button[type='submit'] span");
        this.uploadLocator = page.locator("[type='file']");
        this.businessNameLocator = page.locator("#business_name");
        this.businessEmailLocator = page.locator("#business_email");
        this.websiteLocator = page.locator("#website");
        this.instagramLocator = page.locator("#instagram");
        this.facebookLocator = page.locator("#facebook");
        this.twitterLocator = page.locator("#twitter");
        this.saveAndContinue = page.locator("button[type='submit']");
        this.bankLocator = page.locator("#bank");
        this.expectedURL = "https://uat.airgate.ng/dashboard/compliance/non-registered-business/bank";
    }

    
    async goTo() {
        await this.page.goto("https://uat.airgate.ng/login");
    }

    async clickComplianceButton(){
        await this.complianceButton.click();
    }

    async clickNonRegRadioButton(){
        await this.nonRegCheckBox.first().click();
    }

    async clickContinueButton(){
        await this.continueButton.click();
    }

    async fillProfileForm(filePath, bizName, bizEmail, websiteURL, instragramURL, facebookURL, twitterURL){
        await this.uploadLocator.setInputFiles(filePath);
        await this.businessNameLocator.fill(bizName);
        await this.businessEmailLocator.fill(bizEmail)
        await this.websiteLocator.fill(websiteURL);
        await this.instagramLocator.fill(instragramURL);
        await this.facebookLocator.fill(facebookURL);
        await this.twitterLocator.fill(twitterURL);
    }

    async clickSaveAndContinueButton(){
        await this.saveAndContinue.click();
    }

    async assertProfileFormIsSuccessful(){
        await this.bankLocator.waitFor();
        await expect(this.page).toHaveURL(this.expectedURL);
    }

    async assertProfileFormIsNotSuccessful(){
        await expect(this.page).not.toHaveURL(this.expectedURL);
    }



}

module.exports = {NonRegProfilePage};
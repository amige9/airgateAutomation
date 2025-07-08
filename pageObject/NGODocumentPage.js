const { expect } = require("@playwright/test");

class NGODocumentPage{

    constructor(page){
        this.page = page;
        this.CACNumberLocator = page.locator("#cac_number")
        this.complianceButton = page.locator("text=Compliance");
        this.fileUploadLocator = page.locator("[type='file']");
        this.TINNumberLocator = page.locator("#tin_number");
        this.salesNumberLocator = page.locator('#monthly_sale_number');
        this.completeSetupLocator = page.locator("button[type='submit'] span");
        this.firstNameLocator = page.locator("#owners_0_fullname");
        this.expectedURL = "https://uat.airgate.ng/dashboard/compliance/ngo/owner"

    }



    async goTo() {
        await this.page.goto("https://uat.airgate.ng/login");
    }

    async clickComplianceButton(){
        await this.complianceButton.click();
    }

    async enterCACNumber(number){
        await this.CACNumberLocator.fill(number);
    }

    async uploadCACCertificate(uploadFile){
        await this.fileUploadLocator.first().setInputFiles(uploadFile);
    }

    async enterTINNumber(number){
        await this.TINNumberLocator.fill(number);
    }

    async uploadConstitutionDocument(uploadFile){
        await this.fileUploadLocator.nth(1).setInputFiles(uploadFile);
    }

    // async enterMonthlySalesNumber(number){
    //     await this.salesNumberLocator.fill(number)
    // }

    async uploadAddressDocument(uploadFile){
        await this.fileUploadLocator.last().setInputFiles(uploadFile)
    }

    async clickCompleteButton(){
        await this.completeSetupLocator.click();
    }

    async assertDocumnentFormIsSuccessful(){
        await this.firstNameLocator.waitFor();
        await expect(this.page).toHaveURL(this.expectedURL)
    }
}

module.exports = {NGODocumentPage}
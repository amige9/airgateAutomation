const { expect } = require("@playwright/test");

class NonRegOwnerPage{

    constructor(page){
        this.page = page;
        this.complianceButton = page.locator("text=Compliance");
        this.fullNameLocator = page.locator('#owners_0_fullname');
        this.DOBLocator = page.locator("input[placeholder$='Select date']");
        // this.documentTypeLocator = page.locator("#identification_document_type");
        // this.dropdownLocator = page.locator("div .rc-virtual-list-holder-inner");
        // this.documentNumberLocator = page.locator("#identification_document_number");
        this.ninNumberLocator = page.locator('#owners_0_nin_number');
        this.uploadLocator = page.locator("[type='file']");
        this.completeSetupLocator = page.locator("button[type='submit']");
        this.startKYCLocator = page.locator("button[class='ant-btn ant-btn-primary']");
        this.yesLocator = page.locator("button[class='ant-btn ant-btn-primary delete-business-type-btn']")
        this.kycAlertLocator = page.locator("div[role='alert'] div:nth-child(2)");

    }


    async goTo() {
        await this.page.goto("https://uat.airgate.ng/login");
    }

    async clickComplianceButton(){
        await this.complianceButton.click();
    }

    async enterFullName(fullName){
        await this.fullNameLocator.fill(fullName);
    }


    async enterDOB(dob){
        await this.DOBLocator.type(dob);
    }

    // async selectDocumnetType(document){
    //     await this.documentTypeLocator.click({force: true});
    //     const dropdown = this.dropdownLocator;
    //     const dropdownCount = await dropdown.locator(".ant-select-item").count();
    //     for(let i=0; i <dropdownCount; ++i){
    //         let text = await dropdown.locator(' .ant-select-item .ant-select-item-option-content').nth(i).textContent();
    //         if(text === document){
    //             await dropdown.locator(" .ant-select-item .ant-select-item-option-content").nth(i).click();
    //             break;
    //         }
    //     }
    // }

    // async enterIdentificationNumber(docNumber){
    //     await this.documentNumberLocator.fill(docNumber);
    // }

    // async uploadIdentificationDocument(filepath){
    //     await this.uploadLocator.setInputFiles(filepath)
    // }

    async enterNINNumber(number){
        await this.ninNumberLocator.fill(number);
    }

    async uploadNINDocument(filepath){
        await this.uploadLocator.first().setInputFiles(filepath)
    }

    async uploadProofOfAddressDocument(filepath){
        await this.uploadLocator.nth(1).setInputFiles(filepath)
    }

    async clickCompleteSetupButton(){
        await this.completeSetupLocator.click();
        await this.startKYCLocator.waitFor();
    }

    async clickStartKYCButton(){
        await this.startKYCLocator.click();
        await this.yesLocator.click();
    }

    async assertKYCStartedSuccessfully(){
        await this.kycAlertLocator.waitFor();
        expect(await this.kycAlertLocator).toBeVisible();
        // await expect(this.kycAlertLocator).toHaveText("KYC started successfully");
        // expect(await this.page.locator(".status_text_container")).toHaveText("Processing");
    }
}

module.exports = {NonRegOwnerPage};
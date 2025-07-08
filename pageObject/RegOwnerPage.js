const { expect } = require("@playwright/test");

class RegOwnerPage{

    constructor(page){
        this.page = page;
        this.complianceButton = page.locator("text=Compliance");
        this.fullNameLocator = page.locator('#owners_0_fullname');
        this.DOBLocator = page.locator("#owners_0_dob");
        // this.documentTypeLocator = page.locator("#identification_document_type");
        // this.dropdownLocator = page.locator("div .rc-virtual-list-holder-inner");
        this.BVNLocator = page.locator("#owners_0_bvn");
        this.NINLocator = page.locator("#owners_0_nin_number");
        this.uploadLocator = page.locator("input[type$='file']");
        this.fullNameLocator1 = page.locator('#owners_1_fullname');
        this.DOBLocator1 = page.locator("#owners_1_dob");
        this.BVNLocator1 = page.locator("#owners_1_bvn");
        this.NINLocator1 = page.locator("#owners_1_nin_number");  
        this.uploadLocator = page.locator("input[type$='file']");
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


    async enterDirectorFullName(fullName){
        await this.fullNameLocator.fill(fullName);
    }

    async enterDirectorDOB(dob){
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

    async enterDirectorBVNNumber(Number){
        await this.BVNLocator.fill(Number);
    }

    async enterDirectorNINNumber(Number){
        await this.NINLocator.fill(Number);
    }

    async uploadDirectorNINDocument(filepath){
        await this.uploadLocator.first().setInputFiles(filepath)
    }

    async enterShareholderFullName(fullName){
        await this.fullNameLocator1.fill(fullName);
    }

    async enterShareholderDOB(dob){
        await this.DOBLocator1.type(dob);
    }

    async enterShareholderBVNNumber(Number){
        await this.BVNLocator1.fill(Number);
    }

    async enterShareholderNINNumber(Number){
        await this.NINLocator1.fill(Number);
    }

    async uploadShareholderNINDocument(filepath){
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
        await this.kycAlertLocator.waitFor("visible");
        expect(await this.kycAlertLocator).toBeVisible();
        // await expect(this.kycAlertLocator).toHaveText("KYC started successfully");
        // expect(await this.page.locator(".status_text_container")).toHaveText("Processing");
    }

}

module.exports = {RegOwnerPage};
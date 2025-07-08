const { expect } = require("@playwright/test");

class RegDocumentPage{

    constructor(page){
        this.page = page;
        this.CACNumberLocator = page.locator("#cac_number");
        this.complianceButton = page.locator("text=Compliance");
        this.fileUploadLocator = page.locator("[type='file']");
        this.cacNumberLocator = page.locator("#cac_bn_number");
        this.tinNumberLocator = page.locator("#tin_number");
        this.documentTypeLocator = page.locator(".ant-form-item").nth(5)
        this.dropdownLocator = page.locator("div .rc-virtual-list-holder-inner");
        this.completeSetupLocator = page.locator("button[type='submit'] span");
        this.firstNameLocator = page.locator("#owners_0_fullname");
        this.expectedURL = "https://uat.airgate.ng/dashboard/compliance/registered-business/owner"



     
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

    async uploadCACCertificate(file){
        await this.fileUploadLocator.first().setInputFiles(file)
    }

    async EnterTINNumber(number){
        await this.tinNumberLocator.fill(number);
    }

    async uploadAddressDocument(file){
        await this.fileUploadLocator.nth(1).setInputFiles(file)
    }

    async uploadCACStatusDocument(file){
        await this.fileUploadLocator.nth(2).setInputFiles(file)
    }

    async selectPEP(option){
        await this.documentTypeLocator.click({force:true});
        const dropdown = this.dropdownLocator;
        const dropdownCount = await dropdown.locator(".ant-select-item").count();
        for(let i=0; i<dropdownCount; i++) {
            let text = await dropdown.locator(' .ant-select-item .ant-select-item-option-content').nth(i).textContent();
            if(text === option){
                await dropdown.locator(" .ant-select-item .ant-select-item-option-content").nth(i).click();
                break;
            }
        }
    }

    async uplaodSCUMLDocument(file){
        await this.fileUploadLocator.nth(3).setInputFiles(file)
    }



    // async enterCerificateIncorpNumber(number){
    //     await this.certIncorpNumLocator.fill(number);
    // }

    // async uploadCertifcateIncorporation(file){
    //     await this.fileUploadLocator.nth(1).setInputFiles(file);
    // }

    
    // async enterCACBNNumber(number){
    //     await this.cacNumberLocator.fill(number);
    // }

    // async uploadCACBusinessDocument(uploadFile){
    //     await this.fileUploadLocator.nth(2).setInputFiles(uploadFile);
    // }

    // async EnterTINNumber(number){
    //     await this.tinNumberLocator.fill(number);
    // }

    // async UploadTinDocument(file){
    //     await this.fileUploadLocator.nth(3).setInputFiles(file);
    // }

    // async UploadProofAddress(file){
    //     await this.fileUploadLocator.nth(4).setInputFiles(file);
    // }

    // async UploadStatusReport(file){
    //     await this.fileUploadLocator.nth(5).setInputFiles(file);
    // }

    // async UploadPEPDocument(file){
    //     await this.fileUploadLocator.nth(6).setInputFiles(file);
    // }

    // async UploadSCUGMLDocument(file){
    //     await this.fileUploadLocator.last().setInputFiles(file);
    // }

    async clickCompleteButton(){
        await this.completeSetupLocator.click();
    }

    
    async assertDocumnentFormIsSuccessful(){
        await this.firstNameLocator.waitFor();
        await expect(this.page).toHaveURL(this.expectedURL)
    }

}

module.exports = {RegDocumentPage};
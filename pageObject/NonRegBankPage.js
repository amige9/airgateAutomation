const { expect, playright } = require("@playwright/test");

class NonRegBankPage{

    constructor(page){
        this.page= page;
        this.complianceButton = page.locator("text=Compliance");
        this.bankDropdownLocator = page.locator("#bank");
        this.bankActNumberLocator = page.locator("#bank_account_number");
        this.bvnLocator = page.locator("#bvn");
        this.submitLocator = page.locator("button[type='submit']");
        this.expectedURL = "https://uat.airgate.ng/dashboard/compliance/non-registered-business/owner";
        this.firstNameLocator = page.locator("#owners_0_fullname");
        this.accountNameLocator = page.locator("input[placeholder='Bank Account Name']");
        this.bankStatementLocator = page.locator("input[type$='file']");

    }


    async goTo() {
        await this.page.goto("https://uat.airgate.ng/login");
    }

    async clickComplianceButton(){
        await this.complianceButton.click();
    }

    async selectBank(bankName){
        await this.bankDropdownLocator.pressSequentially(bankName, { delay: 1200 });
        // await this.page.waitForTimeout(5000);
        await this.page.keyboard.press('Enter');
    }

    async enterBankAccountNumber(number){
        await this.bankActNumberLocator.fill(number)
    }

    async enterBVN(bvn){
        // Function to wait for Account Name to be displayed before entering BVN
        await this.page.waitForFunction(() => {
            const accountNameInput = document.querySelector("input[placeholder='Bank Account Name']");
            return accountNameInput && accountNameInput.value.trim() !== '';
          });
        await this.bvnLocator.fill(bvn)
    }

    async uploadBankStatement(filepath){
        await this.bankStatementLocator.setInputFiles(filepath)
    }

    async clcikSaveAndContinueButton(){
        await this.submitLocator.click();
    }

    async assertBankFormIsSuccessful(){
        await this.firstNameLocator.waitFor();
        await expect(this.page).toHaveURL(this.expectedURL);
    }




}

module.exports = {NonRegBankPage}
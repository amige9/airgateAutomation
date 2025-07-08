const { LoginPage } = require('../pageObject/LoginPage');
const { RegistrationPage } = require('../pageObject/RegistrationPage');
const { CheckoutPage } = require('./checkoutPage');
const { NonRegProfilePage } = require('./NonRegProfilePage');
const { NonRegBankPage } = require('./NonRegBankPage');
const { PaymentURLPage } = require('./PaymentURLPage');
const { NonRegOwnerPage } = require('./NonRegOwnerPage');
const { NGOProfilePage } = require('./NGOProfilePage');
const { NGOBankPage } = require('./NGOBankPage');
const { NGODocumentPage } = require('./NGODocumentPage');
const { NGOOwnerPage } = require('./NGOOwnerPage');
const { RegProfilePage } = require('./RegProfilePage');
const { RegBankPage } = require('./RegBankPage');
const { RegDocumentPage } = require('./RegDocumentPage');
const { RegOwnerPage } = require('./regOwnerPage');


class POManager {
    constructor(page) {
        this.page = page
        this.loginPage = new LoginPage(this.page);
        this.regPage = new RegistrationPage(this.page);
        this.nonRegProfilePage = new NonRegProfilePage(this.page);
        this.paymentUrlPage = new PaymentURLPage(this.page) 
        this.checkoutPage = new CheckoutPage(this.page);
        this.nonRegBankPage = new NonRegBankPage(this.page);
        this.nonRegOwnerPage = new NonRegOwnerPage(this.page);
        this.ngoProfilePage = new NGOProfilePage(this.page);
        this.ngoBankPage = new NGOBankPage(this.page);
        this.ngoDocumentPage = new NGODocumentPage(this.page);
        this.ngoOwnerPage = new NGOOwnerPage(this.page);
        this.regProfilePage = new RegProfilePage(this.page);
        this.regBankPage = new RegBankPage(this.page);
        this.regDocumentPage = new RegDocumentPage(this.page);
        this.regOwnerPage = new RegOwnerPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getRegistrationPage() {
        return this.regPage;
    }

    getnonRegProfilePage(){
        return this.nonRegProfilePage;
    }

    getNonRegBankPage(){
        return this.nonRegBankPage;
    }

    getNonRegOwnerPage(){
        return this.nonRegOwnerPage;
    }

    getNGOProfilePage(){
        return this.ngoProfilePage;
    }

    getNGOBankPage(){
        return this.ngoBankPage;
    }

    getNGODocumentPage(){
        return this.ngoDocumentPage;
    }

    getNGOOwnerPage(){
        return this.ngoOwnerPage;
    }

    getRegProfilePage(){
        return this.regProfilePage;
    }

    getRegBankPage(){
        return this.regBankPage;
    }

    getRegDocumentPage(){
        return this.regDocumentPage;
    }

    getRegOwnerPage(){
        return this.regOwnerPage;
    }

    getPaymentURLPage(){
        return this.paymentUrlPage;
    }

    getCheckoutPage(){
        return this.checkoutPage;
    }


}

module.exports = { POManager };
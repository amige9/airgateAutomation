const { chromium } = require("@playwright/test");
const { POManager } = require('../../../pageObject/POManager');
const loginData = JSON.parse(JSON.stringify(require('../../../testData/validLoginTestData.json')))



async function merchantLogin(page) {

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();

    await loginPage.goTo();
    await loginPage.login(loginData[0].email, loginData[0].password);
    await loginPage.assertLoggedInSuccessfully();
};

module.exports = { merchantLogin, };

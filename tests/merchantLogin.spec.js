const { test } = require('@playwright/test');
// const { validTest } = require('../utils/test-base');
const { POManager } = require('../pageObject/POManager');
const loginData = JSON.parse(JSON.stringify(require('../testData/validLoginTestData.json')))
const invalidDataset = JSON.parse(JSON.stringify(require('../testData/invalidLoginTestData.json')))
const ENV = require('../utils/env')



// test.describe.configure({ mode: "parallel" });
    test('Valid Login Test', async ({ page }) => {

        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();

        await loginPage.goTo();
        // await loginPage.login(loginData[0].email, loginData[0].password);
        await loginPage.login(ENV.EMAIL, ENV.PASSWORD);
        await loginPage.assertLoggedInSuccessfully();

    })


// for (const data of invalidDataset) {
//     test(`invalid Login ${data.email}`, async ({ page }) => {

//         const poManager = new POManager(page);
//         const loginPage = poManager.getLoginPage();

//         await loginPage.goTo();
//         await loginPage.login(data.email, data.password);
//         await loginPage.assertLoggedNotInSuccessfully();

//     })
// }



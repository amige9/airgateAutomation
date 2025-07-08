const { test } = require('@playwright/test')
const { POManager } = require('../pageObject/POManager');
const validDataset = JSON.parse(JSON.stringify(require('../testData/validNonRegProfileTestData.json')));
const invalidDataset = JSON.parse(JSON.stringify(require('../testData/invalidNonRegProfileTestData.json')));
const playwright  = require('@playwright/test')

let nonRegProfilePage;
test.beforeAll(async () => {
    const browser = await playwright.chromium.launch({headless:false}); // Use the browser you need
    const context = await browser.newContext();
    const page = await context.newPage();

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();

    // Login into the application
    await loginPage.goTo();
    await loginPage.login(validDataset[0].email, validDataset[0].password); // Use any valid data for login

    // Click compliance button
    nonRegProfilePage = poManager.getnonRegProfilePage();
    await nonRegProfilePage.clickComplianceButton();

    //  Click the Non-registered Business Radio Button
    await nonRegProfilePage.clickNonRegRadioButton();

    // Click continue Button
    await nonRegProfilePage.clickContinueButton();
});


// test.describe.configure({ mode: "parallel" })
for (const data of invalidDataset) {
    test(`Invalid Non-Registered Profile: ${data.scenerio}`, async ({ page }) => {

        // Enter Profile form
        await nonRegProfilePage.fillProfileForm(data.filepath, data.bizName, data.bizEmail,
            data.website, data.instagram, data.facebook, data.twitter);
        // await page.pause();

        // Click Save and Continue Button
        await nonRegProfilePage.clickSaveAndContinueButton();

        // Assert the profile form was successful
        await nonRegProfilePage.assertProfileFormIsNotSuccessful();

        // Reload the page
        await page.reload();

    })
}


for (const data of validDataset) {
    test.only('Valid Non-Registered Profile', async ({ page }) => {

        // Enter Profile form
        await nonRegProfilePage.fillProfileForm(data.filepath, data.bizName, data.bizEmail,
            data.website, data.instagram, data.facebook, data.twitter);
        // await page.pause();

        // Click Save and Continue Button
        await nonRegProfilePage.clickSaveAndContinueButton();

        // Assert the profile form was not successful
        await nonRegProfilePage.assertProfileFormIsSuccessful();

    })
}

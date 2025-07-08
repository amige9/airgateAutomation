const { test, chromium } = require('@playwright/test');
const { POManager } = require('../pageObject/POManager')
const validDataset = JSON.parse(JSON.stringify(require('../testData/validRegProfileTestData.json')));



test("Valid Registered Business Profile Test", async ({browser}) =>{
    browser = await chromium.launch({headless:false});
    const page = await browser.newPage();
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const regProfilePage = poManager.getRegProfilePage();


    //login into the application 
    await loginPage.goTo();
    await loginPage.login(validDataset[0].email, validDataset[0].password);

    // Click Compliance Button
    await regProfilePage.clickComplianceButton();

    // click NGO Check Box
    await regProfilePage.clickRegCheckBox();

    // Click Continue Button
    await regProfilePage.clickContinueButton();

    // Fill the owner form
    await regProfilePage.fillNGOProfileForm(validDataset[0].filePath,validDataset[0].bizName, validDataset[0].bizEmail,
        validDataset[0].website, validDataset[0].instagram, validDataset[0].facebook, validDataset[0].twitter);
    
    // Click Save and Continue Button
    await regProfilePage.clickSaveAndContinueButton();

    // Assert the profile form was successful
    await regProfilePage.assertProfileFormIsSuccessful();

})
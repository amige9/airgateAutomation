const { test, chromium } = require('@playwright/test');
const { POManager } = require('../pageObject/POManager')
const validDataset = JSON.parse(JSON.stringify(require('../testData/validNGOProfileTestData.json')));



test("Valid NGO Profile Test", async ({browser}) =>{
    browser = await chromium.launch({headless:false});
    const page = await browser.newPage();
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const ngoProfilePage = poManager.getNGOProfilePage();


    //login into the application 
    await loginPage.goTo();
    await loginPage.login(validDataset[0].email, validDataset[0].password);

    // Click Compliance Button
    await ngoProfilePage.clickComplianceButton();

    // click NGO Check Box
    await ngoProfilePage.clickNGOCheckBox();

    // Click Continue Button
    await ngoProfilePage.clickContinueButton();

    // Fill the owner form
    await ngoProfilePage.fillNGOProfileForm(validDataset[0].filePath,validDataset[0].bizName, validDataset[0].bizEmail,
        validDataset[0].website, validDataset[0].instagram, validDataset[0].facebook, validDataset[0].twitter);
    
    // Click Save and Continue Button
    await ngoProfilePage.clickSaveAndContinueButton();

    // Assert the profile form was successful
    await ngoProfilePage.assertProfileFormIsSuccessful();

})
const { test, chromium } = require('@playwright/test');
const { POManager } = require('../pageObject/POManager')
const profileDataset = JSON.parse(JSON.stringify(require('../testData/validRegProfileTestData.json')));
const bankDataset = JSON.parse(JSON.stringify(require('../testData/validRegBankTestData.json')));
const docDataset = JSON.parse(JSON.stringify(require('../testData/validRegDocumentTestData.json')));
const ownerDataset = JSON.parse(JSON.stringify(require('../testData/validRegOwnerTestData.json')));
const regLogin = JSON.parse(JSON.stringify(require('../testData/regMerchantLoginData.json')));


test("Registered Business Compliance", async ({ browser }) => {
    browser = await chromium.launch({headless:false});
    const page = await browser.newPage();
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const regProfilePage = poManager.getRegProfilePage();
    const regBankPage = poManager.getRegBankPage();
    const regDocPage = poManager.getRegDocumentPage();
    const regOwnerPage = poManager.getRegOwnerPage();


    // Login into the application
    await loginPage.goTo();
    await loginPage.login(regLogin[0].email, regLogin[0].password);

    // Profile Form
    // Click Compliance Button
    await regProfilePage.clickComplianceButton();

    // click NGO Check Box
    await regProfilePage.clickRegCheckBox();

    // Click Continue Button
    await regProfilePage.clickContinueButton();

    // Fill the owner form
    await regProfilePage.fillNGOProfileForm(profileDataset[0].filePath, profileDataset[0].bizName, profileDataset[0].bizEmail,
        profileDataset[0].website, profileDataset[0].instagram, profileDataset[0].facebook, profileDataset[0].twitter);

    // Click Save and Continue Button
    await regProfilePage.clickSaveAndContinueButton();

    // Assert the profile form was successful
    await regProfilePage.assertProfileFormIsSuccessful();
    
    // Bank Form
    // Select Bank
    await regBankPage.selectBank(bankDataset[0].bank);

    // Enter Bank Account Number
    await regBankPage.enterBankAccountNumber(bankDataset[0].bankActNumber);

    // Enter BVN
    await regBankPage.enterBVN(bankDataset[0].bvn);

    // Upload Bank Statement
    await regBankPage.uploadBankStatement(bankDataset[0].bankStatement)

    // Click Save and Continue Button
    await regBankPage.clcikSaveAndContinueButton();

    // Assert the Bank Form was Successfull
    await regBankPage.assertBankFormIsSuccessful();
    
    // Document Form
    // Enter CAC Number
    await regDocPage.enterCACNumber(docDataset[0].CACNumber);

    // Upload CAC Certificate
    await regDocPage.uploadCACCertificate(docDataset[0].CACCertificate);

    // Enter TIN Number
    await regDocPage.EnterTINNumber(docDataset[0].TINNumber);

    // upload Proof of Address Document
    await regDocPage.uploadAddressDocument(docDataset[0].proofOfAddress);

    // Upload Status Report Document
    await regDocPage.uploadCACStatusDocument(docDataset[0].statusReport);

    // Select Politically Exposed Persons
    await regDocPage.selectPEP(docDataset[0].PEP);

    // Upload Special Control Unit against Money Laundering Document
    await regDocPage.uplaodSCUMLDocument(docDataset[0].SCUMLDocument);

    // Click Complete Setup Button
    await regDocPage.clickCompleteButton();

    // Aseert Document is successful
    await regDocPage.assertDocumnentFormIsSuccessful();
    
    // Owner Form
    // Enter Director Full Name
    await regOwnerPage.enterDirectorFullName(ownerDataset[0].fullName);

    // Enter Director DOB
    await regOwnerPage.enterDirectorDOB(ownerDataset[0].DOB);

    // Enter Director BVN Number
    await regOwnerPage.enterDirectorBVNNumber(ownerDataset[0].BVNNumber);

    // Enter Director NIN Number
    await regOwnerPage.enterDirectorNINNumber(ownerDataset[0].NINNumber);

    // Upload Director NIN Document
    await regOwnerPage.uploadDirectorNINDocument(ownerDataset[0].NINDocument)
    // await page.pause();

    // Enter Shareholder Full Name
    await regOwnerPage.enterShareholderFullName(ownerDataset[0].fullName1)

    // Enter Shareholder DOB
    await regOwnerPage.enterShareholderDOB(ownerDataset[0].DOB1);

    // Enter Shareholder BVN Number
    await regOwnerPage.enterShareholderBVNNumber(ownerDataset[0].BVNNumber1);

    // Enter Shareholder NIN Number
    await regOwnerPage.enterShareholderNINNumber(ownerDataset[0].NINNumber1);

    // Upload Shareholder NIN Document
    await regOwnerPage.uploadShareholderNINDocument(ownerDataset[0].NINDocument1)

    // Click Complete Setup Button
    await regOwnerPage.clickCompleteSetupButton();

    // Stark KYC
    await regOwnerPage.clickStartKYCButton();

    // Assert KYC Started Successfully
    await regOwnerPage.assertKYCStartedSuccessfully();

})
const { test, chromium } = require('@playwright/test');
const { POManager } = require('../pageObject/POManager')
const profileDataset = JSON.parse(JSON.stringify(require('../testData/validNGOProfileTestData.json')));
const bankDataset = JSON.parse(JSON.stringify(require('../testData/validNGOBankTestData.json')));
const docDataset = JSON.parse(JSON.stringify(require('../testData/validNGODocumentTestData.json')));
const ownerDataset = JSON.parse(JSON.stringify(require('../testData/validNGOOwnerTestData.json')));
const ngoLogin = JSON.parse(JSON.stringify(require('../testData/ngoMerchantLoginData.json')));



test("NGO Business Compliance", async ({ browser }) => {
    browser = await chromium.launch({headless:false});
    const page = await browser.newPage();
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const ngoProfilePage = poManager.getNGOProfilePage();
    const ngoBankPage = poManager.getNGOBankPage();
    const ngoDocPage = poManager.getNGODocumentPage();
    const ngoOwnerPage = poManager.getNGOOwnerPage()


    // Login into the application
    await loginPage.goTo();
    await loginPage.login(ngoLogin[0].email, ngoLogin[0].password);

    // Click Compliance Button
    await ngoProfilePage.clickComplianceButton();

    // click NGO Check Box
    await ngoProfilePage.clickNGOCheckBox();

    // Click Continue Button
    await ngoProfilePage.clickContinueButton();

    // Fill the owner form
    await ngoProfilePage.fillNGOProfileForm(profileDataset[0].filePath, profileDataset[0].bizName, profileDataset[0].bizEmail,
        profileDataset[0].website, profileDataset[0].instagram, profileDataset[0].facebook, profileDataset[0].twitter);

    // Click Save and Continue Button
    await ngoProfilePage.clickSaveAndContinueButton();

    // Assert the profile form was successful
    await ngoProfilePage.assertProfileFormIsSuccessful();

    // Fill Bank Form
    // Select Bank
    await ngoBankPage.selectBank(bankDataset[0].bank);

    // Enter Bank Account Number
    await ngoBankPage.enterBankAccountNumber(bankDataset[0].bankActNumber);

    // Enter BVN
    await ngoBankPage.enterBVN(bankDataset[0].bvn);

    // Upload Bank Account Statement
    await ngoBankPage.uploadBankStatement(bankDataset[0].bankStatment);

    // Click Save and Continue Button
    await ngoBankPage.clcikSaveAndContinueButton();

    // Assert the Bank Form was Successfull
    await ngoBankPage.assertBankFormIsSuccessful();

    // Fill Document Form
    // Enter CAC Number
    await ngoDocPage.enterCACNumber(docDataset[0].CACNumber);

    // Upload CAC Certificate
    await ngoDocPage.uploadCACCertificate(docDataset[0].CACCertificate);

    // Enter TIN Number
    await ngoDocPage.enterTINNumber(docDataset[0].TINNumber);

    // Upload Constitution Document
    await ngoDocPage.uploadConstitutionDocument(docDataset[0].ConstitutionDocument);

    // Upload Business Sales Document
    await ngoDocPage.uploadAddressDocument(docDataset[0].addressDocument);

    // Click Complete Setup Button
    await ngoDocPage.clickCompleteButton();

    // Aseert Document is successful
    await ngoDocPage.assertDocumnentFormIsSuccessful();

    
    // Enter Director Full Name
    await ngoOwnerPage.enterDirectorFullName(ownerDataset[0].fullName);

    // Enter Director DOB
    await ngoOwnerPage.enterDirectorDOB(ownerDataset[0].DOB);

    // Enter Director BVN Number
    await ngoOwnerPage.enterDirectorBVNNumber(ownerDataset[0].BVNNumber);

    // Enter Director NIN Number
    await ngoOwnerPage.enterDirectorNINNumber(ownerDataset[0].NINNumber);

    // Upload Director NIN Document
    await ngoOwnerPage.uploadDirectorNINDocument(ownerDataset[0].NINDocument)
    // await page.pause();

    // Enter Secretary Full Name
    await ngoOwnerPage.enterSecretaryFullName(ownerDataset[0].fullName1)

    // Enter Secretary DOB
    await ngoOwnerPage.enterSecretaryDOB(ownerDataset[0].DOB1);

    // Enter Secretary BVN Number
    await ngoOwnerPage.enterSecretaryBVNNumber(ownerDataset[0].BVNNumber1);

    // Enter Secretary NIN Number
    await ngoOwnerPage.enterSecretaryNINNumber(ownerDataset[0].NINNumber1);

    // Upload Secretary NIN Document
    await ngoOwnerPage.uploadSecretaryNINDocument(ownerDataset[0].NINDocument1)

    // Click Complete Setup Button
    await ngoOwnerPage.clickCompleteSetupButton();

    // Stark KYC
    await ngoOwnerPage.clickStartKYCButton();

    // Assert KYC Started Successfully
    await ngoOwnerPage.assertKYCStartedSuccessfully();

    // // Enter First Name
    // await ngoOwnerPage.enterFirstName(ownerDataset[0].firstName);

    // // Enter Last Name
    // await ngoOwnerPage.enterLastName(ownerDataset[0].lastName);

    // // Select Document Type
    // await ngoOwnerPage.selectDocumnetType(ownerDataset[0].documentType);

    // // Enter DOB
    // await ngoOwnerPage.enterDOB(ownerDataset[0].DOB);

    // // Enter Document Number
    // await ngoOwnerPage.enterIdentificationNumber(ownerDataset[0].identificationNumber);

    // // Upload Identification Document
    // await ngoOwnerPage.uploadIdentificationDocument(ownerDataset[0].identificationDocument)
    // // await page.pause();

    // // Upload Business Document
    // await ngoOwnerPage.uploadBusinessDocument(ownerDataset[0].businessDocument);

    // // Click Complete Setup Button
    // await ngoOwnerPage.clickCompleteSetupButton();

    // // Stark KYC
    // await ngoOwnerPage.clickStartKYCButton();

    // // Assert KYC Started Successfully
    // await ngoOwnerPage.assertKYCStartedSuccessfully();
})
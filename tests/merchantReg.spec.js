const { test } = require('@playwright/test');
const { POManager } = require('../pageObject/POManager');
const { faker } = require('@faker-js/faker');
const dataset = JSON.parse(JSON.stringify(require('../testData/invalidRegTestData.json')));
const ENV = require('../utils/env')
const MailosaurHelper = require('./helper/mailosaur-helper');



// const randonFirstName = faker.person.firstName();
ENV.FIRSTNAME = faker.person.firstName();
ENV.LASTNAME = faker.person.firstName();

// Generate a random 11-digit number
const number = faker.string.numeric(8);
const phoneNumber = '080' + number;

const password = "Qwerty12@";
const confirmPassword = "Qwerty12@";

test.describe.configure({ mode: "parallel" })

test("Valid Registration Test", async ({ page }) => {
    let mailosaur;
    let testEmail;

    try {
        // Initialize Mailosaur helper
        mailosaur = new MailosaurHelper();
        testEmail = mailosaur.generateTestEmail(`reg-${ENV.FIRSTNAME.toLowerCase()}`);

        console.log('🧪 Generated Test Email:', testEmail);
        ENV.REGEMAIL = testEmail;

    } catch (error) {
        console.error('❌ Mailosaur setup failed:', error.message);
        throw error;
    }

    const poManager = new POManager(page)
    const regPage = poManager.getRegistrationPage();

    // Step 1: Navigate to the Registration URL
    await regPage.goTo();

    // Step 2: Fill Registration Form
    await regPage.enterFirstName(ENV.FIRSTNAME);
    await regPage.enterLastName(ENV.LASTNAME);
    await regPage.enterEmail(ENV.REGEMAIL);
    await regPage.enterPhoneNumber(phoneNumber);
    await regPage.selectState(ENV.STATE);
    await regPage.selectCity(ENV.CITY);
    await regPage.enterPassword(password);
    await regPage.enterConfirmPassword(confirmPassword);
    await regPage.clickContinueButton();

    console.log('🔄 Registration form submitted, waiting for OTP email...');

    // Step 3: Wait for the email
    const otpEmail = await mailosaur.waitForEmail(testEmail, 90000); // 90 seconds timeout

    // Step 4: Extract OTP code from the email object
    const otpFromEmail = mailosaur.extractCodeFromEmail(otpEmail);
    console.log('🔢 Extracted OTP:', otpFromEmail);

    if (!otpFromEmail) {
        throw new Error('OTP code not found in email');
    }

    // Step 5: Enter the OTP
    await regPage.enterOTPCode(otpFromEmail);

    // Step 6: Click Verify email button
    await regPage.clickVerifyEmail();

    // Step 7: Assertain Registration was successful
    await regPage.assertRegistrationIsSuccessfully();

    console.log('✅ Registration with OTP completed successfully');

    // await page.pause();
    // await regPage.fillRegForm(ENV.FIRSTNAME, ENV.LASTNAME, ENV.REGEMAIL, phoneNumber, password, confirmPassword);


    // Assert the password is successful
    // await regPage.assertRegistrationIsSuccessfully()
})

// for (const data of dataset) {
//     test.only(`${data.Scenerio}: Invalid Registration Test`, async ({ page }) => {

//         const poManager = new POManager(page)
//         const regPage = poManager.getRegistrationPage();

//         //Navigate to the Registration URL
//         await regPage.goTo();

//         // Enter Regustration Details
//         // await page.pause();
//         await regPage.fillRegForm(data.firstName, data.lastName, data.email, data.number, data.password, data.confirmPassword);

//         // Assert the password is successful
//         await regPage.assertRegistrationIsNotSuccessfully()
//     })
// }
const { test } = require('@playwright/test');
const { POManager } = require('../pageObject/POManager');
const { faker } = require('@faker-js/faker');
const dataset = JSON.parse(JSON.stringify(require('../testData/invalidRegTestData.json')));
const ENV = require('../utils/env')



// const randonFirstName = faker.person.firstName();
ENV.FIRSTNAME = faker.person.firstName();
ENV.LASTNAME = faker.person.firstName();
// const randomLastName = faker.person.lastName();
// const domain = "gmail.com"
// const randomEmail = `${randonFirstName.toLowerCase()}.${randomLastName.toLowerCase()}@${domain}`;
// ENV.REGEMAIL = `${ENV.FIRSTNAME.toLowerCase()}.${ENV.LASTNAME.toLowerCase()}@${domain}`;
// const randomEmail = 'fish@gmail.com';



// Generate a random 11-digit number
const number = faker.string.numeric(8);
const phoneNumber = '080' + number;

const password = "Qwerty12@";
const confirmPassword = "Qwerty12@";



test.describe.configure({ mode: "parallel" })
test("Valid Registration Test", async ({ page }) => {

    const poManager = new POManager(page)
    const regPage = poManager.getRegistrationPage();

    //Navigate to the Registration URL
    await regPage.goTo();

    // Enter Registration Details
    // await page.pause();
    await regPage.fillRegForm(ENV.FIRSTNAME, ENV.LASTNAME, ENV.REGEMAIL, phoneNumber, password, confirmPassword);

    // Assert the password is successful
    await regPage.assertRegistrationIsSuccessfully()
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
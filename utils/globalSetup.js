// const { FullConfig } = require('@playwright/test');

// const dotenv = require('dotenv');

// async function globalSetup(FullConfig){

//     if(process.env.test_env){
//         dotenv.config({
//             path: `tests/helper/env/.env.${process.env.test_env}`,
//             override: true
//         })
//     }
// }

const dotenv = require('dotenv');

async function globalSetup() {  // Remove FullConfig parameter as it's not used
    if(process.env.test_env) {
        dotenv.config({
            path: `tests/helper/env/.env.${process.env.test_env}`,  // Simplified path
            override: true
        })
    } else {
        // Load default .env if no specific environment is specified
        dotenv.config({
            path: '.env.test',  // Use your env.test file
            override: true
        })
    }
}

module.exports = globalSetup;
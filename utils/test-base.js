const base = require('@playwright/test');


exports.validTest = base.test.extend
(
    {
        testData :  {

            "email": "keneth.roderick@forkshape.com",
            "password": "BoBolets9%",
        }
    }

)
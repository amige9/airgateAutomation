const {merchantLogin} = require('../artillery/commands/merchantLogin');

async function loginArtilleryScript(page, vuContext, events, test){

    // output current metrics - incrementing a custom counters
    events.emit("counter", `user.${vuContext.scenario.name}.page_loads`, 1);

    await test.step("Merchant Login", async() =>{
        await merchantLogin(page);
    })

    // await test.step("Second Step", async() =>{
    //     await merchantLogin(page);
    // })

  
}

module.exports = {loginArtilleryScript};


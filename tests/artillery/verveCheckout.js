const { verveCheckout} = require('../artillery/commands/verveCheckout');


async function verveCheckoutArtilleryScript(page){

    await verveCheckout(page)
}

module.exports = {verveCheckoutArtilleryScript};
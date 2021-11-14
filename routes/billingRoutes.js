const keys = require('../config/keys')
const requireLogin = require('../middleware/requireLogin') //  this is a middleware to check if user is logged in or not
const stripe = require('stripe')(keys.stripeSecretKey)
module.exports = (app) => {
  // to check if user is logged in or not we passes a middleware because we don't want user to go to /api/stripe when they are not logged in
  app.post('/api/stripe', requireLogin, async (req, res) => {
//    using try catch other wise it was giving errors
    try {
        await stripe.charges.create({
            amount: 500,
            currency: 'inr',
            description: '5$ for 5 credits',
            source: req.body.id, // token is in the body of req object
          })
    } catch (error) {
        console.log(error);
    }

    // req.user is the reference to the user model
    req.user.credits += 5
    const user = await req.user.save()
    res.send(user)
  })
}

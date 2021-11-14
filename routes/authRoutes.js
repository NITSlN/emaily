const passport = require('passport')


// exporting a function
module.exports = (app) => {
  // here 'google' in passport tells to use the strategy defined above internally
  // This route ask user permission and is sent to /auth/google/callback with code as query parameter
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    }),
  )

  app.get('/auth/google/callback', passport.authenticate('google'),(req,res)=>{
    res.redirect('/surveys')
  })

  app.get('/api/logout',(req,res)=>{
    req.logout() // added by passport
    res.redirect('/surveys') // will be undefined
  })

  app.get('/api/user',(req,res)=>{
    res.send(req.user) // paaport adds the user to the req object as req.user
  })
 
}

// flow whenever req comes in when user is logged in ( have cookie)
// 1. Request comes in
// 2. passport extracts the cookie data
// 3. passport pulls user id from the cookie data
// 4. deserialize user to find user from the id
// 5. User model (user) is added to req object as user

// flow whenever user logs in 
// 1. request comes in to log in with user data
// 2. we check if user is already a existing user
// 3. we pass user to done(null, user)
// 4. this user is passes to serialize function which serialize user and set cookie
// 5.Whenever a request is made then this cookie is added to the request and deserialize function uses this token to find the user
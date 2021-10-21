const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('../config/keys')
const mongoose = require('mongoose')
const User = mongoose.model('users')

//here user is the same user we just pulled out of database below in GoogleStrategy using the done function. It is the same user, that we passes in as the second argument
passport.serializeUser((user, done) => {
  done(null, user.id) //  here we are using id provided by mongo because not every one will use google if we setup another method to sign in
})

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true, // to make it https://...
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id })
      
      if (!existingUser) {
        //  saving to database
        const user = new User({ googleId: profile.id }).save()
        return done(null, user)
      }
      
      done(null, existingUser) // done take 2 args first is for error and second is for when everything worked fine
      
    },
  ),
)

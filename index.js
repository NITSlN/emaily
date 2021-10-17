const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session') // we need this to tell express to use cookies
const passport = require('passport'); 
const keys = require('./config/keys')

require('./models/User')
require('./services/passport') // we need the whole code
const app = express()

//Telling express to use cookie
app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,// expiration time of cookie in millisec. Here, we are setting it to 30 days
        keys:[keys.cookieKey] //  automatically encrypted
    })
)

// Telling  passport to use cookie
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(keys.mongoURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('connection successfull');
}).catch((err)=>{
    console.log(err.message);
})


require('./routes/authRoutes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT)

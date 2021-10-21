const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session') // we need this to tell express to use cookies
const passport = require('passport'); 
const bodyParser = require('body-parser')
const keys = require('./config/keys')

require('./models/User')
require('./services/passport') // we need the whole code
const app = express()


// app.use(bodyParser.json()) // whenever post/put/patch comes into the body then body parser parse the incoming request and assign to req.body property of req object
//Telling express to use cookie

//replacement of body parser cuz it is built in

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

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
require('./routes/billingRoutes')(app)

// configuring for production
// React has different routes and express has different routes ex - /api/stripe and /surveys
// but in production if express is asked to show /surveys it don't know it
// therefore we need to configure express to what to show when asked for unknown routes
if(process.env.NODE_ENV==='production'){

    // if browser is aking for some file this is express telling the browser to search here first
    app.use(express.static('client/build'))

    // if browser is not asking for anyfile but a route then come here
    // if it is not a file then it will serve the react(client side) ex- 
    const path = require('path')
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT)

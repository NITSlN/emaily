const mongoose = require('mongoose')
const { Schema } = mongoose

const recipientSchema = new Schema({
    email:String,
    responded:{
        type:Boolean,
        default:false // this is to avoid multiple responses from the same user
    }
})

module.exports = recipientSchema

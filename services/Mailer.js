// sendgrid are easy to get started with, FREE(mostly others are not), rules are flexible
// alternate is mailchimp but nearly all will have same type of code
const sendgrid = require('sendgrid')
const helper = sendgrid.mail
const keys= require('../config/keys')

class Mailer extends helper.Mail{
    constructor({ subject , recipients },content){
        super()

        this.sgApi = sendgrid(keys.sendGridKey) // with this we can communicate to the sendGrid api
        // this are specific to sendgrid
        this.from_email=new helper.Email('dontreplytothisemail7@gmail.com')
        this.subject= subject
        this.body = new helper.Content('text/html',content)
        this.recipients=this.formatAddresses(recipients)


        this.addContent(this.body)
        this.addClickTracking() // to track what each user's answer
        this.addRecipients()
    }

    formatAddresses(recipients){
        return recipients.map(({email})=>{
            return new helper.Email(email) // give array of emails
        })
    }

    // documents say to just write this it will work not much exlplanation
    addClickTracking(){
        const trackingSettings = new helper.TrackingSettings()
        const clickTracking = new helper.ClickTracking(true,true)

        trackingSettings.setClickTracking(clickTracking)
        this.addTrackingSettings(trackingSettings)
    }

    // documents say to just write this it will work not much exlplanation
    addRecipients(){
        const personalize = new helper.Personalization()

        this.recipients.forEach(recipient=>{
            personalize.addTo(recipient)
        })
        this.addPersonalization(personalize)
    }
    async send() {
        const request = this.sgApi.emptyRequest({
            method:'POST',
            path:'/v3/mail/send',
            body:this.toJSON() // converting it to json
        })
        const respose = await this.sgApi.API(request) // sending it to send grid
        return respose
    }
}

module.exports = Mailer

// What does mailer do?
// Ans. It takes data and templaes and then convert it to json and then send it sendgrid





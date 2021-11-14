const _ = require('lodash')
const { Path } = require('path-parser')
const { URL } = require('url')
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const requireCredits = require('../middleware/requireCredits')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')
const Survey = mongoose.model('surveys') // we are not importing Survey.js because of we might get error of importing model multiple time in the index.js

module.exports = (app) => {

  app.get('/api/surveys',requireLogin, async (req,res)=>{
    const surveys = await Survey.find({_user:req.user.id}).select({recipients:false});
    res.send(surveys)
  })




  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('<h1>Thanks for Your Feedback</h1>')
  })


  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice')

    _.chain(req.body)
      .map(({ email, url }) => {
        if (email === 'example@test.com') return;
        const match = p.test(new URL(url).pathname)
        if (match) {
          console.log({ email, surveyId: match.surveyId, choice: match.choice });
          return { email, surveyId: match.surveyId, choice: match.choice }
        }
      })
      .compact()
      .uniqBy( 'email', 'surveyId')
      .each(({ email, surveyId, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec()
      })
      .value()

    res.send({})
  })

  // arguments here are executed in sequence therefore requireLogin comes before requireCredits

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body
    //here recipients is a string of emails seperated by ','

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(',')
        .map((email) => ({ email: email.trim() })), //here are separating the string of emails and returning object with property of email
      _user: req.user.id,
      dateSent: Date.now(),
    })

    const mailer = new Mailer(survey, surveyTemplate(survey)) // first argument is data, second is how we want it to look like
    try {
      await mailer.send()

      await survey.save() // saving to the survey database
      req.user.credits -= 1
      const user = await req.user.save()

      res.send(user)
    } catch (error) {
      res.status(422) //  422: unprocessable entity (wrong data)
    }
  })
}

import express from 'express'
import bodyParser from 'body-parser'
import logger from 'morgan'
import cors from 'cors'
import secrets from './secrets'
import sessions from 'client-sessions'
import uuid from 'uuid'
import { twitter } from './twitterValidation'

const app = express()
const PORT = process.env.API_PORT || 8181
let _secret
let _token
let _accessToken, _accessTokenSecret

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(cors())

app.use(sessions({
  cookieName: 'twitterData',
  secret: secrets.superSecret,
  duration: 20 * 60 * 1000,
  activeDuration: 1000 * 20,
}))

// Routes

app.get('/', (req, res) => {
  res.json({ message: 'oh hai' })
})

app.get('/auth', (req, res) => {
  twitter.getRequestToken((err, requestToken, requestSecret) => {
    if (err) res.status(500).send(err)
    else {
      _secret = requestSecret
      _token = requestToken
      res.redirect(twitter.getAuthUrl(requestToken))
    }
  })
})

app.get('/twitter/callback', function(req, res) {
  twitter.getAccessToken(_token, _secret, req.query.oauth_verifier, function(err, accessToken, accessTokenSecret, results) {
    if (err) throw err
    else {
      twitter.verifyCredentials(accessToken, accessTokenSecret, {}, function(err, data, resp) {
        if (err) throw err
        req.twitterData.accessToken = accessToken
        req.twitterData.accessTokenSecret = accessTokenSecret
      res.redirect('/timeline')
      })
    }
  })
})

app.get('/timeline.json', function(req,res) {
  twitter.getTimeline('home', { limit: 20 }, req.twitterData.accessToken, req.twitterData.accessTokenSecret, function(err, data, response) {
    res.json({ timeline: data })
  })
  console.log(req.twitterData)
})

app.listen(PORT, () => console.log(`App running on port ${ PORT }`))

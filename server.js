import express from 'express'
import bodyParser from 'body-parser'
import logger from 'morgan'
import secrets from './secrets'
import { twitter } from './twitterValidation'

const app = express()
const PORT = process.env.API_PORT || 8181
let _secret
let _token
let _accessToken, _accessTokenSecret

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))

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
      twitter.access_token_key = accessToken
      twitter.access_token_secret = accessTokenSecret
      res.redirect('/timeline')
    }
  })
})

app.get('/timeline', function(req,res) {
  let key = twitter.access_token_key
  let secret = twitter.access_token_secret
  twitter.verifyCredentials(key, secret, {}, function(err, data, resp) {
    if (err) console.log(`Something terrible happened with the access token stuff specifically: ${ JSON.stringify(err) }`)
    else {
      twitter.getTimeline('home', { limit: 20 }, key, secret, function(err, data, response) {
        res.json({ userTimeline: data})
      })
    }
  })
})

app.listen(PORT, () => console.log(`App running on port ${ PORT }`))

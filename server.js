import express from 'express'
import bodyParser from 'body-parser'
import logger from 'morgan'
import Twitter from 'node-twitter-api'
import secrets from './secrets'
// import twitter from './twitterValidation'

const app = express()
const PORT = process.env.API_PORT || 8181

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))

// Twitter auth
const twitter = new Twitter({
  consumerKey: secrets.consumerKey,
  consumerSecret: secrets.consumerSecret,
  callback: secrets.callbackURL
})

let _secret;
let _token;



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
      // Get timeline.
      twitter.getTimeline('home', { count: 20 }, accessToken, accessTokenSecret, function(err, data) {
        if (err) console.log(err)
        else console.log(data)
      })
      res.json({ accessToken: accessToken, accessTokenSecret: accessTokenSecret })
    }
  })
})

app.listen(PORT, () => console.log(`App running on port ${ PORT }`))

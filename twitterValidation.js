import Twitter from 'node-twitter-api'
import secrets from './secrets'

module.exports = {
  const twitter = new Twitter({
    consumerKey: secrets.consumerKey,
    consumerSecret: secrets.consumerSecret,
    callback: secrets.callbackURL
  })
}

import Twitter from 'node-twitter-api'
import secrets from './secrets'

export const twitter = new Twitter({
  consumerKey: secrets.consumerKey,
  consumerSecret: secrets.consumerSecret,
  access_token_key: '',
  access_token_secret: '',
  callback: secrets.callbackURL,
  data: {}
})

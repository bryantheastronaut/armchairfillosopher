'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import secrets from './secrets';
import sessions from 'client-sessions';
import {twitter} from './twitterValidation';

const app = express();
const PORT = process.env.API_PORT || 8181;
let _secret;
let _token;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors());

app.use(sessions({
  cookieName: 'twitterData',
  secret: secrets.superSecret,
  duration: 20 * 60 * 1000,
  activeDuration: 1000 * 20
}));

// Routes

app.get('/auth', (req, res) => {
  twitter.getRequestToken((err, requestToken, requestSecret) => {
    if (err) res.status(500).send(err);
    else {
      _secret = requestSecret;
      _token = requestToken;
      res.redirect(twitter.getAuthUrl(requestToken));
    }
  });
});

app.get('/twitter/callback', function(req, res) {
  twitter.getAccessToken(_token, _secret, req.query.oauth_verifier,
    function(err, accessToken, accessTokenSecret, results) {
      if (err) throw err;
      else {
        twitter.verifyCredentials(
          accessToken,
          accessTokenSecret,
          {},
          function(err, data, resp) {
            if (err) throw err;
            else {
              req.twitterData.loggedIn = true;
              req.twitterData.accessToken = accessToken;
              req.twitterData.accessTokenSecret = accessTokenSecret;
            }
            res.redirect('http://localhost:5100/timeline');
          }
        );
      }
    });
});

app.get('/timeline.json', function(req, res) {
  twitter.getTimeline(
    'home', {limit: 20},
    req.twitterData.accessToken, req.twitterData.accessTokenSecret,
    function(err, data, response) {
      if (err) throw err;
      res.json({timeline: data});
    }
  );
});

app.listen(PORT, () => console.log(`App running on port ${PORT}`));

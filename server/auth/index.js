
'use strict';


var FantasySports = require('FantasySports');
FantasySports.options({
    "accessTokenUrl": "https://api.login.yahoo.com/oauth/v2/get_request_token",
    "requestTokenUrl": "https://api.login.yahoo.com/oauth/v2/get_token",
    "oauthKey": 'dj0yJmk9bXluWHZ1bXFoOGFDJmQ9WVdrOVlXSTBkVlZTTm1VbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yNA--',
    "oauthSecret": '568e13369b8c9bc7c2d8d3185dec8245755691a7',
    "version": "1.0",
    "callback": "http://giraffedraft.azurewebsites.net/auth/oauth/callback",
    "encryption": "HMAC-SHA1"
});

// app.get("/auth/oauth")
var oauth = function(req, res) {
    FantasySports.startAuth(req, res);
};

// app.get("/auth/oauth/callback")
var authorize = function(req, res) {
    FantasySports.endAuth(req, res);
};

var router = express.Router();


router.use('/oauth', oauth);
// router.use('/local', require('./local'));
router.use('/oauth/callback', authorize);

module.exports = router;
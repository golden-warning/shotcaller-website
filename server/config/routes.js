var path = require('path');
var picker = require('../picker/picker.js')
var fs = require('fs')
var cookieSession = require('cookie-session');

var FantasySports = require('FantasySports');

FantasySports.options({
    "accessTokenUrl": "https://api.login.yahoo.com/oauth/v2/get_request_token",
    "requestTokenUrl": "https://api.login.yahoo.com/oauth/v2/get_token",
    "oauthKey": 'dj0yJmk9bXluWHZ1bXFoOGFDJmQ9WVdrOVlXSTBkVlZTTm1VbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yNA--',
    "oauthSecret": '568e13369b8c9bc7c2d8d3185dec8245755691a7',
    "version": "1.0",
    "callback": "http://fantasyshotcaller.azurewebsites.net/auth/oauth/callback",
    "encryption": "HMAC-SHA1"
});

// app.get("/auth/oauth")
exports.oauth = function(req, res) {
    FantasySports.startAuth(req, res);
};

// app.get("/auth/oauth/callback")
exports.authorize = function(req, res) {
    FantasySports.endAuth(req, res);
};


exports.myTeams = function(req, res) {
    FantasySports
        .request(req, res)
        .api('http://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games;game_keys=nba/leagues?format=json')
        .done(function(data) {
            // var leagueData = data.fantasy_content.users[0].user[1].games[0].game[1].leagues 
            // var	leagues = [];

            // console.log(leagueData);

            // _.each(leagueData, function(value) {
            //     if (value.league) leagues.push(value.league[0]);
            // });
            res.json(data);
        });
};



module.exports = function (app, express) {
	app.use(cookieSession({ 
	    key: 'some key', 
	    secret: 'some secret', 
	    proxy: true 
	}));
	// Use the client folder as the root public folder.
	// This allows client/index.html to be used on the / route.
	app.use(express.static(__dirname + '/../../client'));

	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", '*');
		res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
		res.header("Access-Control-Allow-Headers",  'Content-Type');
		next();
	});

	// chrome extension hits this link to get info on all players
	app.get("/api/init", function (req, res) {

		fs.readFile(__dirname + "/../data/playerjson.txt", function(err,data){
			var data = data + ''
			var data = JSON.parse(data);
			res.send(data);
		})

	});

	app.get("/auth/oauth", exports.oauth);

	app.get("/auth/oauth/callback", exports.authorize);

	app.get("/myTeams", exports.myTeams);

	// hit this link for suggestions
	app.post("/api/suggest", function (req, res) {
		var data = '';
		req.on("data", function (stuff) {
			data += stuff;
		});

		req.on('end', function() {
			data = JSON.parse(data);
			console.log(data);
			var picks = picker.getPicks(data);
			res.send(JSON.stringify(picks));
		})
	});
};



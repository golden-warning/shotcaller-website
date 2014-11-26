var path = require('path');
var picker = require('../picker/picker.js')
var fs = require('fs')



var cookieSession = require('cookie-session');

var FantasySports = require('FantasySports');
FantasySports.options({
    "accessTokenUrl": "https://api.login.yahoo.com/oauth/v2/get_request_token",
    "requestTokenUrl": "https://api.login.yahoo.com/oauth/v2/get_token",
    "oauthKey": 'dj0yJmk9b1poSjE3YXpYNDFEJmQ9WVdrOVZGcE5kMWhsTldrbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD02Nw--',
    "oauthSecret": 'ea0c65ee1b71845d9f2995a305fc1f2191ec66b6',
    "version": "1.0",
    "callback": "http://shotcaller.azurewebsites.net/auth/oauth/callback",
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

//returns all info
exports.myInfo = function(req,res){
//promise chain
myteams.then(mymatchups).then

}

exports.myTeams = function(req, res) {
    FantasySports
        .request(req, res)
        .api('http://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games;game_keys=nba/leagues?format=json')
        .done(function(data) {
            console.log(data)
            var leagues = data.fantasy_content.users[0].user[1].games[0].game[1].leagues
            //_.each(leagueData, function(value) {
            //    if (value.league) leagues.push(value.league[0]);
            //});
            //console.log('leagues', leagues);
            res.json(leagues);
        });
};

exports.myMatchups = function(req, res) {
    FantasySports
        .request(req, res)
        .api('http://fantasysports.yahooapis.com/fantasy/v2/team/'+leagueID+'/matchups?format=json')
        .done(function(data) {
            var matchups = data.fantasy_content.team[1].matchups
            
            //_.each(leagueData, function(value) {
            //    if (value.league) leagues.push(value.league[0]);
            //});
            //console.log('leagues', leagues);
            res.json(matchups);
        });
};

exports.myUser = function(req, res) {
    FantasySports
        .request(req, res)
        .api('http://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1?format=json')
        .done(function(data) {
            //var leagueData = data.fantasy_content.users[0].user[1].games[0].game[1].leagues

            //_.each(leagueData, function(value) {
            //    if (value.league) leagues.push(value.league[0]);
            //});
            //console.log('leagues', leagues);
            res.json(data);
        });
};

exports.myLeagueTeams = function(req, res) {
    FantasySports
        .request(req, res)
        .api('http://fantasysports.yahooapis.com/fantasy/v2/league/342.l.91924/teams?format=json')
        .done(function(data) {
            //var leagueData = data.fantasy_content.users[0].user[1].games[0].game[1].leagues

            //_.each(leagueData, function(value) {
            //    if (value.league) leagues.push(value.league[0]);
            //});
            //console.log('leagues', leagues);
            res.json(data);
        });
};

exports.myStandings = function(req, res) {
    FantasySports
        .request(req, res)
        .api('http://fantasysports.yahooapis.com/fantasy/v2/league/342.l.91924/standings?format=json')
        .done(function(data) {
            //var leagueData = data.fantasy_content.users[0].user[1].games[0].game[1].leagues
            var standings = data.fantasy_content.league[1].standings[0].teams;
            //    if (value.league) leagues.push(value.league[0]);
            //});
            //console.log('leagues', leagues);
            res.json(standings);
        });
};

exports.myTeam = function(req, res) {
    FantasySports
        .request(req, res)
        .api('http://fantasysports.yahooapis.com/fantasy/v2/team/342.l.91924.t.5?format=json')
        .done(function(data) {
            //var leagueData = data.fantasy_content.users[0].user[1].games[0].game[1].leagues
            var league;
        console.log('standings6',data.fantasy_content.league);
        console.log('standings7',data.fantasy_content.league);
        console.log('standings8',data.fantasy_content.league);
            //_.each(leagueData, function(value) {
            //    if (value.league) leagues.push(value.league[0]);
            //});
            //console.log('leagues', leagues);
            res.json(data);
        });
};

module.exports = function (app, express) {
    app.use(cookieSession({ 
        key: 'asdf', 
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


    // app.use('/auth', require('./auth/index.js'));
    // app.use('/api', require('./auth/index.js'));

    app.get("/auth/oauth", exports.oauth);

    app.get("/auth/oauth/callback", exports.authorize);
    
    app.get("/myteams", exports.myTeams);
    
    app.get("/mymatchups", exports.myMatchups);
    
    app.get("/mystandings", exports.myStandings);
    
    app.get("/myteam", exports.myTeam);
    
    app.get("/myuser", exports.myUser);
    
    app.get("/myleagueteams", exports.myLeagueTeams);

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
require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
//Incorporating the reqest npm packages
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var request = require("request");

//Getting access keys and tokens.
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


//stores the argument
var nodeArgv = process.argv;
var command = process.argv[2];
//movie or song stored in this string
var x = "";

for (var i=3; i< nodeArgv.length; i++) {
    if(i>3 && i< nodeArgv.length){
        x = x + "+" + nodeArgv[i];
    } else {
        x = x + nodeArgv[i];
    }
}

//calling function from below with a switch statement
switch(command){
    case "my-tweets":
      showTweets();
    break;
  
    case "spotify-this-song":
      if(x){
        spotifySong(x);
      } else{
        spotifySong("I want it that way");
      }
    break;
  
    case "movie-this":
      if(x){
        omdbData(x)
        ombdData();
      } else{
        omdbData("Mr. Nobody")
      }
    break;
  
    case "do-what-it-says":
      thisThing();
    break;
  
    default:
      console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
    break;
  }
//function to display song data
function spotifySong(song) {
    spotify.search({type: 'track', query: song}, function(err, data) {
        if(!err) {
            console.log("Artist: " + data.artist);
            console.log("Song: " + data);
            console.log("Preview URL: " + data.preview_url);
            console.log("Album: " + data.album);
            fs.appendFile('log.txt', data.artists);
            fs.appendFile('log.txt', data);
            fs.appendFile('log.txt', data.preview_url);
            fs.appendFile('log.txt', data.album);
            fs.appendFile('log.txt', "-----------------------");
        } else {
            console.log("Error Error Error")
        }
    }) 
}

function showTweets () {
//displaying tweets
var screenName = {screen_name: 'sara32526716', count: 20 }
client.get('statuses/user_timeline', screenName, function (error, tweets, response){
    if (error) {
        console.log("Error Error Error") }
        for (var i = 0; i < tweets.length; i++){
            console.log("===========================");
            console.log(i + 1 + ". ", tweets[j].text)
            console.log("");
        } 
    })
}

function ombdData(movie) {
    var queryURL = "https://www.omdbapi.com/?t=" + liriArg + "&apikey=trilogy";
    //Request data from API

    request(queryURL, function (error, response, body){
        if(!error && response.statusCode == 200){
            var body = JSON.parse(body);

            console.log("Title: " + body.Title);
            console.log("Release Year: " + body.Year);
            console.log("IMdB Rating: " + body.imdbRating);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
            console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
            console.log("Rotten Tomatoes URL: " + body.tomatoURL);
            //logs text
            fs.appendFile('log.txt', "Title: " + body.Title);
            fs.appendFile('log.txt', "Release Year: " + body.Year);
            fs.appendFile('log.txt', "IMdB Rating: " + body.imdbRating);
            fs.appendFile('log.txt', "Country: " + body.Country);
            fs.appendFile('log.txt', "Language: " + body.Language);
            fs.appendFile('log.txt', "Plot: " + body.Plot);
            fs.appendFile('log.txt', "Actors: " + body.Actors);
            fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + body.tomatoRating);
            fs.appendFile('log.txt', "Rotten Tomatoes URL: " + body.tomatoURL);
        } else {
            console.log('Error, Error, Error')
        } if (movie === "Mr. Nobody") {
            console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netflix!");
            fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            fs.appendFile('log.txt', "It's on Netflix!");
        }
    });
}

function thisThing () {
    fs.readFile('random.txt', "utf8", function (error, data){
        var txt = data.split(',');
        spotifySong(txt[1]);
    });
}



#!/usr/bin/env node
var request = require('request');
var fs = require('fs');

var sys = require('sys');
var exec = require('child_process').exec;
var child;

// quote getter

request({
    uri: "http://quotes.rest/qod.json",
    method: "GET",
    json: true,
}, function(err, response, quoteJSON) {
    quote = quoteJSON.contents.quotes[0];

    line = quote.quote;
    author = quote.author;
    title = quote.title;
    background = quote.background;

    var greetText = "Here's the " + title.toLowerCase() + '\n    \"' + line.split("\r\n").join("\r\n    ") + '\"\n    ~ ' + author + "\n";

    fs.writeFile("/home/user/.qotd/qotd.txt", greetText, function(err) {
        if (err) throw err;
    });

    downloadBackground(background, setBackground);

});

function downloadBackground(picURI, callback) {
    exec("wget -O /home/user/Downloads/background.jpg " + picURI, function (error, stdout, stderr) {
        if (error !== null) {
          console.log('exec error: ' + error);
        }

        callback();
    });
}

function setBackground() {
    exec("gsettings set org.gnome.desktop.background picture-uri file:///home/user/Downloads/background.jpg", function (error, stdout, stderr) {
        if (error !== null) {
          console.log('exec error: ' + error);
        }
    });
}


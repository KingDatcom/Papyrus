/* 

    Papyrus.js
    Copyright (C) 2016 - Mitchell Ward

    This software may be modified and distributed under the terms
    of the MIT license.  See the LICENSE file for details.
    
*/

var DiscordClient = require('discord.io');
var bot = new DiscordClient({
    autorun: true,
    email: "",
    password: "",
    //OR
    token: "<TOKEN HERE>"
});

// Set the command prefix
var pf = "~"

bot.on('ready', function() {
    console.log(bot.username + " (" + bot.id + ") is ready, NYEH HEH HEH!");
});

bot.on('disconnected', function() {
    console.log(bot.username + " (" + bot.id + ") disconnected!");
    process.exit(1);
});

bot.on('message', function(user, userID, channelID, message, rawEvent) {
    // Ignore the bot's own messages
    if (userID === bot.id) {
        return;
    }
    
    // Set the variable replyID to mention a user
    var replyID = "<@" + userID + "> "
    
    // Reply to the user with "@<name> Pong!"
    if (message === pf + "ping") {
        bot.sendMessage({
            to: channelID,
            message: replyID + "Pong!"
        });
    }
    
    // Create an array of quotes
    var quoteArray = [
        '\"7/11 was a part-time job.\" -sirocyl', 
        '\"Ain\'t nothing like a good nut.\" -Sans-Serif',
        '\"I fucking hate you guys.\" -Acrone',
        '\"those were supposed to be swastikas lol.\" -shameless_inc',
        '\"we 64GB now boys.\" -ilifin',
        '\"fuckin\' icecream.\" -sirocyl',
        '\"I was disappointed.\" -Ace Trainer Jenn | キレイハナ',
        '\"yes it german.\" -Noroxus'
    ];
    
    // Store a random quote from the array in randQuote
    var randQuote = quoteArray[Math.floor(Math.random() * quoteArray.length)];
    
    // Send a random quote to the channel
    if (message === pf + "quote") {
        bot.sendMessage({
            to: channelID,
            message: randQuote
        });
    }
    
    // Reply to the user with the 3DS hacking guide
    if (message === pf + "guide") {
        bot.sendMessage({
            to: channelID,
            message: replyID + "https://github.com/Plailect/Guide/wiki: Follow the guide like a cultist trying to move up in the ranks."
        });
    }
    
    // Send a dank astronautlevel meme to the channel
    if (message === pf + "confusion") {
        bot.sendMessage({
            to: channelID,
            message: "http://i.imgur.com/Vrw63q2.png"
        });
    }
    
    // Send "F" to the channel
    if (message === "F") {
        bot.sendMessage({
            to: channelID,
            message: "F"
        });
    }
    
    // Reply to the user with Luma3DS builds
    if (message === pf + "builds") {
        bot.sendMessage({
            to: channelID,
            message: replyID + "Luma3DS builds: http://astronautlevel2.github.io/Luma3DS"
        });
    }
    
    // Send a Dank Frank meme to the channel
    if (message === pf + "stop") {
        bot.sendMessage({
            to: channelID,
            message: "https://www.youtube.com/watch?v=2k0SmqbBIpQ"
        });
    }
    
    // Send the list of commands to the channel
    if (message === pf + "help") {
        bot.sendMessage({
            to: channelID,
            message: "**Commands:** \n ~quote: Post a random quote \n ~ping: Pong! \n ~spaghetti: **SPAGHETTI!** \n ~guide: Post the 3DS hacking guide \n ~confusion: ??? \n ~builds: Post the link to Luma3DS builds \n ~stop: **IT'S TIME TO STOP.**"
        });
    }
    
    // SPAGHETTI!
    // Create an array of images
    var imageArray = [
        'http://i.imgur.com/wV7tKNq.png', 
        'http://i.imgur.com/DqPQPut.png',
        'http://i.imgur.com/8c2dAmS.png',
        'http://i.imgur.com/1xvKCfi.png',
        'http://i.imgur.com/5zoeT0F.png',
        'http://i.imgur.com/tLIOSUk.png',
        'http://i.imgur.com/PbiGatc.png',
        'http://66.media.tumblr.com/9ca00a9a785c3aa04ac52ba64099f1bd/tumblr_nyf006z5HP1ukilhso1_500.gif',
        'http://i.imgur.com/8MqpUDg.png',
        'http://i.imgur.com/939S8W9.jpg',
        'http://i.imgur.com/jUBHqAv.png',
    ];
    
    // Store a random image from the array in randImage
    var randImage = imageArray[Math.floor(Math.random() * imageArray.length)];
    
    // Reply to the user with SPAGHETTI!
    if (message === pf + "spaghetti") {
        bot.sendMessage({
            to: channelID,
            message: randImage
        });
    }
});

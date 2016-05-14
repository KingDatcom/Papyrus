/* 

    Papyrus.js
    Copyright (C) 2016 - Mitchell Ward

    This software may be modified and distributed under the terms
    of the MIT license.  See the LICENSE file for details.
    
*/

/*
    
    This bot is designed for the /r/3DShacks Discord server.
    As a result, most of the role-checking code is based around our role system.
    This system goes: Moderator --> OP --> SafeOP --> Owner
    The owner also has the SafeOP role. 
    Moderator only has the permission to kick.
    OP has the permission to kick and ban.
    SafeOP has almost full permissions, including modifying server settings.
    Every member of staff also has a "Staff" role.
    The kick command code is based on this role, as any member of staff has the ability to kick.
    This should be modifiable for your own role system, if required.

*/

// MUST-EDIT VARIABLES BEGIN HERE!

// ID of the server the bot is running on.
var servID = "<SERVER ID>"
// ID of the "Staff" role.
var staffID = "<STAFF ID>"
// ID of the "OP" role.
var opID = "<OP ID>"
// ID of the "SafeOP" role.
var safeOPID = "<SAFEOP ID>"
// You can retrieve the role IDs by turning on Debug mode below and looking at the console.

// MUST-EDIT VARIABLES END HERE!

// Debug mode: If this is set to 1, the list of roles with their permissions and IDs will be printed to the console.
var debugMode = 0

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
    if (debugMode === 1) {
        console.log(bot.servers[servID].roles);
    } else {
        return;
    }
});

bot.on('disconnected', function() {
    console.log(bot.username + " (" + bot.id + ") disconnected!");
    process.exit(1);
});

bot.on('message', function(user, userID, channelID, message, rawEvent) {
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
        '\"those were supposed to be swastikas lol.\" -shameless_inc'
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
            message: "**Commands:** \n ~quote: Post a random quote \n ~ping: Pong! \n ~spaghetti: **SPAGHETTI!** \n ~guide: Post the 3DS hacking guide \n ~confusion: ??? \n ~builds: Post the link to Luma3DS builds \n ~stop: **IT'S TIME TO STOP.** \n \n **Mod Commands:** \n ~ban: Bans a user \n ~kick: Kicks a user \n ~mute: Mutes a user in voice \n ~unmute: Unmutes a user in voice"
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
    if (message === pf + "spaghetti") {
        bot.sendMessage({
            to: channelID,
            message: randImage
        });
    }

    /*

        Here be moderation!
        Moderator commands begin after this line.

    */

    // Ban a user
    if (message.indexOf(pf + "ban ") === 0) {
        // Store the message in variable banID
        var banID = message
        var banID2 = message + "."
        // Slice the command and mention parts from the string. "~ban <@xxxxxxxxxxxxxxxxxx>" turns into "xxxxxxxxxxxxxxxxxx"
        banID = banID.slice(7,-1);
        banID2 = banID2.replace('~ban ','');
        // Check if the user has one of the correct roles, e.g OP or SafeOP
        if (bot.servers[servID].members[userID].roles.indexOf(safeOPID) > -1 || bot.servers[servID].members[userID].roles.indexOf(opID) > -1) {
            bot.ban({
                // Set the channel
                channel: channelID,
                // Give the banID variable to the target
                target: banID
            });
            console.log("Banned " + banID + "!");
            bot.sendMessage({
                to: channelID,
                message: "Banned " + banID2
            });
        // If the user doesn't have the correct role, notify them
        } else {
            bot.sendMessage({
                to: channelID,
                message: replyID + "You don't have permission!"
            });
        }
    }
    // Kick a user
    if (message.indexOf(pf + "kick ") === 0) {
        // Store the message in variable kickID
        var kickID = message
        var kickID2 = message + "."
        // Slice the command and mention parts from the string. "~kick <@xxxxxxxxxxxxxxxxxx>" turns into "xxxxxxxxxxxxxxxxxx"
        kickID = kickID.slice(8,-1);
        kickID2 = kickID2.replace('~kick ','');
        // Check if the user has the correct role, e.g Staff
        if (bot.servers[servID].members[userID].roles.indexOf(staffID) > -1) {
            bot.kick({
                // Set the channel
                channel: channelID,
                // Give the kickID variable to the target
                target: kickID
            });
            console.log("Kicked " + kickID + "!");
            bot.sendMessage({
                to: channelID,
                message: "Kicked " + kickID2
            });
        // If the user doesn't have the correct role, notify them
        } else {
            bot.sendMessage({
                to: channelID,
                message: replyID + "You don't have permission!"
            });
        }
    }
    // Mute a user
    if (message.indexOf(pf + "mute ") === 0) {
        // Store the message in variable muteID
        var muteID = message
        var muteID2 = message + "."
        // Slice the command and mention parts from the string. "~mute <@xxxxxxxxxxxxxxxxxx>" turns into "xxxxxxxxxxxxxxxxxx"
        muteID = muteID.slice(8,-1);
        muteID2 = muteID2.replace('~mute ','');
        // Check if the user has the correct role, e.g Staff
        if (bot.servers[servID].members[userID].roles.indexOf(staffID) > -1) {
            bot.mute({
                // Set the channel
                channel: channelID,
                // Give the kickID variable to the target
                target: muteID
            });
            console.log("Muted " + muteID + "!");
            bot.sendMessage({
                to: channelID,
                message: "Muted " + muteID2
            });
        // If the user doesn't have the correct role, notify them
        } else {
            bot.sendMessage({
                to: channelID,
                message: replyID + "You don't have permission!"
            });
        }
    }
    // Unmute a user
    if (message.indexOf(pf + "unmute ") === 0) {
        // Store the message in variable unmuteID
        var unmuteID = message
        var unmuteID2 = message + "."
        // Slice the command and mention parts from the string. "~unmute <@xxxxxxxxxxxxxxxxxx>" turns into "xxxxxxxxxxxxxxxxxx"
        unmuteID = unmuteID.slice(10,-1);
        unmuteID2 = unmuteID2.replace('~unmute ','');
        // Check if the user has the correct role, e.g Staff
        if (bot.servers[servID].members[userID].roles.indexOf(staffID) > -1) {
            bot.unmute({
                // Set the channel
                channel: channelID,
                // Give the unmuteID variable to the target
                target: unmuteID
            });
            console.log("Unmuted " + unmuteID + "!");
            bot.sendMessage({
                to: channelID,
                message: "Unmuted " + unmuteID2
            });
        // If the user doesn't have the correct role, notify them
        } else {
            bot.sendMessage({
                to: channelID,
                message: replyID + "You don't have permission!"
            });
        }
    }
});

# Papyrus
The boniest Discord bot around.

Running this bot requires Discord.io and Node.js.

You must set the oAuth token, roleIDs, and serverID in the JS file. This bot requires the following roles:
Staff: General staff role. Allows a user to kick.
Moderator: Allows kicking.
OP: Allows kick and banning.
SafeOP: Almost full permissions, including editing server settings.
The owner should also have the SafeOP role.

Find the roleIDs by setting the variable "debugMode" to 1 in the JS file.

Find the serverID by opening the channel in the browser Discord client, and copying the *first* number.

Command list:    
~help: Show a list of commands.    
~spaghetti: **SPAGHETTI!**    
~quote: Posts a random quote in the chat.    
~ping: Pong!    
~guide: Posts the 3DS hacking guide in the chat.    
~confusion: ???    
F: If you type "F" into chat, Papyrus will do so too!    
~builds: Posts the link to Luma3DS builds in the chat.    
~stop: Frank.    
~ban <@user>: Bans a user.    
~kick <@user>: Kicks a user.    
~mute <@user>: Mutes a user in voice.    
~unmute <@user>: Unmutes a user in voice.

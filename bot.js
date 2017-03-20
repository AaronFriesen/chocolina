try {
	var Discord = require('discord.js');
} catch (e) {
	console.log(e.stack);
	console.log(process.version);
	console.log("Looks like your libs are missing or wrong. Please run npm install and check for errors.");
	process.exit();
}
console.log("Starting Chocolina.\nNode version: " + process.version + "\nDiscord.js version: " + Discord.version);

try {
	var token = require('./auth.json').token;
} catch (e) {
	console.log("auth.json either missing or wrong. Please ensure auth.json has a token.");
	process.exit();
}

var commands = {
	"ping": {
		description: "responds with 'pong'. Used as a heartbeat command."
		process: function(bot, msg) {
			msg.channel.sendMessage(msg.author + " pong!");
		}
	}
}

var bot = new Discord.Client();

bot.on("ready", function () => {
	console.log("I'm Chocolina, super time-traveling salesgirl!");
	// TODO: Make command prefix arbitrary, help response, other servers?
	// bot.user.setGame("Try \'!help\'.")
});

bot.on("disconnected", function () {
	console.log("Disconnected!");
	process.exit(1);
});

function parseCommand(msg) {
	// UNFINISHED OH GOD OH GOD OH GOD
	// TODO: Make command prefix arbitrary.
	if ((msg.author.id != bot.user.id) && (msg.content.startsWith("!"))) {
		console.log(msg.author + " requested " + msg.content);
		// TODO: Make command prefix arbitrary
		var cmdTxt = msg.content.split(" ")[0].substring("!".length);
		var suffix = msg.content.substring(cmdTxt.length + "!".length + 1);
	}
}

bot.on('message', (msg) => {
	if (msg.content === 'ping') {
		msg.channel.sendMessage('pong');
	}
	if (msg.content === 'who?') {
		msg.channel.sendFile('images\\chocobocolina.gif');
	}
});

bot.login(token);
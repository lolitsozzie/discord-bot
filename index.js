/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const dotenv = require("dotenv");
dotenv.config();

const Discord = require("discord.js");
const client = new Discord.Client();


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
let TwilioClient = require("twilio")(accountSid, authToken);


const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = process.env.OPEN_WEATHER_KEY;

let axios = require("axios").default;



client.once("ready", () => {
	console.log("Ready!");
});

// eslint-disable-next-line no-undef
client.login(process.env.TOKEN);




function objectifyParams(message) {
	var command = message.content.substring(1, 6);
	var param = message.content.substring(6, message.content.length);
	var parameters_dict = {
		"param": param,
		"command": command
	};
	return parameters_dict;
}

client.on("message", message => {
	console.log(message.content);
	if (message.content.startsWith("$")) {
		var command = message.content.substring(1, 5);
		var parameters_object = objectifyParams(message);
		switch (command) {
		case "ping":
			message.channel.send("pong");
			break;
		case "test":
			message.channel.send(JSON.stringify(parameters_object, null, 4));
			break;
		case "weat":
			var city = parameters_object.param;
			var fullApiUrl  = `${API_URL}?q=${city}&appid=${API_KEY}`;
			try {
				axios
					.get(fullApiUrl)
					.then(response => {
						// Succesful weather fetch
						var temperatureK = response.data.main.temp;
						var humidity     = response.data.main.humidity;
						var cityName     = response.data.name;
						var temperatureF = (temperatureK * 9) / 5 - 459.67;
						message.channel.send(`weather for ${cityName}: 
🌡️: ${temperatureF}
💧(humidity): ${humidity}`);
						console.log(response);
					}, reason => {
						// Failure fetching weather api
						message.channel.send("failure fetching weather, check your city name");
						console.log(reason);	
					});
			} catch (exception) {
				console.log(exception);
			}
			
			break;
		case "text":
			try {
				TwilioClient.messages.create({
					body: parameters_object.param,
					from: "+12058922021",
					to: "+13363006989"
				}).then(response => {
					// Succesful sending of message
					console.log(response.sid);
					message.channel.send(parameters_object.param + " sent");
				}, reason => {
					// Failure texting
					console.log("Failure");
					message.channel.send("failed to text, reason: " + reason.message);
					console.log(reason);	
				});
				
			} catch (exception) {
				message.channel.send(exception);
			}
			break;
		case "help":
			message.channel.send(`npc bot usage:
>$ping: see if bot is alive
>$test <4-letter param>: returns jsonified version of command string
>$weat <city name>: returns current weather of a given city
>$text <message>: texts my phone
>$help: see this list of commands`);
			break;
		default:
			message.channel.send(`unknown command, commands are all four letters long:npc bot usage:
>$ping: see if bot is alive
>$test <4-letter param>: returns jsonified version of command string
>$weat <city name>: returns current weather of a given city
>$text <message>: texts my phone
>$help: see this list of commands`);
			break;
		}
	}
});
# NPC discord bot
## Description
This is a discord bot written to run on a discord server in a
docker container
## Cloning
Make an empty folder for the repository, and clone it. Once it has been cloned
change to the root directory and type the following commands
> Be sure to have node package manager installed before you begin the commands,
this is a well documented process that can easily be googled, "install npm"

1. `npm install`
2. Create a file with the name of `.env` this can be done with either `ni .env`
on the windows powershell or `touch .env` on macOS in the root directory of the
project
3. In the .env file, you will need to fill out the following variables in this
particular format
```
    TOKEN=<discord_auth_token>
    TWILIO_ACCOUNT_SID=<twilio_account_sid>
    TWILIO_AUTH_TOKEN=<twilio_auth_token>
    OPEN_WEATHER_KEY=<open_weather api key>
```
4. Once all the dependencies have installed, you can run the bot with
`node index` from the root directory of the project

## Usage
Usage of the bot is defined by the following commands, all commands are four
letters long and begin with the character `$`

### Commands(list)
- $ping: see if bot is alive
- $test {4-letter param}: returns jsonified version of command string
- $weat {city name}: returns current weather of a given city
- $text {message}: texts my phone
- $help: see this list of commands

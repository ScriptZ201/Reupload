const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Bot status: Ok'))

app.listen(process.env.PORT, () => console.log("Your app is listening on port " + process.env.PORT))







app.get('/Dashboard', (req, res) => res.send(`Welcome to the dashboard! It's not that much but it's something. Go to https://forthehandbot.glitch.me/Status , You can check the status of the bot if it's not running fast or there are problems with some systems!`))

app.get('/Status', (req, res) => res.send(`All systems are running at full speed. There isn't any errors!`))


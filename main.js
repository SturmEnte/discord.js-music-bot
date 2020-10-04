const { Client, Collection } = require('discord.js')
const fs = require('fs')

const client = new Client()
const config = require('./json/config.json')

client.queue = new Map()
client.volume = new Map()

client.commands = new Collection()

fs.readdir('./commands/', (err, files) => {
    if (err) return console.log(err)

    files.forEach(file => {

        if (!file.endsWith('.js')) return;

        const command = require(`./commands/${file}`)
        const commandName = file.split('.')[0].toLowerCase()

        client.commands.set(commandName, command)

    })

})


client.on('message', (message) => {

    if (!message.content.startsWith(client.prefix)) return
    if (message.member.user.bot) return

    let messageArray = message.content.split(' ')
    let cmd = messageArray[0]
    let args = messageArray.slice(1)

    let commandfile = client.commands.get(cmd.slice(client.prefix.length).toLowerCase())

    if (commandfile) commandfile.run(client, message, args)

})

client.login(config.token)
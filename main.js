const { Client, Collection, MessageEmbed } = require('discord.js')
const fs = require('fs')
const ytdl = require('ytdl-core')
const ytinfo = require('updated-youtube-info')

const client = new Client()
const config = require('./json/config.json')

client.queue = new Map()
client.volume = new Map()
client.nowPlaying = new Map()

client.config = config
client.prefix = '?'
client.ytdl = ytdl
client.ytinfo = ytinfo
client.embed = MessageEmbed

client.commands = new Collection()

fs.readdir('./commands/', (err, files) => {
    if (err) return console.log(err)

    files.forEach(file => {

        if (!file.endsWith('.cmd.js')) return;

        const command = require(`./commands/${file}`)
        const commandName = file.split('.')[0].toLowerCase()

        client.commands.set(commandName, command)

    })

})

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
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

//Functions

client.joinChannel = (message) => {
    const voiceChannel = message.member.voice.channel
    if (!voiceChannel) return message.channel.send(":x: You aren't in a voice channel.")
    const permissions = voiceChannel.permissionsFor(message.client.user)
    if (!permissions.has('CONNECT')) return message.channel.send(':x: I cant connect to your current channel')
    if (!permissions.has('SPEAK')) return message.channel.send(':x: I cant speak in <our current channel')

    voiceChannel.join()

    message.channel.send(':white_check_mark: Joined channel ``' + message.channel.name + '``')
}

client.leaveChannel = (message) => {
    const voiceChannel = message.member.voice.channel
    if (!voiceChannel) return message.channel.send(":x: You aren't in a voice channel.")

    voiceChannel.leave()
    message.channel.send(':white_check_mark: Disconnected from channel ``' + message.channel.name + '``')
}

client.getVideoInfo = async (url) => {
    await ytinfo(url.split('?v=')[1].split('&')[0]).then(data => {
        console.log(data)
        return data
    })
}

client.playNext = (message) => {
    message.channel.send('Play next')
}
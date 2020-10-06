const { Client, Collection, MessageEmbed } = require('discord.js')
const fs = require('fs')
const ytdl = require('ytdl-core')
const ytinfo = require('updated-youtube-info')

const client = new Client()
const config = require('./json/config.json')

client.queue = new Map()
client.volume = new Map()
client.nowPlaying = new Map()
client.repeat = new Map()

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

    console.log(client.queue)
    console.log(client.nowPlaying)
    console.log(client.volume)

    message.channel.send('Play next')

    const voiceConnection = client.voice.connections.get(message.channel.guild.id)
    if (!voiceConnection) return
    if (!client.queue[message.channel.guild.id]) return voiceConnection.channel.leave()
    if (client.queue[message.channel.guild.id].array.length <= 1) return voiceConnection.channel.leave()


    /*
        let loop = client.repeat[message.channel.guild.id]
        const tqueue = client.queue[message.channel.guild.id]
        const voiceConnection = client.voice.connections.get(message.channel.guild.id)
    
        if (!tqueue) return
        if (!loop) loop = ''
    
        if (loop == 'one') {
            const info = tqueue.array[tqueue.index].info
            const link = tqueue.array[tqueue.index].link
            voiceConnection.play(ytdl(link, { filter: 'audioonly', format: 'mp3' }))
            const embed = new client.embed()
            embed.setThumbnail(info.thumbnailUrl)
            embed.setTitle('Now Playing')
            embed.setDescription(`[${info.title}](${info.url})`)
            message.channel.send(embed)
    
            nowPlaying[message.channel.guild.id] = embed
            return
        } else if (loop == 'all') {
    
            if (args.length <= tqueue.index + 2) {
                client.queue[message.channel.guild.id].index = tqueue.index + 1
                voiceConnection.play(ytdl(tqueue.array[tqueue.index + 1].link, { filter: 'audioonly', format: 'mp3' }))
                const info = tqueue.array[tqueue.index + 1].info
                const embed = new client.embed()
                embed.setThumbnail(info.thumbnailUrl)
                embed.setTitle('Now Playing')
                embed.setDescription(`[${info.title}](${info.url})`)
                message.channel.send(embed)
    
                nowPlaying[message.channel.guild.id] = embed
                return
            } else {
                client.queue[message.channel.guild.id].index = 0
                voiceConnection.play(ytdl(tqueue.array[0].link, { filter: 'audioonly', format: 'mp3' })).on('finish', () => client.playNext(message))
                const info = tqueue.array[0].info
                const embed = new client.embed()
                embed.setThumbnail(info.thumbnailUrl)
                embed.setTitle('Now Playing')
                embed.setDescription(`[${info.title}](${info.url})`)
                message.channel.send(embed)
    
                nowPlaying[message.channel.guild.id] = embed
                return
            }
    
        } else {
    
            client.queue[message.channel.guild.id].array = client.removeFromArray(client.queue[message.channel.guild.id].array, client.queue[message.channel.guild.id].index)
            if (client.queue[message.channel.guild.id].index + 1 > client.queue[message.channel.guild.id].index) {
                client.queue[message.channel.guild.id].index = client.queue[message.channel.guild.id].index + 1
                const index = client.queue[message.channel.guild.id].index
                const array = client.queue[message.channel.guild.id].array
                const info = client.queue[message.channel.guild.id].array[index].info
                voiceConnection.play(ytdl(array[index].link, { filter: 'audioonly', format: 'mp3' })).on('finish', () => client.playNext(message))
    
                const embed = new client.embed()
                embed.setThumbnail(info.thumbnailUrl)
                embed.setTitle('Now Playing')
                embed.setDescription(`[${info.title}](${info.url})`)
                message.channel.send(embed)
    
                nowPlaying[message.channel.guild.id] = embed
                return
            }
        }
    */
}

client.removeFromArray = (array, index) => {
    let newArray = []
    for (let i = 0; i < array.length; i++) {
        if (i != index) newArray.push(array[i])
    }
    return newArray
}
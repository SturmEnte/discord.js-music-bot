module.exports.run = async (client, message, args) => {

    if (!client.voice.connections.has(message.channel.guild.id))
        if (client.joinChannel(message) == 'fail') return
    const voiceConnection = client.voice.connections.get(message.channel.guild.id)

    if (args.length <= 0) return message.channel.send(`:x: You didn't specify a Youtube URL`)
    const link = args[0]
    if (!link.startsWith('https://www.youtube.com/watch?' || 'http://www.youtube.com/watch?')) return message.channel.send(`:x: You didn't specify a Youtube URL`)

    if (voiceConnection.dispatcher == null) {
        try {
            const dispatcher = voiceConnection.play(client.ytdl(link, { filter: 'audioonly', format: '.mp3' }))
            dispatcher.setVolume(client.volume[message.channel.guild.id] || client.config.defaultVolume)
            dispatcher.on('finish', () => client.playNext(message))

            client.ytinfo(link.split('?v=')[1].split('&')[0]).then(info => {

                if (!client.queue[message.channel.guild.id]) client.queue[message.channel.guild.id] = { index: 0, array: [] }
                client.queue[message.channel.guild.id].array.push({ link: link, info: info })

                client.nowPlaying[message.channel.guild.id] = info

                console.log(info)

                const embed = new client.embed()
                embed.setThumbnail(info.thumbnailUrl)
                embed.setTitle('Now Playing')
                embed.setDescription(`[${info.title}](${info.url})`)
                message.channel.send(embed)

            })

        } catch (error) {
            message.channel.send(`:x: You didn't specify a Youtube URL`)
            console.error(error)
            return
        }
    } else {
        message.channel.send('geht nicht du ``Nils.exe``')
    }

}

module.exports.help = {
    name: "play",
    description: "..."
}
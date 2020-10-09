const { google } = require('googleapis')

const youtube = google.youtube('v3')

module.exports.run = async (client, message, args) => {

    if (!client.voice.connections.has(message.channel.guild.id))
        if (client.joinChannel(message) == 'fail') return
    const voiceConnection = client.voice.connections.get(message.channel.guild.id)

    if (args.length <= 0) return message.channel.send(`:x: You didn't specify a Youtube URL`)
    var link = args[0]
    if (!link.startsWith('https://www.youtube.com/watch?') || !link.startsWith('http://www.youtube.com/watch?')) {
        const search = args.join(' ')
        await youtube.search.list({
            key: client.config.api_key,
            part: 'snippet',
            q: search
        }).then(async (res) => {
            console.log(res)
            if (res.data.items.length < 1) return message.channel.send(':x: I cant find a video')
            link = `https://youtube.com/watch?v=${res.data.items[0].id.videoId}`
        })
    }

    if (!voiceConnection.dispatcher) {
        try {
            const dispatcher = voiceConnection.play(client.ytdl(link, { filter: 'audioonly', format: '.mp3' }))
            dispatcher.setVolume(client.volume[message.channel.guild.id] || client.config.defaultVolume)
            dispatcher.on('finish', () => client.playNext(message))

            client.ytinfo(link.split('?v=')[1].split('&')[0]).then(info => {

                if (!client.queue[message.channel.guild.id]) client.queue[message.channel.guild.id] = { index: 0, array: [] }
                client.queue[message.channel.guild.id].array.push({ link: link, info: info })

                const embed = new client.embed()
                embed.setThumbnail(info.thumbnailUrl)
                embed.setTitle('Now Playing')
                embed.setDescription(`[${info.title}](${info.url})`)
                message.channel.send(embed)

                client.nowPlaying[message.channel.guild.id] = embed

            })

        } catch (error) {
            message.channel.send(`:x: You didn't specify a Youtube URL`)
            console.error(error)
            return
        }
    } else {

        client.ytinfo(link.split('?v=')[1].split('&')[0]).then(info => {
            if (!client.queue[message.channel.guild.id]) client.queue[message.channel.guild.id] = { index: 0, array: [] }
            client.queue[message.channel.guild.id].array.push({ link: link, info: info })
        })

    }

}

module.exports.help = {
    name: "play",
    description: "..."
}
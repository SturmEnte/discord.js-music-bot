
module.exports.run = (client, message, args) => {

    if (!client.voice.connections.has(message.channel.guild.id)) if (client.joinChannel(message) == 'fail') return
    const voiceConnection = client.voice.connections.get(message.channel.guild.id)

    if (args.length <= 0) return message.channel.send(`:x: You didn't specify a Youtube URL`)
    const link = args[0]
    try {
        voiceConnection.play(client.ytdl(link, { filter: 'audioonly', format: '.mp3' })).setVolume(client.volume[message.channel.guild.id] || client.config.defaultVolume)
        if (!client.queue[message.channel.guild.id]) client.queue[message.channel.guild.id] = []
        client.queue[message.channel.guild.id].push({ link: link, info: client.youtube_info(link) })
        client.nowPlaying[message.channel.guild.id] = client.youtube_info(link)
    } catch (error) {
        message.channel.send(`:x: You didn't specify a Youtube URL`)
        //console.error(error)
        return
    }

}

module.exports.help = {
    name: "play",
    description: "..."
}


module.exports.run = (client, message, args) => {

    if (!client.nowPlaying[message.channel.guild.id] || client.nowPlaying[message.channel.guild.id] == null || !client.voice.connections.has(message.channel.guild.id)) return message.channel.send(':x: Der Bot spielt nichts ab')

    message.channel.send(client.nowPlaying[message.channel.guild.id])

}

module.exports.help = {
    name: "nowplaying",
    description: "..."
}

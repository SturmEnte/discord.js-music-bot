module.exports.run = (client, message, args) => {

    if (!client.voice.connections.has(message.channel.guild.id)) return message.channel.send(':x: Bot is not playing')
    const dispatcher = client.voice.connections.get(message.channel.guild.id).dispatcher
    if (dispatcher.paused) return message.channel.send(':x: Bot is already paused')

    dispatcher.pause()
    message.channel.send(':white_check_mark: Paused Bot')

}

module.exports.help = {
    name: "pause",
    description: "..."
}
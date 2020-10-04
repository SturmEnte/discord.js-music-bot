module.exports.run = (client, message, args) => {

    if (!client.voice.connections.has(message.channel.guild.id)) return message.channel.send(':x: Bot is not playing')
    const dispatcher = client.voice.connections.get(message.channel.guild.id).dispatcher
    if (!dispatcher.paused) return message.channel.send(':x: Bot is already resumed')

    dispatcher.resume()
    message.channel.send(':white_check_mark: Resumed Bot')

}

module.exports.help = {
    name: "resume",
    description: "..."
}
module.exports.run = (client, message, args) => {

    if (!client.voice.connections.has(message.channel.guild.id)) return message.channel.send(':x: Bot is not playing')
    if (args.length < 1 || !Number(args[0])) return message.channel.send(':x: You dont specified a volume')
    const dispatcher = client.voice.connections.get(message.channel.guild.id).dispatcher
    const volume = Number(args[0])
    dispatcher.setVolume(volume * client.config.defaultVolume)
    message.channel.send(':white_check_mark: Set the volume of the bot to ' + volume)

}

module.exports.help = {
    name: "volume",
    description: "..."
}
module.exports.run = (client, message, args) => {

    if (args.length < 1) return message.channel.send(':x: You dont specified an option\nUse repeat [all | one | off] to change.')

    if (args[0] == 'all') {
        client.repeat[message.channel.guild.id] = 'all'
        return message.channel.send(':repeat: Seted repeat mode to ``all``')
    } else if (args[0] == 'one') {
        client.repeat[message.channel.guild.id] = 'one'
        return message.channel.send(':repeat: Seted repeat mode to ``one``')
    } else if (args[0] == 'none') {
        client.repeat[message.channel.guild.id] = undefined
        return message.channel.send(':repeat: Seted repeat mode to ``none``')
    } else {
        return message.channel.send(':x: You dont specified an option\nUse repeat ``all | one | off`` to change.')
    }
}

module.exports.help = {
    name: "repeat",
    description: "..."
}
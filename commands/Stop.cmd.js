module.exports.run = (client, message, args) => {

    client.leaveChannel(message)
    client.nowPlaying[message.channel.guild.id] = undefined

}

module.exports.help = {
    name: "stop",
    description: "..."
}
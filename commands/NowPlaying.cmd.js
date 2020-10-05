
module.exports.run = (client, message, args) => {

    if (!client.nowPlaying[message.channel.guild.id] || client.nowPlaying[message.channel.guild.id] == null) return message.channel.send(':x: Der ot spielt nichts ab')

    const info = client.nowPlaying

    const embed = new client.embed()
    embed.setThumbnail(info.thumbnailUrl)
    embed.setTitle('Now Playing')
    embed.setDescription(`[${info.title}](${info.url})`)
    message.channel.send(embed)

}

module.exports.help = {
    name: "nowplaying",
    description: "..."
}

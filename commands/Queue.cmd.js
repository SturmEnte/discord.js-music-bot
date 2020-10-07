const { MessageEmbed } = require("discord.js")

module.exports.run = (client, message, args) => {

    const array = client.queue[message.channel.guild.id].array
    let embed = new MessageEmbed()
    embed.setTitle('Queue')

    for (let i = 0; i < array.lenght; i++) {
        embed.addField('#' + String(i), `[${array[i].info.title}](${array[i].link})`)
    }

    message.channel.send(embed)

}

module.exports.help = {
    name: "queue",
    description: "..."
}
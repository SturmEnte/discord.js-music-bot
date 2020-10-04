
module.exports.run = (client, message, args) => {

    if (client.joinChannel(message) == 'fail') return

}

module.exports.help = {
    name: "join",
    description: "..."
}

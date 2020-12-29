const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
            .setTitle('Informatie')
            .setColor("#0099ff")
            .setDescription("Deze Bot is gemaakt door **Raymond#1362**\n")
            .addFields(
              
            )
            .setThumbnail('')
            .setImage('')
            .setTimestamp()
            .setFooter('', '');

        return message.channel.send(botEmbed);

}

module.exports.help = {
    name: "info",
    category: "Informatie"
}
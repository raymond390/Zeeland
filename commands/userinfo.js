const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

  
    var serverEmbed = new discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Server Info")
    .setImage(message.guild.iconURL)
    .setDescription(`${message.guild}'s Informatie`)
    .addField("Creator", `De Creator Van deze server is ${message.guild.owner}`)
    .addField("Spelers", `Deze server heeft ${message.guild.memberCount} members`)
    .addField("Emoji Count", `Deze Server Heeft ${message.guild.emojis.cache.size} emojis`)
    .addField("Rollen", ` ${message.guild.roles.cache.map(r => `${r}`).join(" | ")} `)
    .addField("kanalen", `Deze Server heeft ${message.guild.channels.cache.size} Kanalen`)
    

message.channel.send(serverEmbed)
  
}
    
    module.exports.help = {
        name: "serverinfo",
        description: "Geeft al de verschillende commands",
        category: "Informatie"
    }
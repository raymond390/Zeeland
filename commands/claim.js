const discord = require("discord.js");

module.exports.run = async (client, message, argument) => {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("sorry jij kan dit niet");

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Geen perms");
    
    const categoryID = "793565883653160990";


    

    if (message.channel.parentID == categoryID) {

    var botEmbed = new discord.MessageEmbed()
    .setTitle('Claim')
    .setDescription(`${message.author} Heeft deze ticket Geclaimed`)
    .setThumbnail('')
    .setImage('')
    .setTimestamp()
    .setFooter('Hoi', '');

    message.channel.setTopic(` ${message.author}: Heeft deze ticket geclaimed`)    

return message.channel.send(botEmbed);

    } else {
        

    message.channel.send("Gelieve dit command te doen bij een ticket.");
    }
}

module.exports.help = {
    name: "claim",
    description: "Geeft al de verschillende commands",
    category: "Algemeen"
}
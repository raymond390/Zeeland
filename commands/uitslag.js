const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var categoryID = "762486047384272926"

    var ticketUser = message.guild.member(message.mentions.users.first());

    if (message.channel.parentID !== categoryID) return message.reply("Dit is geen ticket") && message.delete();

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("jij kan dit niet doen") && message.delete();

    if (!ticketUser) return message.reply("geef een persoon op") && message.delete();

    var kiesEmbed = new discord.MessageEmbed()
    .setTitle("Uitslag")
    .setColor("00bfff")
    .addField(`Aangenomen:`, '✅', false)
    .addField("Afgewezen:", "❌", false)


    var redenEmbed = new discord.MessageEmbed()
    .setTitle("Uitslag")
    .setColor("#00BFFF")
    .addField(`Reden`, `vertel een reden`, false)

    const filter = m => m.content;

    message.channel.send(kiesEmbed).then(async msg => {

        message.delete();

        var emoji = await promtMessage(msg, message.author, 60, ["✅", "❌"]);

        if(emoji === "✅") {

            message.channel.send(redenEmbed).then(msg => msg.delete({ timeout: 10000}));

            message.channel.awaitMessages(filter, { max:1, time: 10000}).then(collected => {

                var redenGood = collected.first();;
                                             
                var antwoordengood = new discord.MessageEmbed()
                .setTitle("aangenomen")
                .setColor("#00FF00")
                .addField("Wie",`${ticketUser}`, false )
                .addField("reden", `${redenGood}`, false)
               
            message.channel.send(antwoordengood);
            message.channel.bulkDelete(1);
            message.channel.setTopic(`**Sollicitant**: ${ticketUser} **Status**: Aangenomen!`)    


            })

        }else if(emoji === "❌") {

            message.channel.send(redenEmbed).then(msg => msg.delete({ timeout: 10000}));

            message.channel.awaitMessages(filter, {max:1, time: 10000}).then(collected => {

                var redenBad = collected.first();;
                                             
                var antwoordenBad = new discord.MessageEmbed()
                .setTitle("Afgewezen")
                .setColor("#00FF00")
                .addField("Wie",`${ticketUser}`, false )
                .addField("reden", `${redenBad}`, false)
               
            message.channel.send(antwoordenBad);
            message.channel.bulkDelete(1);
            message.channel.setTopic(`**Sollicitant**: ${ticketUser} **Status**: Afgewezen`)    


            })

        }
        
            
        
        
    })
}
    // Emojis aan teksten kopellen.
    async function promtMessage(message, author, time, reactions) {
    // We gaan eerst de tijd * 1000 doen zodat we seconden uitkomen.
    time *= 1000;

    // We gaan ieder meegegeven reactie onder de reactie plaatsen.
    for (const reaction of reactions) {
        await message.react(reaction);
    }

    // Als de emoji de juiste emoji is die men heeft opgegeven en als ook de auteur die dit heeft aangemaakt er op klikt
    // dan kunnen we een bericht terug sturen.
    const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

    // We kijken als de reactie juist is, dus met die filter en ook het aantal keren en binnen de tijd.
    // Dan kunnen we bericht terug sturen met dat icoontje dat is aangeduid.
    return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);
}
module.exports.help = {
    name: "uitslag",
    description: "Hier mee geef je de uitslag van een sollicitaite",
    category: "Algemeen"
}
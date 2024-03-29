const { EmbedBuilder } = require('discord.js');
const index = require("../index.js");


module.exports = {
		name:'reactionrole',
		description:'Sets a reaction role',
  async execute(client, message, args, Discord) {
    const channel = '1036615904286478416';
    const eyeTeamRole = message.guild.roles.cache.find(role => role.name === "Eyes");
    const browTeamRole = message.guild.roles.cache.find(role => role.name === "Eyebrow");

    const eyeTeamEmoji = '👀';
    const browTeamEmoji = '🤨';

    const embedExample = new EmbedBuilder()
        .setColor('#e42643')
        .setTitle('Choose a team to play on!')
        .setDescription('Choosing a team will allow you to interact with your teammates!\n\n'
            + `${eyeTeamEmoji} for Eyes team\n`
            + `${browTeamEmoji} for Eyebrow team`);

    let messageEmbed = await message.channel.send({embeds: [embedExample] });
			Promise.all([
				messageEmbed.react(eyeTeamEmoji),
				messageEmbed.react(browTeamEmoji),
			])
				.catch(error => console.error('One of the emojis failed to react:', error));




    client.on("messageReactionAdd", async (reaction, user) => {
			   //Await responses in partials
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
				if (user.bot) return; //Stops bot from entering
        if (!reaction.message.guild) return; //Checks if reactor is in the server
				//Checks the specific channel for reactions then adds role associated
        if (reaction.message.channel.id == channel) {
            if (reaction.emoji.name === eyeTeamEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(eyeTeamRole);
            }
            if (reaction.emoji.name === browTeamEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(browTeamRole);
            }
        } else {
            return;
        }

    });

    client.on('messageReactionRemove', async (reaction, user) => {

        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;


        if (reaction.message.channel.id == channel) {
            if (reaction.emoji.name === eyeTeamEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(eyeTeamRole);
            }
            if (reaction.emoji.name === browTeamEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(browTeamRole);
            }
        } else {
            return;
        }
    });



  }

}

// 這應該算是要求吧
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
// 創建指令
module.exports = {
    data: new SlashCommandBuilder()
        .setName('infoserver')
        .setDescription('取得伺服器的資訊'),
    async execute(interaction) {
        const Embed = new EmbedBuilder()
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setTitle('伺服器資訊')
            .setDescription(`伺服器：${interaction.guild.name} (${interaction.guild.id})\n創建日期：${interaction.guild.createdAt}\n伺服器人數: ${interaction.guild.memberCount}\n擁有者: <@${interaction.guild.ownerId}>`);
        await interaction.reply({ embeds: [Embed] });
    },
};
// 這應該算是要求吧
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
// 創建指令
module.exports = {
    data: new SlashCommandBuilder()
        .setName('infouser')
        .setDescription('取得使用者的資訊')
        .addUserOption((option) =>
            option
                .setName('使用者')
                .setDescription('指定使用者')),
    async execute(interaction) {
        if (interaction.options.getUser('使用者')) {
            const Embed = new EmbedBuilder()
                .setThumbnail(interaction.options.getUser('使用者').displayAvatarURL({ size: 512, dynamic: true }))
                .setTitle('使用者資訊')
                .setDescription(`使用者：${interaction.options.getUser('使用者').username} (${interaction.options.getUser('使用者').id})\n帳號創建日期：${interaction.options.getUser('使用者').createdAt}`);
            await interaction.reply({ embeds: [Embed] })
        } else {
            const Embed = new EmbedBuilder()
                .setThumbnail(interaction.user.displayAvatarURL({ size: 512, dynamic: true }))
                .setTitle('使用者資訊')
                .setDescription(`使用者：${interaction.user.username} (${interaction.user.id})\n帳號創建日期：${interaction.user.createdAt}`);
            await interaction.reply({ embeds: [Embed] });
        }
    },
};
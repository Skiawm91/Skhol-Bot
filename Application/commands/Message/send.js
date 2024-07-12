// 這應該算是要求吧
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
// 創建指令
module.exports = {
    data: new SlashCommandBuilder()
        .setName('send')
        .setDescription('傳送訊息至指定頻道')
        .addChannelOption((option) =>
            option
                .setName('頻道')
                .setDescription('指定頻道')
                .setRequired(true))
        .addStringOption((option) =>
            option
                .setName('訊息')
                .setDescription('輸入你想發送的訊息')
                .setRequired(true)),
    async execute(interaction) {
        const channel = interaction.options.getChannel('頻道');
        const message = interaction.options.getString('訊息');
        channel.send(message);
        await interaction.reply({ content: '已成功發送訊息！', ephemeral: true })
    },
};
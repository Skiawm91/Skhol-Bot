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
                .setRequired(true))
        .addBooleanOption((option) =>
            option
                .setName('嵌入式')
                .setDescription('使用嵌入式訊息')
                .setRequired(true))
        .addStringOption((option) =>
            option
                .setName('標題')
                .setDescription('嵌入式標題'))
        .addStringOption((option) =>
            option
                .setName('內文')
                .setDescription('嵌入式內文')),
    async execute(interaction) {
        const channel = interaction.options.getChannel('頻道');
        const message = interaction.options.getString('訊息');
        if (interaction.options.getBoolean('嵌入式') == true) {
            var Embed = new EmbedBuilder()
                .setTitle(interaction.options.getString('標題'))
                .setDescription(interaction.options.getString('內文'));
        }
        channel.send({ content: message, embeds: [Embed] });
        await interaction.reply({ content: '已成功發送訊息！', ephemeral: true })
    },
};
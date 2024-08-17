// 這應該算是要求吧
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../../../config.json');
// 設定檔 (Config)
const Lang = config.Language;
// 創建指令
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('回傳應用程式的狀態'),
    async execute(interaction) {
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        if (Lang == 'zh_TW') {
            const Embed = new EmbedBuilder()
            .setTitle(':ping_pong: Pong!')
            .setDescription(`Websocket 延遲: ${interaction.client.ws.ping}ms\n應用程式延遲: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
            await interaction.editReply({ embeds: [Embed] });
        } else if (Lang == 'en_US') {
            const Embed = new EmbedBuilder()
            .setTitle(':ping_pong: Pong!')
            .setDescription(`Websocket delay: ${interaction.client.ws.ping}ms\nApplication delay: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
            await interaction.editReply({ embeds: [Embed] });
        }
    },
};
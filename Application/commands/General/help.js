// 這應該算是要求吧
const { SlashCommandBuilder ,EmbedBuilder } = require('discord.js');
// 創建指令
module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('取得可用的指令'),
    async execute(interaction) {
        const Embed = new EmbedBuilder()
            .setTitle('指令列表 - 一般指令')
            .setDescription('help - 取得可用的指令\nping - 回傳應用程式的狀態\ninfouser - 取得使用者的資訊\ninfoserver - 取得伺服器的資訊\nkick - 將成員踢出伺服器\nban - 將使用者禁止進入伺服器');
        await interaction.reply({ embeds: [Embed] });
    },
};
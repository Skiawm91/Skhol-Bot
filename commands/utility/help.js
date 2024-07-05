// 這應該算是要求吧
const { SlashCommandBuilder } = require('discord.js');
// 創建指令
module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('取得可用的指令'),
    async execute(interaction) {
        await interaction.reply('目前可以使用的指令\n/help - 取得可用的指令');
    },
};
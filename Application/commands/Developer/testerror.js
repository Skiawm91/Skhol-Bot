// 這應該算是要求吧
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { logChannelID, developerID } = require('../../../config.json');
// 創建指令
module.exports = {
    data: new SlashCommandBuilder()
        .setName('testerror')
        .setDescription('讓應用程式發送測試錯誤訊息至日誌頻道'),
    async execute(interaction) {
        if (interaction.user.id == developerID) {
            const logChannel = interaction.client.channels.cache.get(logChannelID);
            try {
                throw new Error('這是一條測試錯誤的訊息');
            } catch(error) {
                const logEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle(':x: 錯誤內容')
                .setDescription(`${error}`);
                console.info(`[資訊] ${error}`);
                logChannel.send({ content: `<@${developerID}>`, embeds: [logEmbed] });
            }
            await interaction.reply({ content: '測試錯誤訊息已發送！', ephemeral: true });
        } else {
            await interaction.reply({ content: '您沒有權限運行這個指令！', ephemeral: true });
        }
    },
};
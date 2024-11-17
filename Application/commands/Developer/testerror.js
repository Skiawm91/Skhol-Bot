// 這應該算是要求吧
const { EmbedBuilder } = require('discord.js');
const { Log, developerCommands, developerID, logChannelID } = require('../../../config');
if (!developerCommands.testerror) return;
// 創建指令
module.exports = {
    data: {
        "name": "testerror",
        "type": 1,
        "description": "讓應用程式發送測試錯誤訊息至日誌頻道",
        "integration_types": [0],
        "contexts": [0],
    },
    async execute(interaction) {
        if (interaction.user.id == developerID) {
            await interaction.deferReply({ ephemeral: true });
            const logChannel = interaction.client.channels.cache.get(logChannelID);
            try {
                throw new Error('這是一條測試錯誤的訊息');
            } catch(error) {
                console.error('[錯誤] 發生了錯誤！\n', error);
                if (Log){
                    const stackLines = error.stack.split('\n');
                    const shortError = stackLines.slice(0, 3).concat(['...']).concat(stackLines.slice(-2)).join('\n');            
                    const logEmbed = new EmbedBuilder()
                    .setColor('#ff0000')
                    .setTitle(':x: 錯誤內容')
                    .setDescription(`\`\`\`${shortError}\`\`\``)
                    .setTimestamp()
                    logChannel.send({ content: `<@${developerID}> 發生了錯誤！`, embeds: [logEmbed] });
                }
            }
            await interaction.followUp({ content: '測試錯誤訊息已發送！'});
        } else {
            await interaction.followUp({ content: '您沒有權限運行這個指令！' });
        }
    },
};
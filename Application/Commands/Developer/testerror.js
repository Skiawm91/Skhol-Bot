// 這應該算是要求吧
const { Log, developerCommands, developerID, logChannelID } = require('../../../config');
if (!developerCommands.testerror) {
    console.info('[資訊] "testerror" 已停用，將不會被註冊！');
    return;
}
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
        await interaction.deferReply({ ephemeral: true });
        if (developerID.includes(interaction.user.id)) {
            const logChannel = interaction.client.channels.cache.get(logChannelID);
            try {
                throw new Error('這是一條測試錯誤的訊息');
            } catch(error) {
                console.error('[錯誤] 發生了錯誤！\n', error);
                if (Log){
                    const stackLines = error.stack.split('\n');
                    const shortError = stackLines.slice(0, 3).concat(['...']).concat(stackLines.slice(-2)).join('\n');  
                    const developers = developerID.map(devUser => `<@${devUser}>`).join(' ');        
                    const logEmbed = {
                        "title": ":x: 錯誤內容",
                        "description": `\`\`\`${shortError}\`\`\``,
                        "timestamp": new Date().toISOString(),
                        "color": 0xff0000,
                    };
                    logChannel.send({ content: `${developers} 發生了錯誤！`, embeds: [logEmbed] });
                }
            }
            await interaction.followUp({ content: '測試錯誤訊息已發送！'});
        } else {
            await interaction.followUp({ content: '您沒有權限運行這個指令！' });
        }
    },
};
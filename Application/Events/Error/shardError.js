// 這應該算是要求吧
const { Events } = require('discord.js');
const { client } = require('../../../bot');
const { developerID, logChannelID } = require('../../../config');
// 錯誤處理 (分片？)
module.exports = {
    name: Events.ShardError,
    async execute(error){
        console.error('[錯誤] 發生了錯誤！', error);
        const logChannel = client.channels.cache.get(logChannelID);
        const stackLines = error.stack.split('\n');
        const shortError = stackLines.slice(0, 3).concat(['...']).concat(stackLines.slice(-2)).join('\n');            
        const developers = developerID.map(devUser => `<@${devUser}>`).join(' ');        
        const logEmbed = {
            "title": ":x: 錯誤內容",
            "description": `\`\`\`${shortError}\`\`\``,
            "timestamp": new Date().toISOString(),
            "color": 0xE74C3C,
        };
        logChannel.send({ content: `${developers} 發生了錯誤！`, embeds: [logEmbed] });
    }
}
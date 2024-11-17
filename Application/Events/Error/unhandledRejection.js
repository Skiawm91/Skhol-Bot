// 這應該算是要求吧
const { EmbedBuilder } = require('discord.js');
const { client } = require('../../../bot');
const { developerID, logChannelID } = require('../../../config');
// 錯誤處理
module.exports = {
    name: 'unhandledRejection',
    process: true,
    async execute(error){
        console.error('[錯誤] 發生了錯誤！', error);
        const logChannel = client.channels.cache.get(logChannelID);
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
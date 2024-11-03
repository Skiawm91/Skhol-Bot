// 這應該算是要求吧
const { Client, Collection, Events, GatewayIntentBits, REST, Routes, EmbedBuilder, ApplicationCommandType, Partials } = require('discord.js');
const axios = require('axios');
const { developerID, logChannelID, clientID, guildID, appToken } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
const ver = '0.4.0';
module.exports= ver;
// 程式開始運作
console.log(`Skhol Bot v${ver}\nMade By Skiawm91\n`);
// 建立客戶端實作
const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });
// 監測錯誤
client.on(Events.ShardError, async (error) => {
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
});
process.on('unhandledRejection', async (error) => {
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
}).on('uncaughtException', async (error) => {
    console.error('[錯誤] 發生了錯誤！\n', error);
    const logChannel = client.channels.cache.get(logChannelID);
    const stackLines = error.stack.split('\n');
    const shortError = stackLines.slice(0, 3).concat(['...']).concat(stackLines.slice(-2)).join('\n');            
    const logEmbed = new EmbedBuilder()
    .setColor('#ff0000')
    .setTitle(':x: 錯誤內容')
    .setDescription(`\`\`\`${shortError}\`\`\``)
    .setTimestamp()
    logChannel.send({ content: `<@${developerID}> 發生了錯誤！`, embeds: [logEmbed] });
}).on('exit', async (code) => {
    console.info('[資訊] 應用程式已關閉！');
})

// 註冊指令
const commands = [];
const foldersPath = path.join(__dirname, 'Application/commands');
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data);
        } else {
            console.warn(`[警告] 位於 ${filePath} 中的指令缺少 "data" 或 "execute" 項！`);
        }
    }
}
const rest = new REST({ version: '10' }).setToken(appToken);
(async () => {
    try {
        console.info(`[資訊] 開始註冊 ${commands.length} 條指令！`);
        const data = await rest.put(
            Routes.applicationCommands(clientID),
            { body: commands },
        );
        console.info(`[資訊] 成功註冊 ${data.length} 條指令！\n`);
    } catch(error) {
        console.error(error);
    }
})();
// 執行指令
client.commands = new Collection();
for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.warn(`[警告] 位於 ${filePath} 中的指令缺少 "data" 或 "execute" 項！`);
        }
    }
}
// 載入事件處理檔案
const eventsPath = path.join(__dirname, 'Application/events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}
// 客戶端登入 Token
client.login(appToken);
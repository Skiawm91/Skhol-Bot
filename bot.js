// 這應該算是要求吧
const { Client, Collection, Events, GatewayIntentBits, REST, Routes, PresenceUpdateStatus, EmbedBuilder } = require('discord.js');
const { Status, developerID, logChannelID, clientID, guildID, appToken } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
const ver = '0.2.0';
// 程式開始運作
console.log(`Skhol Bot v${ver}\nMade By Skiawm91\n`);
// 建立客戶端實作
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// 監測錯誤
client.on(Events.ShardError, error => {
    console.error('[錯誤] 發生了錯誤！\n', error);
    const logchannel = client.channels.cache.get(logChannelID);
    logchannel.send(`## <@${developerID}> 發生了錯誤！\n"${error}"`);
});
process.on('unhandledRejection', error => {
    console.error('[錯誤] 發生了錯誤！\n', error);
    const logchannel = client.channels.cache.get(logChannelID);
    logchannel.send(`## <@${developerID}> 發生了錯誤！\n${error}`);
});
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
            commands.push(command.data.toJSON());
        } else {
            console.warn(`[警告] 位於 ${filePath} 中的指令缺 "data" 或 "execute" 項！`);
        }
    }
}
const rest = new REST().setToken(appToken);
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
            console.warn(`[警告] 位於 ${filePath} 中的指令缺 "data" 或 "execute" 項！`);
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
// 設定狀態 & 發送應用程式資訊
client.once(Events.ClientReady, readyClient => {
    if (Status == 'DND') {
        console.info('[資訊] 狀態設為: DoNotDisturb');
        client.user.setStatus(PresenceUpdateStatus.DoNotDisturb);
    } else {
        if (Status == 'Online') {
            console.info('[資訊] 狀態設為:', Status);
            client.user.setStatus(PresenceUpdateStatus.Status);
        } else if (Status == 'DoNotDisturb') {
            console.info('[資訊] 狀態設為:', Status);
            client.user.setStatus(PresenceUpdateStatus.Status);
        } else if (Status == 'Idle') {
            console.info('[資訊] 狀態設為:', Status);
            client.user.setStatus(PresenceUpdateStatus.Status);
        } else if (Status == 'Invisible') {
            console.info('[資訊] 狀態設為:', Status);
            client.user.setStatus(PresenceUpdateStatus.Status);
        } else {
            console.error('[錯誤] 狀態設定不正確！');
        } 
    }
    const Embed = new EmbedBuilder()
        .setTitle(':white_check_mark: 應用程式資訊')
        .setDescription(`開發者: Skiawm91\n版本: ${ver}\n`)
    const logchannel = client.channels.cache.get(logChannelID);
    logchannel.send({ embeds: [Embed] });
});
// 客戶端登入 Token
client.login(appToken);
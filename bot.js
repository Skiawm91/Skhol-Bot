// 這應該算是要求吧
const { Client, Collection, Events, GatewayIntentBits, REST, Routes, PresenceUpdateStatus, EmbedBuilder } = require('discord.js');
const { Status, developerID, logChannelID, clientID, guildID, appToken } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
const { exec } = require('child_process');
const ver = '0.0.4';
// 程式開始運作
console.log('SakuraBot v0.0.4\nMade By Skiawm91\n');
// 建立客戶端實作
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// 客戶端登入資訊
client.once(Events.ClientReady, readyClient => {
    console.log('[資訊] 登入成功！');
    console.log(`[資訊] 登入的應用程式: ${readyClient.user.tag}`);
    if (Status == 'DND') {
        console.log('[資訊] 狀態設為: DoNotDisturb');
        client.user.setStatus(PresenceUpdateStatus.DoNotDisturb);
    } else {
        if (Status == 'Online') {
            console.log('[資訊] 狀態設為:', Status);
            client.user.setStatus(PresenceUpdateStatus.Status);
        } else if (Status == 'DoNotDisturb') {
            console.log('[資訊] 狀態設為:', Status);
            client.user.setStatus(PresenceUpdateStatus.Status);
        } else if (Status == 'Idle') {
            console.log('[資訊] 狀態設為:', Status);
            client.user.setStatus(PresenceUpdateStatus.Status);
        } else if (Status == 'Invisible') {
            console.log('[資訊] 狀態設為:', Status);
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
// 執行指令
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'Application/commands');
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[警告] 位於 ${filePath} 中的指令缺 "data" 或 "execute" 項！`);
        }
    }
}
// 註冊指令
const commands = [];
for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`[警告] 位於 ${filePath} 中的指令缺 "data" 或 "execute" 項！`);
        }
    }
}
const rest = new REST().setToken(appToken);
(async () => {
    try {
        console.log(`[資訊] 開始註冊 ${commands.length} 條指令！`);
        const data = await rest.put(
            Routes.applicationCommands(clientID),
            { body: commands },
        );
        console.log(`[資訊] 成功註冊 ${data.length} 條指令！\n`);
    } catch(error) {
        console.error(error);
    }
})();
// 指令交互
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`[錯誤] 沒有與 ${interaction.commandName} 相符的指令！`);
        return;
    }
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.fullowup({ content: '執行這個指令時出現錯誤！', ephemeral: true});
        } else {
            await interaction.reply({ content: '執行這個指令時出現錯誤！', ephemeral: true });
        }
    }
});
// 客戶端登入 Token
client.login(appToken);
// 這應該算是要求吧
const { Client, Collection, Events, GatewayIntentBits, PresenceUpdateStatus } = require('discord.js');
const { Status, appToken } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
const { exec } = require('child_process');
// 程式開始運作
console.log('SakuraBot v0.0.2\nMade By Skiawm91\n');
// 建立客戶端實作
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// 客戶端登入資訊
client.once(Events.ClientReady, readyClient => {
    console.log('[資訊] 登入成功！');
    console.log(`[資訊] 登入的應用程式: ${readyClient.user.tag}`);
    if (Status === 'DND') {
        console.log('[資訊] 狀態設為: Do Not Disturb')
        client.user.setStatus(PresenceUpdateStatus.DoNotDisturb)
    } else {
        console.log('[資訊] 狀態設為:', Status)
        client.user.setStatus(PresenceUpdateStatus.Status)
    }
});
// 監測錯誤
client.on(Events.ShardError, error => {
    console.error('[錯誤] 發生了錯誤:', error);
});
process.on('unhandledRejection', error => {
    console.error('[錯誤] 發生了錯誤:', error);
});
// 設定狀態

// 執行指令
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
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
// 指令交互
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`沒有與 ${interaction.commandName} 相符的指令！`);
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
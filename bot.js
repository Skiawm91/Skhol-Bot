// 這應該算是要求吧
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits} = require('discord.js');
const { token } = require('./config.json');
// 程式開始運作
console.log('SakuraBot v0.0.1');
console.log('Made by Skiawm91');
// 建立客戶端實作
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// 註冊指令
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
// 斜線指令交互
client.on(Events.InteractionCreate, async interaction => {
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
// 傳統指令交互
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
// 執行指令

// 客戶端登入資訊
client.once(Events.ClientReady, readyClient => {
    console.log('[資訊] 登入成功！');
    console.log(`[資訊] 登入的應用程式: ${readyClient.user.tag}`);
});
// 客戶端登入 Token
client.login(token);
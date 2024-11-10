// 這應該算是要求吧
const { Client, Collection, GatewayIntentBits, REST, Routes, EmbedBuilder, Partials } = require('discord.js');
try {
    require('./config');
} catch (error) {
    console.error("[錯誤] 未找到檔案！");
    console.warn("[警告] config.example.js 需改為 config.js！");
    process.exit(1);
}
const { clientID, appToken } = require('./config');
const fs = require('node:fs');
const path = require('node:path');
const ver = '0.4.0';
// 程式開始運作
console.log(`Skhol Bot v${ver}\nMade By Skiawm91\n`);
// 建立客戶端實作
const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });
module.exports= { ver, client }
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
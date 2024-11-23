// 這應該算是要求吧
const { Client, Collection, GatewayIntentBits, REST, Routes, Partials } = require('discord.js');
try {
    require('./config');
} catch (error) {
    console.error("[錯誤] 未找到檔案！");
    console.warn("[警告] config.example.js 需改為 config.js！");
    process.exit(1);
}
const { clientID, guildRegister, appToken } = require('./config');
const fs = require('node:fs');
const path = require('node:path');
const ver = '0.5.0';
// 程式開始運作
console.log(`Skhol Bot v${ver}\nMade By Skiawm91\n`);
// 建立客戶端實作
const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });
module.exports= { ver, client }
// 註冊指令
const commands = [];
const foldersPath = path.join(__dirname, 'Application/Commands');
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
        console.info(`[資訊] 開始註冊 ${commands.length} 條指令！\n`);
        if (guildRegister) {
            const guildID = require('./config');
            var data = await rest.put(
                Routes.applicationCommands(guildID),
                { body: commands },
            );
        } else {
            var data = await rest.put(
                Routes.applicationCommands(clientID),
                { body: commands },
            );
        }
        for (command of commands) {
            console.info(`[資訊] 被註冊的指令名稱：/${command.name}`)
        }
        console.info(`\n[資訊] 成功註冊 ${data.length} 條指令！\n`);
    } catch(error) {
        console.error(error);
    }
})();
// 創建新的資料庫
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
// 載入指令處理檔案
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
// 載入按鈕處理檔案
const ButtonPath = path.join(__dirname, 'Application/Buttons');
const ButtonFiles = fs.readdirSync(ButtonPath).filter(file => file.endsWith('.js'));
for (const file of ButtonFiles) {
    const filePath = path.join(ButtonPath, file);
    const Button = require(filePath);
    client.buttons.set(Button.data.custom_id, Button);
}
// 載入選單處理檔案
const selectMenuPath = path.join(__dirname, 'Application/SelectMenus');
const selectMenuFiles = fs.readdirSync(selectMenuPath).filter(file => file.endsWith('.js'));
for (const file of selectMenuFiles) {
    const filePath = path.join(selectMenuPath, file);
    const selectMenu = require(filePath);
    client.selectMenus.set(selectMenu.data.custom_id, selectMenu);
}
// 載入事件處理檔案
const eventsPath = path.join(__dirname, 'Application/Events/Event');
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
// 載入錯誤處理檔案
const errorsPath = path.join(__dirname, 'Application/Events/Error');
const errorFiles = fs.readdirSync(errorsPath).filter(file => file.endsWith('.js'));
for (const file of errorFiles) {
    const filePath = path.join(errorsPath, file);
    const error = require(filePath);
    if (error.process) {
        process.on(error.name, (...args) => error.execute(...args));
    } else {
        client.on(error.name, (...args) => error.execute(...args));
    }
}
// 客戶端登入 Token
client.login(appToken);
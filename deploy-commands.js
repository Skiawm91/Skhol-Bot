const { REST, Routes } = require('discord.js');
const { clientID, guildID, appToken } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const foldersPath = path.join(__dirname, 'commands');
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
        console.log(`[資訊] 成功註冊 ${data.length} 條指令！`);
    } catch(error) {
        console.error(error);
    }
})();
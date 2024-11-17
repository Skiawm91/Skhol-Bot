// 這應該算是要求吧
const { Events } = require('discord.js');
// 指令交互
module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isChatInputCommand()) {
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
                    await interaction.followUp({ content: '執行這個指令時出現錯誤！', ephemeral: true});
                } else {
                    await interaction.reply({ content: '執行這個指令時出現錯誤！', ephemeral: true });
                }
            }
        } else if (interaction.isButton()) {
            // 按鈕交互
        } else if (interaction.isStringSelectMenu()) {
            const selectMenu = interaction.client.selectMenus.get(interaction.customId);
            if (!selectMenu) {
                console.error(`[錯誤] 沒有與 ${interaction.customId} 相符的選單！`);
                return;
            }
            try {
                await selectMenu.execute(interaction);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: '執行這個選單時出現錯誤！', ephemeral: true});
                } else {
                    await interaction.reply({ content: '執行這個選單時出現錯誤！', ephemeral: true });
                }
            }
        }
    },
};
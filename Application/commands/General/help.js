// 這應該算是要求吧
const { SlashCommandBuilder ,EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, Component } = require('discord.js');
// 創建指令
module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('幫助使用者使用指令'),
    async execute(interaction) {
        const Embed = new EmbedBuilder()
            .setAuthor({ name: 'Skhol Bot', iconURL: 'https://skiawm91.github.io/Sakura_Inc/Skhol_Bot/Avatar.png', url: 'https://skiawm91.github.io/Sakura_Inc/Skhol_Bot' })
            .setDescription('歡迎使用 **Skhol Bot**！這裡是指令列表。\n在聊天欄輸入斜線 `/` 即可使用指令！\n選擇一個指令類別來取得指令詳細訊息！\n\n官方DC群組: [點擊加入！](https://discord.gg/CWM8zvs7ht)')
            .setFooter({ text: 'Made By Skiawm91' });
        const Select = new StringSelectMenuBuilder()
            .setCustomId('選擇指令類別')
            .setPlaceholder('選擇一個指令類別')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('一般指令')
                    .setDescription('所有使用者皆可用的指令')
                    .setValue('General'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('管理指令')
                    .setDescription('需要擁有管理權限才可使用的指令')
                    .setValue('Manage'),
            );
        const Row = new ActionRowBuilder()
            .setComponents(Select);
        await interaction.reply({ embeds: [Embed], components: [Row] });
    },
};
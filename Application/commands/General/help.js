// 這應該算是要求吧
const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ComponentType } = require('discord.js');
// 創建指令
module.exports = {
    data: {
        "name": "help",
        "type": 1,
        "description": "幫助使用者使用指令",
        "integration_types": [0, 1],
        "contexts": [0, 1, 2],
    },
    async execute(interaction) {
        await interaction.deferReply();
        const Embed = new EmbedBuilder()
            .setAuthor({ name: 'Skhol Bot', iconURL: 'https://skiawm91.github.io/Skhol-Dev/Skhol_Bot/Avatar.png', url: 'https://skiawm91.github.io/Sakura_Inc/Skhol_Bot' })
            .setDescription('歡迎使用 **Skhol Bot**！這裡是指令列表。\n在聊天欄輸入斜線 `/` 即可使用指令！\n選擇一個指令類別來取得指令詳細訊息！\n\n官方DC群組: [點擊加入！](https://discord.gg/CWM8zvs7ht)')
            .setFooter({ text: 'Made By Skiawm91' });
        const Select = new StringSelectMenuBuilder()
            .setCustomId('選擇指令類別')
            .setPlaceholder('選擇一個指令類別')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('開發者指令')
                    .setDescription('這個應用的開發者才可使用的指令')
                    .setValue('Developer'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('有趣的指令')
                    .setDescription('所有使用者皆可用的指令 (Fun)')
                    .setValue('Fun'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('一般指令')
                    .setDescription('所有使用者皆可用的指令')
                    .setValue('General'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('管理指令')
                    .setDescription('需要擁有管理權限才可使用的指令')
                    .setValue('Manage'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('訊息指令')
                    .setDescription('讓應用程式傳送訊息')
                    .setValue('Message'),
            );
        const Row = new ActionRowBuilder()
            .setComponents(Select);
        const response = await interaction.followUp({ embeds: [Embed], components: [Row] });
        const collector = response.createMessageComponentCollector({ componentType: ComponentType.StringSelect });
        collector.on('collect', async i => {
            await i.deferReply({ ephemeral: true });
            const selection = i.values[0];
            switch (selection) {
                case 'Developer':
                    const devEmbed = new EmbedBuilder()
                        .setTitle('指令列表 - 開發者指令')
                        .setDescription('testerror - 讓應用程式發送測試錯誤訊息至日誌頻道');
                    await i.followUp({ embeds: [devEmbed] });
                    break;
                case 'Fun':
                    const funEmbed = new EmbedBuilder()
                        .setTitle('指令列表 - 有趣的指令')
                        .setDescription('fun-button - 創建一個有趣的按鈕\nminecraft player - 取得 Minecraft 玩家資訊\nminecraft server - 取得 Minecraft 伺服器資訊');
                    await i.followUp({ embeds: [funEmbed] });
                    break;
                case 'General':
                    const generalEmbed = new EmbedBuilder()
                        .setTitle('指令列表 - 一般指令')
                        .setDescription('help - 幫助使用者使用指令\nping - 回傳應用程式的狀態\ninfo user - 取得使用者的資訊\ninfo server - 取得伺服器的資訊');
                    await i.followUp({ embeds: [generalEmbed] });
                    break;
                case 'Manage':
                    const manageEmbed = new EmbedBuilder()
                        .setTitle('指令列表 - 管理指令')
                        .setDescription('kick - 將成員踢出伺服器\nban - 將使用者禁止進入伺服器\ntimeout - 將使用者禁言');
                    await i.followUp({ embeds: [manageEmbed] });
                    break;
                case 'Message':
                    const msgEmbed = new EmbedBuilder()
                        .setTitle('指令列表 - 訊息指令')
                        .setDescription('send - 傳送訊息至指定頻道');
                    await i.followUp({ embeds: [msgEmbed] });
                    break;
            }
        })
    },
};
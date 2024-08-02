// 這應該算是要求吧
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
// 創建指令
module.exports = {
    data: new SlashCommandBuilder()
        .setName('fun-button')
        .setDescription('創建一個有趣的按鈕')
        .addChannelOption((option) =>
            option
                .setName('頻道')
                .setDescription('指定頻道')
                .setRequired(true))
        .addStringOption((option) =>
            option
                .setName('按鈕名稱')
                .setDescription('給這個按鈕一個名稱')
                .setRequired(true))
        .addStringOption((option) =>
            option
                .setName('訊息')
                .setDescription('給這個按鈕一個互動訊息 (或GIF)')
                .setRequired(true)),
    async execute(interaction) {
        const channel = interaction.options.getChannel('頻道');
        const message = interaction.options.getString('訊息').replaceAll('\\n', '\n');
        const Button = new ButtonBuilder()
            .setCustomId('button')
            .setLabel(interaction.options.getString('按鈕名稱'))
            .setStyle(ButtonStyle.Primary);
        const Row = new ActionRowBuilder()
            .addComponents(Button);
        await interaction.reply({ content: '訊息已被發送！', ephemeral: true });
        const response = await channel.send({ components: [Row] });
        const collector = response.createMessageComponentCollector({ componentType: ComponentType.Button });
        collector.on('collect', async interaction => {
            if (interaction.customId == 'button') {
                await interaction.reply({ content: message, ephemeral: true });
            }
        });
    },
};
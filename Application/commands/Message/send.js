// 這應該算是要求吧
const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
// 創建指令
module.exports = {
    data: new SlashCommandBuilder()
        .setName('send')
        .setDescription('傳送訊息至指定頻道')
        .addChannelOption((option) =>
            option
                .setName('頻道')
                .setDescription('指定頻道')
                .setRequired(true))
        .addBooleanOption((option) =>
            option
                .setName('嵌入式')
                .setDescription('使用嵌入式訊息')
                .setRequired(true))
        .addStringOption((option) =>
            option
                .setName('訊息')
                .setDescription('輸入你想發送的訊息'))
        .addStringOption((option) =>
            option
                .setName('頁首')
                .setDescription('嵌入式 - Author'))
        .addStringOption((option) =>
            option
                .setName('頁首圖示網址')
                .setDescription('嵌入式 - Author Icon URL'))
        .addStringOption((option) =>
            option
                .setName('頁首網址')
                .setDescription('嵌入式 - Author URL'))
        .addStringOption((option) =>
            option
                .setName('標題')
                .setDescription('嵌入式 - Title'))
        .addStringOption((option) =>
            option
                .setName('標題網址')
                .setDescription('嵌入式 - Title URL'))
        .addStringOption((option) =>
            option
                .setName('內文')
                .setDescription('嵌入式 - Description'))
        .addStringOption((option) =>
            option
                .setName('頁尾')
                .setDescription('嵌入式 - Footer'))
        .addStringOption((option) =>
            option
                .setName('頁尾圖示網址')
                .setDescription('嵌入式 - Footer Icon URL')),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        const channel = interaction.options.getChannel('頻道');
        if (interaction.options.getString('訊息')) {var message = interaction.options.getString('訊息').replaceAll('\\n', '\n');} else {var message = interaction.options.getString('訊息');}
        if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {} else {var message = message.replaceAll('@everyone', '')}
        await interaction.followUp({ content: '訊息已被發送！' })
        if (interaction.options.getBoolean('嵌入式') == true) {
            var Embed = new EmbedBuilder()
                .setAuthor({ name: interaction.options.getString('頁首'), iconURL: interaction.options.getString('頁首圖示網址'), url: interaction.options.getString('頁首網址') })
                .setTitle(interaction.options.getString('標題'))
                .setURL(interaction.options.getString('標題網址'))
                .setDescription(interaction.options.getString('內文').replaceAll('\\n', '\n'))
                .setFooter({ text: interaction.options.getString('頁尾'), iconURL: interaction.options.getString('頁尾圖示網址') });
            if (message) {
                channel.send({ content: message, embeds: [Embed] }).catch(error => {
                    interaction.editReply('未成功發送訊息！');
                });
            } else {
                channel.send({ embeds: [Embed] }).catch(error => {
                    interaction.editReply('未成功發送訊息！');
                });
            }
        } else {
            channel.send(message).catch(error => {
                interaction.editReply('未成功發送訊息！')
            });
        }
    },
};
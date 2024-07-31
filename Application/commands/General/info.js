// 這應該算是要求吧
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
// 創建指令
module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('取得資訊')
        .addSubcommand((subcommand) =>
            subcommand
                .setName('user')
                .setDescription('取得使用者的資訊')
                .addUserOption((option) =>
                    option
                        .setName('使用者')
                        .setDescription('指定使用者')),
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('server')
                .setDescription('取得伺服器的資訊'),
        ),
    async execute(interaction) {
        if (interaction.options.getSubcommand() == 'user') {
            if (interaction.options.getUser('使用者')) {
                const Embed = new EmbedBuilder()
                    .setThumbnail(interaction.options.getUser('使用者').displayAvatarURL({ size: 512, dynamic: true }))
                    .setTitle('使用者資訊')
                    .setDescription(`使用者：${interaction.options.getUser('使用者').username} (${interaction.options.getUser('使用者').id})\n帳號創建日期：${interaction.options.getUser('使用者').createdAt}`);
                await interaction.reply({ embeds: [Embed] })
            } else {
                const Embed = new EmbedBuilder()
                    .setThumbnail(interaction.user.displayAvatarURL({ size: 512, dynamic: true }))
                    .setTitle('使用者資訊')
                    .setDescription(`使用者：${interaction.user.username} (${interaction.user.id})\n帳號創建日期：${interaction.user.createdAt}`);
                await interaction.reply({ embeds: [Embed] });
            }
        } else if (interaction.options.getSubcommand() == 'server') {
            const Embed = new EmbedBuilder()
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setTitle('伺服器資訊')
            .setDescription(`伺服器：${interaction.guild.name} (${interaction.guild.id})\n創建日期：${interaction.guild.createdAt}\n伺服器人數: ${interaction.guild.memberCount}\n擁有者: <@${interaction.guild.ownerId}>`);
            await interaction.reply({ embeds: [Embed] });
        }
    },
};
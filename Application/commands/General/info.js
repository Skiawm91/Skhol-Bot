// 這應該算是要求吧
const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
// 創建指令
module.exports = {
    data: {
        "name": "info",
        "type": 1,
        "description": "取得資訊",
        "options": [
            {
                "name": "user",
                "type": ApplicationCommandOptionType.Subcommand,
                "description": "取得使用者的資訊",
                "options": [
                    {
                        "name": "使用者",
                        "type": ApplicationCommandOptionType.User,
                        "description": "指定使用者",
                    }
                ],
            },
            {
                "name": "server",
                "type": ApplicationCommandOptionType.Subcommand,
                "description": "取得伺服器的資訊",
            },
        ],
        "integration_types": [0, 1],
        "contexts": [0, 1, 2],
    },
    async execute(interaction) {
        if (interaction.options.getSubcommand() == 'user') {
            await interaction.deferReply();
            if (interaction.options.getUser('使用者')) {
                const Embed = new EmbedBuilder()
                    .setThumbnail(interaction.options.getUser('使用者').displayAvatarURL({ size: 512, dynamic: true }))
                    .setTitle(':white_check_mark: 使用者資訊')
                    .addFields(
                        {name: '**顯示名稱**', value: `${interaction.options.getUser('使用者').displayName}`, inline: false },
                        {name: '**使用者名稱**', value: `${interaction.options.getUser('使用者').username} (${interaction.options.getUser('使用者').id})`, inline: false },
                        {name: '**帳號創建日期**', value: `${interaction.options.getUser('使用者').createdAt}`, inline: false },
                    );
                await interaction.followUp({ embeds: [Embed] })
            } else {
                const Embed = new EmbedBuilder()
                    .setThumbnail(interaction.user.displayAvatarURL({ size: 512, dynamic: true }))
                    .setTitle(':white_check_mark: 使用者資訊')
                    .addFields(
                        {name: '**顯示名稱**', value: `${interaction.user.displayName}`, inline: false },
                        {name: '**使用者名稱**', value: `${interaction.user.username} (${interaction.user.id})`, inline: false },
                        {name: '**帳號創建日期**', value: `${interaction.user.createdAt}`, inline: false },
                    );
                await interaction.followUp({ embeds: [Embed] });
            }
        } else if (interaction.options.getSubcommand() == 'server') {
            if (interaction.channel.type == 1) {
                await interaction.deferReply({ ephemeral: true });
                await interaction.followUp("此處不能執行這條指令！");
                return;
            }
            await interaction.deferReply();
            const Embed = new EmbedBuilder()
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setTitle('伺服器資訊')
            .setDescription(`伺服器：${interaction.guild.name} (${interaction.guild.id})\n創建日期：${interaction.guild.createdAt}\n伺服器人數: ${interaction.guild.memberCount}\n擁有者: <@${interaction.guild.ownerId}>`);
            await interaction.followUp({ embeds: [Embed] });
        }
    },
};
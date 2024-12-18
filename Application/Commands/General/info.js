// 這應該算是要求吧
const { ApplicationCommandOptionType } = require('discord.js');
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
                if (interaction.options.getUser('使用者').discriminator !== '0') {
                    var userName = `${interaction.options.getUser('使用者').username}#${interaction.options.getUser('使用者').discriminator}`
                } else {
                    var userName = `${interaction.options.getUser('使用者').username}`
                }
                const Embed = {
                    "thumbnail": {
                        "url": interaction.options.getUser('使用者').displayAvatarURL({ size: 512, dynamic: true }),
                    },
                    "title": "✅ 使用者資訊",
                    "fields": [
                        {
                            "name": "**顯示名稱**",
                            "value": `${interaction.options.getUser('使用者').displayName}`,
                        },
                        {
                            "name": "**使用者名稱**",
                            "value": `${userName}`,
                        },
                        {
                            "name": "**使用者 ID**",
                            "value": `${interaction.options.getUser('使用者').id}`,
                        },
                        {
                            "name": "**帳號創建日期**",
                            "value": `${interaction.options.getUser('使用者').createdAt}`,
                        },
                    ],
                    "color": Math.floor(Math.random() * 0xFFFFFF),
                };
                await interaction.followUp({ embeds: [Embed] })
            } else {
                if (interaction.user.discriminator !== '0') {
                    var userName = `${interaction.user.username}#${interaction.user.discriminator}`
                } else {
                    var userName = `${interaction.user.username}`
                }
                const Embed = {
                    "thumbnail": {
                        "url": interaction.user.displayAvatarURL({ size: 512, dynamic: true }),
                    },
                    "title": "✅ 使用者資訊",
                    "fields": [
                        {
                            "name": "**顯示名稱**",
                            "value": `${interaction.user.displayName}`
                        },
                        {
                            "name": "**使用者名稱**",
                            "value": `${userName} (${interaction.user.id})`
                        },
                        {
                            "name": "**帳號創建日期**",
                            "value": `${interaction.user.createdAt}`
                        },
                    ],
                    "color": Math.floor(Math.random() * 0xFFFFFF),
                };
                await interaction.followUp({ embeds: [Embed] });
            }
        } else if (interaction.options.getSubcommand() == 'server') {
            if (!interaction.guild) {
                if (!interaction.channel || interaction.channel?.type == 1 || interaction.channel?.type == 3) {
                    await interaction.deferReply({ ephemeral: true });
                    await interaction.followUp("此處不能執行這條指令！");
                    return;
                }
            } else if (!interaction.channel) {
                await interaction.deferReply({ ephemeral: true });
                await interaction.followUp("此處不能執行這條指令！");
                return;
            }
            await interaction.deferReply();
            const Embed = {
                "thumbnail": {
                    "url": interaction.guild.iconURL({ dynamic: true }),
                },
                "title": "✅ 伺服器資訊",
                "fields": [
                    {
                        "name": "伺服器名稱",
                        "value": `${interaction.guild.name}`,
                    },
                    {
                        "name": "伺服器 ID",
                        "value": `${interaction.guild.id}`,
                    },
                    {
                        "name": "伺服器人數",
                        "value": `${interaction.guild.memberCount}`,
                    },
                    {
                        "name": "擁有者",
                        "value": `<@${interaction.guild.ownerId}>`,
                    },
                ],
                "color": Math.floor(Math.random() * 0xFFFFFF),
            };
            await interaction.followUp({ embeds: [Embed] });
        }
    },
};
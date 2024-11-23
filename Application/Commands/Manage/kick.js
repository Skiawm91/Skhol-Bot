// 這應該算是要求吧
const { PermissionFlagsBits, ApplicationCommandOptionType } = require('discord.js');
// 創建指令
module.exports = {
    data: {
        "name": "kick",
        "type": 1,
        "description": "將使用者踢出伺服器",
        "options": [
            {
                "name": "使用者",
                "type": ApplicationCommandOptionType.User,
                "description": "指定使用者",
                "required": true,
            },
            {
                "name": "原因",
                "type": ApplicationCommandOptionType.String,
                "description": "填寫原因",
            }
        ],
        "default_member_permissions": String(PermissionFlagsBits.KickMembers | PermissionFlagsBits.BanMembers),
        "integration_types": [0],
        "contexts": [0],
    },
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        const member = interaction.options.getMember('使用者');
        await interaction.fullowUp({ content: `使用者 ${member} 已被踢出伺服器！\n原因: ${interaction.options.getString('原因')}` });
        member.kick(reason=interaction.options.getString('原因')).catch(error => {
                interaction.editReply({ content: `使用者 ${interaction.options.getMember('使用者')} 已被踢出伺服器！\n原因: ${interaction.options.getString('原因')}\n\n[錯誤] 無法踢出該使用者！` });
        });
    },
};
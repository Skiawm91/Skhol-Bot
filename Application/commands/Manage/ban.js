// 這應該算是要求吧
const { PermissionFlagsBits, ApplicationCommandOptionType } = require('discord.js');
// 創建指令
module.exports = {
    data: {
        "name": "ban",
        "description": "將使用者禁止進入伺服器",
        "options": [
            {
                "name": "使用者",
                "type": ApplicationCommandOptionType.User,
                "description": "指定使用者",
                "required": true,
            },
            {
                "name" : "原因",
                "type": ApplicationCommandOptionType.String,
                "description": "填寫原因",
            },
        ],
        "default_member_permissions": String(PermissionFlagsBits.BanMembers),
        "integration_types": [0],
        "contexts": [0],
    },
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        const user = interaction.options.getUser('使用者');
        await interaction.followUp({ content: `使用者 ${interaction.options.getMember('使用者')} 已被禁止進入伺服器！\n原因: ${interaction.options.getString('原因')}` });
        interaction.guild.members.ban(user, {reason: interaction.options.getString('原因')}).catch(error => {
                interaction.editReply({ content: `使用者 ${interaction.options.getMember('使用者')} 已被禁止進入伺服器！\n原因: ${interaction.options.getString('原因')}\n\n[錯誤] 無法禁止該使用者！` });
        });
    },
};
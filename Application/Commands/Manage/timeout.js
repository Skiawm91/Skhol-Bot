// 這應該算是要求吧
const { PermissionFlagsBits, ApplicationCommandOptionType } = require('discord.js');
// 創建指令
module.exports = {
    data: {
        "name": "timeout",
        "type": 1,
        "description": "將使用者禁言",
        "options": [
            {
                "name": "使用者",
                "type": ApplicationCommandOptionType.User,
                "description": "指定使用者",
                "required": true,
            },
            {
                "name": "時間",
                "type": ApplicationCommandOptionType.Number,
                "description": "設定被禁言的時間 (秒)",
                "required": true,
            },
            {
                "name": "原因",
                "type": ApplicationCommandOptionType.String,
                "description": "填寫原因",
            },
        ],
        "default_member_permissions": String(PermissionFlagsBits.KickMembers | PermissionFlagsBits.BanMembers),
        "integration_types": [0],
        "contexts": [0],
    },
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        const member = interaction.options.getMember('使用者');
        const time = interaction.options.getNumber('時間');
        await interaction.followUp({ content: `使用者 ${member} 已被禁言！\n時間: ${time}秒\n原因: ${interaction.options.getString('原因')}` });
        member.timeout(time * 1000, interaction.options.getString('原因')).catch(error => {
            interaction.editReply({ content: `使用者 ${interaction.options.getMember('使用者')} 已被禁言！\n時間: ${time}秒\n原因: ${interaction.options.getString('原因')}\n\n[錯誤] 無法禁言該使用者！` });
        });
    },
};
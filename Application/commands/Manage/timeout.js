// 這應該算是要求吧
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
// 創建指令
module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('將使用者禁言')
        .addUserOption((option) =>
            option
                .setName('使用者')
                .setDescription('指定使用者')
                .setRequired(true))
        .addNumberOption((option) =>
            option
                .setName('時間')
                .setDescription('設定被禁言的時間 (秒)')
                .setRequired(true))
        .addStringOption((option) =>
            option
                .setName('原因')
                .setDescription('填寫原因'))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers | PermissionFlagsBits.BanMembers),
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
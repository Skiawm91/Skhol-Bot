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
                        .setDescription('設定被禁言的時間 (秒)'))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers | PermissionFlagsBits.BanMembers),
    async execute(interaction) {
        const member = interaction.options.getMember('使用者');
        const timeout = interaction.options.getNumber('時間');
        member.timeout(timeout);
        await interaction.reply({ content: `使用者 ${member} 已被禁言！\n時間: ${interaction.options.getNumber('時間')}秒`, ephemeral: true });
    }
}
// 這應該算是要求吧
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
// 創建指令
module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('將使用者踢出伺服器')
        .addUserOption((option) =>
            option
                .setName('使用者')
                .setDescription('指定使用者')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers | PermissionFlagsBits.BanMembers),
    async execute(interaction) {
        const member = interaction.options.getMember('使用者');
        await member.kick();
        await interaction.reply({ content: `使用者 ${interaction.options.getMember('使用者')} 已被踢出伺服器！`, ephemeral: true });
    }
}
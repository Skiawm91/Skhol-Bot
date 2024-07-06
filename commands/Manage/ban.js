// 這應該算是要求吧
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
// 創建指令
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('將使用者禁止進入伺服器')
        .addUserOption((option) =>
            option
                .setName('使用者')
                .setDescription('指定使用者')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers | PermissionFlagsBits.BanMembers),
    async execute(interaction) {
        const user = interaction.options.getUser('使用者');
        interaction.guild.members.ban(user);
        await interaction.reply({ content: `使用者 ${interaction.options.getMember('使用者')} 已被禁止進入伺服器！`, ephemeral: true });
    }
}
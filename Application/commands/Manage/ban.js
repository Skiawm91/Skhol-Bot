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
        .addStringOption((option) =>
            option
                .setName('原因')
                .setDescription('填寫原因'))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction) {
        const user = interaction.options.getUser('使用者');
        await interaction.reply({ content: `使用者 ${interaction.options.getMember('使用者')} 已被禁止進入伺服器！\n原因: ${interaction.options.getString('原因')}`, ephemeral: true });
        interaction.guild.members.ban(user, {reason: interaction.options.getString('原因')}).catch(error => {
                interaction.editReply({ content: `使用者 ${interaction.options.getMember('使用者')} 已被禁止進入伺服器！\n原因: ${interaction.options.getString('原因')}\n\n[錯誤] 無法禁止該使用者！`, ephemeral: true });
        });
    },
};
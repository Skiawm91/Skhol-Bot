module.exports = {
    data: {
        "custom_id": "help_menu",
    },
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        const selection = interaction.values[0];
        switch (selection) {
            case 'Developer':
                const devEmbed = {
                    "title": "指令列表 - 開發者指令",
                    "description": "testerror - 讓應用程式發送測試錯誤訊息至日誌頻道",
                    "color": Math.floor(Math.random() * 0xFFFFFF),
                };
                await interaction.followUp({ embeds: [devEmbed] });
                break;
            case 'Fun':
                const funEmbed = {
                    "title": "指令列表 - 有趣的指令",
                    "description": "fun-button - 創建一個有趣的按鈕\nminecraft player - 取得 Minecraft 玩家資訊\nminecraft server - 取得 Minecraft 伺服器資訊",
                    "color": Math.floor(Math.random() * 0xFFFFFF),
                };
                await interaction.followUp({ embeds: [funEmbed] });
                break;
            case 'General':
                const generalEmbed = {
                    "title": "指令列表 - 一般指令",
                    "description": "help - 幫助使用者使用指令\nping - 回傳應用程式的狀態\ninfo user - 取得使用者的資訊\ninfo server - 取得伺服器的資訊",
                    "color": Math.floor(Math.random() * 0xFFFFFF),
                };
                await interaction.followUp({ embeds: [generalEmbed] });
                break;
            case 'Manage':
                const manageEmbed = {
                    "title": "指令列表 - 管理指令",
                    "description": "kick - 將成員踢出伺服器\nban - 將使用者禁止進入伺服器\ntimeout - 將使用者禁言",
                    "color": Math.floor(Math.random() * 0xFFFFFF),
                };
                await interaction.followUp({ embeds: [manageEmbed] });
                break;
            case 'Message':
                const msgEmbed = {
                    "title": "指令列表 - 訊息指令",
                    "description": "send - 傳送訊息至指定頻道",
                    "color": Math.floor(Math.random() * 0xFFFFFF),
                };
                await interaction.followUp({ embeds: [msgEmbed] });
                break;
        }
    },
}
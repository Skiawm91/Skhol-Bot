// 這應該算是要求吧
const { ComponentType } = require('discord.js');
// 創建指令
module.exports = {
    data: {
        "name": "help",
        "type": 1,
        "description": "幫助使用者使用指令",
        "integration_types": [0, 1],
        "contexts": [0, 1, 2],
    },
    async execute(interaction) {
        await interaction.deferReply();
        const Embed = {
            "author": {
                "name": "Skhol Bot",
                "icon_url": "https://skiawm91.github.io/Skhol-Dev/Skhol_Bot/Avatar.png",
                "url": "https://skiawm91.github.io/Sakura_Inc/Skhol_Bot",
            },
            "description": "歡迎使用 **Skhol Bot**！這裡是指令列表。\n在聊天欄輸入斜線 `/` 即可使用指令！\n選擇一個指令類別來取得指令詳細訊息！\n\n官方DC群組: [點擊加入！](https://discord.gg/CWM8zvs7ht)",
            "footer": {
                "text": "Made By Skiawm91",
            },
            "color": Math.floor(Math.random() * 0xFFFFFF), 
        };
        const Select = {
            "type": ComponentType.StringSelect,
            "custom_id": "help_menu",
            "placeholder": "選擇一個指令類別",
            "options": [
                {
                    "label": "開發者指令",
                    "description": "這個應用的開發者才可使用的指令",
                    "value": "Developer"
                },
                {
                    "label": "有趣的指令",
                    "description": "所有使用者皆可用的指令 (Fun)",
                    "value": "Fun"
                },
                {
                    "label": "一般指令",
                    "description": "所有使用者皆可用的指令",
                    "value": "General"
                },
                {
                    "label": "訊息指令",
                    "description": "讓應用程式傳送訊息",
                    "value": "Message"
                },
            ],
        };
        const Row = {
            "type": ComponentType.ActionRow,
            "components": [Select],
        };
        await interaction.followUp({ embeds: [Embed], components: [Row] });
    },

};
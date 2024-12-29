// 這應該算是要求吧
const fs = require('node:fs');
const { ButtonStyle, ComponentType, ApplicationCommandOptionType } = require('discord.js');
// 創建指令
module.exports = {
    data: {
        "name": "fun-button",
        "description": "創建一個有趣的按鈕",
        "options": [
            {
                "name": "頻道",
                "type": ApplicationCommandOptionType.Channel,
                "description": "指定頻道",
                "required": true,
            },
            {
                "name": "按鈕名稱",
                "type": ApplicationCommandOptionType.String,
                "description": "給這個按鈕一個名稱",
                "required": true,
            },
            {
                "name": "訊息",
                "type": ApplicationCommandOptionType.String,
                "description": "給這個按鈕一個互動訊息",
                "required": true,
            },
        ],
        "integration_types": [0, 1],
        "contexts": [0, 1, 2],
    },
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        const channel = interaction.options.getChannel("頻道");
        const message = interaction.options.getString('訊息').replaceAll('\\n', '\n');
        const label = interaction.options.getString("按鈕名稱");
        const id = Math.floor(Math.random() * 900000) + 100000;
        const buttonData = {
            id,
            label,
            message,
        }
        const filePath = 'Application/Buttons/fun-button_data.json';
        if (!fs.existsSync(filePath)) {
            const initialData = {
                buttons: []
            };
            fs.writeFileSync(filePath, JSON.stringify(initialData, null, 4), 'utf8');
        }
        let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        data.buttons.push(buttonData);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        const Button = {
            "type": ComponentType.Button,
            "custom_id": `fun-button_reply_${id}`,
            "label": label,
            "style": ButtonStyle.Primary,
        }
        const Row = {
            "type": ComponentType.ActionRow,
            "components": [Button],
        }
        await interaction.followUp({ content: '訊息已被發送！' });
        if (interaction.channel.type == 1 || interaction.channel.type == 3) {await interaction.followUp({ components: [Row] }); } else {await channel.send({ components: [Row] }); }
    },
};
// 這應該算是要求吧
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
        const Button = {
            "type": ComponentType.Button,
            "custom_id": "fun-button_reply",
            "label": interaction.options.getString("按鈕名稱"),
            "style": ButtonStyle.Primary,
        };
        const Row = {
            "type": ComponentType.ActionRow,
            "components": [Button],
        };
        await interaction.followUp({ content: '訊息已被發送！' });
        if (interaction.channel.type == 1 || interaction.channel.type == 3) { var response = await interaction.followUp({ components: [Row] }); } else { var response = await channel.send({ components: [Row] }); }
        const collector = response.createMessageComponentCollector({ componentType: ComponentType.Button });
        collector.on('collect', async interaction => {
            if (interaction.customId == 'fun-button_reply') {
                await interaction.deferReply({ ephemeral: true });
                await interaction.followUp({ content: message });
            }
        });
    },
};
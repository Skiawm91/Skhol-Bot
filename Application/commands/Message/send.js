// 這應該算是要求吧
const { PermissionsBitField, ApplicationCommandOptionType } = require('discord.js');
// 創建指令
module.exports = {
    data: {
        "name": "send",
        "type": 1,
        "description": "傳送訊息至指定頻道",
        "options": [
            {
                "name": "頻道",
                "type": ApplicationCommandOptionType.Channel,
                "description": "指定頻道",
                "required": true,
            },
            {
                "name": "嵌入式",
                "type": ApplicationCommandOptionType.Boolean,
                "description": "使用嵌入式訊息",
                "required": true,
            },
            {
                "name": "訊息",
                "type": ApplicationCommandOptionType.String,
                "description": "輸入你想發送的訊息",
            },
            {
                "name": "頁首",
                "type": ApplicationCommandOptionType.String,
                "description": "嵌入式 - Author",
            },
            {
                "name": "頁首圖示網址",
                "type": ApplicationCommandOptionType.String,
                "description": "嵌入式 - Author Icon URL",
            },
            {
                "name": "頁首網址",
                "type": ApplicationCommandOptionType.String,
                "description": "嵌入式 - Author URL",
            },
            {
                "name": "標題",
                "type": ApplicationCommandOptionType.String,
                "description": "嵌入式 - Title",
            },
            {
                "name": "標題網址",
                "type": ApplicationCommandOptionType.String,
                "description": "嵌入式 - Title URL",
            },
            {
                "name": "內文",
                "type": ApplicationCommandOptionType.String,
                "description": "嵌入式 - Description",
            },
            {
                "name": "頁尾",
                "type": ApplicationCommandOptionType.String,
                "description": "嵌入式 - Footer",
            },
            {
                "name": "頁尾圖示網址",
                "type": ApplicationCommandOptionType.String,
                "description": "嵌入式 - Footer Icon URL",
            },
            {
                "name": "顏色",
                "type": ApplicationCommandOptionType.String,
                "description": "嵌入式 - Color",
            },
        ],
        "integration_types": [0, 1],
        "contexts": [0, 1, 2],
    },
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        const channel = interaction.options.getChannel('頻道');
        if (interaction.options.getString('訊息')) {var message = interaction.options.getString('訊息').replaceAll('\\n', '\n');} else {var message = interaction.options.getString('訊息');}
        if (message) {
            if (interaction.channel.type === 1 || interaction.channel.type === 3) {} else {if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {var message = message.replaceAll('@everyone', '')}}
        }
        let color;
        if (interaction.options.getString('顏色').startsWith('#')) {
            color = parseInt(interaction.options.getString('顏色').slice(1), 16);
        } else {
            color = null;
        }
        await interaction.followUp({ content: '訊息已被發送！' });
        if (interaction.options.getBoolean('嵌入式') == true) {
            var Embed = {
                "author": {
                    "name": interaction.options.getString('頁首'),
                    "icon_url": interaction.options.getString('頁首圖示網址'),
                    "url": interaction.options.getString('頁首網址'),
                },
                "title": interaction.options.getString('標題'),
                "url": interaction.options.getString('標題網址'),
                "description": interaction.options.getString('內文').replaceAll('\\n', '\n'),
                "footer": {
                    "text": interaction.options.getString('頁尾'),
                    "icon_url": interaction.options.getString('頁尾圖示網址'),
                },
                "color": color,
            };
            if (message) {
                if (interaction.channel.type == 1 || interaction.channel.type == 3) {
                    interaction.followUp({ content: message, embeds: [Embed] }).catch(error => {
                        interaction.editReply('未成功發送訊息！');
                    });
                } else {
                    channel.send({ content: message, embeds: [Embed] }).catch(error => {
                        interaction.editReply('未成功發送訊息！');
                    });
                }
            } else {
                if (interaction.channel.type == 1 || interaction.channel.type == 3) {
                    interaction.followUp({ embeds: [Embed] }).catch(error => {
                        interaction.editReply('未成功發送訊息！');
                    });
                } else {
                    channel.send({ embeds: [Embed] }).catch(error => {
                        interaction.editReply('未成功發送訊息！');
                    });
                }
            }
        } else {
            if (interaction.channel.type == 1 || interaction.channel.type == 3) {
                interaction.followUp({ content: message }).catch(error => {
                    interaction.editReply('未成功發送訊息！');
                });
            } else {
                channel.send({ content: message }).catch(error => {
                    interaction.editReply('未成功發送訊息！');
                });
            }
        }
    },
};
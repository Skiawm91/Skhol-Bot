// 這應該算是要求吧
const { ApplicationCommandOptionType } = require('discord.js');
const axios = require('axios');
// 創建指令
module.exports = {
    data: {
        "name": "minecraft",
        "type": 1,
        "description": "取得 Minecraft 資訊",
        "options": [
            {
                "name": "player",
                "type": ApplicationCommandOptionType.Subcommand,
                "description": "取得 Minecraft 玩家資訊",
                "options": [
                    {
                        "name": "玩家",
                        "type": ApplicationCommandOptionType.String,
                        "description": "輸入玩家ID",
                        "required": true,
                    },
                ],
            },
            {
                "name": "server",
                "type": ApplicationCommandOptionType.Subcommand,
                "description": "取得 Minecraft 伺服器資訊",
                "options": [
                    {
                        "name": "伺服器",
                        "type": ApplicationCommandOptionType.String,
                        "description": "輸入伺服器Host",
                        "required": true,
                    },
                    {
                        "name": "基岩版",
                        "type": ApplicationCommandOptionType.Boolean,
                        "description": "伺服器是否為基岩版",
                        "required": true,
                    },
                ],
            },
        ],
        "integration_types": [0, 1],
        "contexts": [0, 1, 2],
    },
    async execute(interaction) {
        await interaction.deferReply();
        if (interaction.options.getSubcommand() == 'player') {
            const id = interaction.options.getString('玩家');
            if (id.length < 16 || id.length > 3) {
                const target = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${id}`);
                const data = target.data;
                const uuid = data.id;
                const skin = `https://crafatar.com/skins/${uuid}.png`;
                const avatar = `https://cravatar.eu/avatar/${uuid}/128.png`;
                const Embed = {
                    "author": {
                        "name": `玩家 ${id} 的資訊`,
                    },
                    "thumbnail": {
                        "url": avatar,
                    },
                    "description": `UUID: ${uuid}\nSkin: [下載](${skin})`,
                    "color": Math.floor(Math.random() * 0xFFFFFF),
                }
                await interaction.followUp({ embeds: [Embed] });
            } else {
                await interaction.followUp({ content: '玩家ID在3~16個字元之間！', ephemeral: true });
            }
        } else if (interaction.options.getSubcommand() == 'server') {
            const host = interaction.options.getString('伺服器');
            if (interaction.options.getBoolean('基岩版') == true) {
                var target = await axios.get(`https://api.mcstatus.io/v2/status/bedrock/${host}`);
            } else {
                var target = await axios.get(`https://api.mcstatus.io/v2/status/java/${host}`);
            }
            const data = target.data;
            if (!data.ip_address) {
                await interaction.followUp(`伺服器 ${host} 不存在！`);
            } else {
                const online = data.online;
                const address = data.ip_address;
                const port = data.port;
                const version = data.version.name ?? data.version.name_clean;
                const motd = data.motd.clean;
                const onlineplayer = data.players.online;
                const maxplayer = data.players.max;
                const Embed = {
                    "author": {
                        "name": `伺服器 ${host} 的資訊`,
                    },
                    "fields": [
                        {
                            "name": "**是否在線**",
                            "value": `${online}`,
                            "inline": true
                        },
                        {
                            "name": "**IP**",
                            "value": `${address}`,
                            "inline": true
                        },
                        {
                            "name": "**Port**",
                            "value": `${port}`,
                            "inline": true
                        },
                        {
                            "name": "**版本**",
                            "value": `${version}`,
                            "inline": true
                        },
                        {
                            "name": "**玩家**",
                            "value": `${onlineplayer}/${maxplayer}`,
                            "inline": true
                        },
                        {
                            "name": "**描述**",
                            "value": `${motd}`,
                            "inline": false
                        },
                    ],
                    "color": Math.floor(Math.random() * 0xFFFFFF),
                };
                await interaction.followUp({ embeds: [Embed] });
            }
        }
    },
};
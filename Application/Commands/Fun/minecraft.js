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
                    }
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
                        "name": `✅ 玩家 ${id} 的資訊`,
                    },
                    "thumbnail": {
                        "url": avatar,
                    },
                    "fields": [
                        {
                            "name": "UUID",
                            "value": `${uuid}`,
                        },
                        {
                            "name": "Skin",
                            "value": `[下載](${skin})`,
                        },
                    ],
                    "color": Math.floor(Math.random() * 0xFFFFFF),
                }
                await interaction.followUp({ embeds: [Embed] });
            } else {
                await interaction.followUp({ content: '玩家ID在3~16個字元之間！', ephemeral: true });
            }
        } else if (interaction.options.getSubcommand() == 'server') {
            const host = interaction.options.getString('伺服器');
            var targetBE = await axios.get(`https://api.mcstatus.io/v2/status/bedrock/${host}`);
            var targetJE = await axios.get(`https://api.mcstatus.io/v2/status/java/${host}`);
            const dataBE = targetBE?.data, dataJE = targetJE.data;
            if (!dataJE.ip_address && !dataBE.ip_address) {
                await interaction.followUp(`伺服器 ${host} 不存在！`);
            } else {
                // BE
                const onlineBE = dataBE.online ?? "不存在";
                const addressBE = dataBE.ip_address ?? "不存在";
                const portBE = dataBE.port ?? "不存在";
                const versionBE = dataBE?.version?.name ?? "不存在";
                const motdBE = dataBE?.motd?.clean ?? "不存在";
                const playerBE = dataBE?.players ? `${dataBE.players.online}/${dataBE.players.max}` : "不存在";
                // JE
                const onlineJE = dataJE.online ?? "不存在";
                const addressJE = dataJE.ip_address ?? "不存在";
                const portJE = dataJE.port ?? "不存在";
                const versionJE = dataJE?.version?.name_clean ?? "不存在";
                const motdJE = dataJE?.motd?.clean ?? "不存在";
                const playerJE = dataJE?.players ? `${dataJE.players.online}/${dataJE.players.max}` : "不存在";
                const Embed = {
                    "author": {
                        "name": `✅ 伺服器 ${host} 的資訊`,
                    },
                    "fields": [
                        {
                            "name": "**是否在線 (BE, JE)**",
                            "value": `${onlineBE}, ${onlineJE} `,
                            "inline": true,
                        },
                        {
                            "name": "**IP (BE, JE)**",
                            "value": `${addressBE}, ${addressJE}`,
                            "inline": true,
                        },
                        {
                            "name": "**Port (BE, JE)**",
                            "value": `${portBE}, ${portJE}`,
                            "inline": true,
                        },
                        {
                            "name": "**版本 (BE, JE)**",
                            "value": `${versionBE}, ${versionJE}`,
                            "inline": true,
                        },
                        {
                            "name": "**玩家 (BE, JE)**",
                            "value": `${playerBE}, ${playerJE}`,
                            "inline": true,
                        },
                        {
                            "name": "**描述 (Bedrock Edition)**",
                            "value": `${motdBE}`,
                            "inline": false,
                        },
                                                {
                            "name": "**描述 (Java Edition)**",
                            "value": `${motdJE}`,
                            "inline": false,
                        }
                    ],
                    "color": Math.floor(Math.random() * 0xFFFFFF),
                };
                await interaction.followUp({ embeds: [Embed] });
            }
        }
    },
};
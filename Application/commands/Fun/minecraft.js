// 這應該算是要求吧
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
// 創建指令
module.exports = {
    data: new SlashCommandBuilder()
        .setName('minecraft')
        .setDescription('取得 Minecraft 資訊')
        .addSubcommand((subcommand) =>
            subcommand
                .setName('player')
                .setDescription('取得 Minecraft 玩家資訊')
                .addStringOption((option) =>
                    option
                        .setName('玩家')
                        .setDescription('輸入玩家ID')
                        .setRequired(true)),
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('server')
                .setDescription('取得 Minecraft 伺服器資訊')
                .addStringOption((option) =>
                    option
                        .setName('伺服器')
                        .setDescription('輸入伺服器IP')
                        .setRequired(true))
                .addBooleanOption((option) =>
                    option
                        .setName('基岩版')
                        .setDescription('伺服器是否為基岩版')
                        .setRequired(true)),
        ),
    async execute(interaction) {
        if (interaction.options.getSubcommand() == 'player') {
            const id = interaction.options.getString('玩家');
            if (id.length < 16 || id.length > 3) {
                const target = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${id}`);
                const data = target.data;
                const uuid = data.id;
                const skin = `https://crafatar.com/skins/${uuid}.png`;
                const avatar = `https://cravatar.eu/avatar/${uuid}/128.png`;
                const Embed = new EmbedBuilder()
                    .setAuthor({ name: `玩家 ${id} 的資訊` })
                    .setThumbnail(avatar)
                    .setDescription(`UUID: ${uuid}\nSkin: [下載](${skin})`);
                await interaction.reply({ embeds: [Embed] });
            } else {
                await interaction.reply({ content: '玩家ID在3~16個字元之間！', ephemeral: true });
            }
        } else if (interaction.options.getSubcommand() == 'server') {
            const ip = interaction.options.getString('伺服器');
            if (interaction.options.getBoolean('基岩版') == true) {
                var target = await axios.get(`https://api.mcsrvstat.us/bedrock/3/${ip}`);
            } else {
                var target = await axios.get(`https://api.mcsrvstat.us/3/${ip}`);
            }
            const data = target.data;
            if (data.debug.error) {
                await interaction.reply(`伺服器 ${ip} 不存在或出現錯誤！`);
            } else {
                const online = data.online;
                const port = data.port;
                const software = data.software ?? '原版';
                const version = data.version;
                const motd = data.motd.clean;
                const onlineplayer = data.players.online;
                const maxplayer = data.players.max;
                const Embed = new EmbedBuilder()
                    .setAuthor({ name: `伺服器 ${ip} 的資訊` })
                    .addFields(
                        { name: '**是否在線**', value: `${online}`, inline: true },
                        { name: '**IP**', value: `${ip}`, inline: true },
                        { name: '**Port**', value: `${port}`, inline: true },
                        { name: '**版本**', value: `${software} ${version}`, inline: true },
                        { name: '**玩家**', value: `${onlineplayer}/${maxplayer}`, inline: true },
                        {name: '**描述**', value: `${motd}`, inline: false },
                    );
                await interaction.reply({ embeds: [Embed] });
            }
        }
    },
};
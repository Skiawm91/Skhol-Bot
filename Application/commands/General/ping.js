// 這應該算是要求吧
// No Requires
// 創建指令
module.exports = {
    data: {
        "name": "ping",
        "type": 1,
        "description": "回傳應用程式的狀態",
        "integration_types": [0, 1],
        "contexts": [0, 1, 2],
    },
    async execute(interaction) {
        const sent = await interaction.deferReply({ fetchReply: true });
        const Embed = {
            "title": ":ping_pong: Pong!",
            "description": `Websocket 延遲: ${interaction.client.ws.ping}ms\n應用程式延遲: ${sent.createdTimestamp - interaction.createdTimestamp}ms`,
            "color": Math.floor(Math.random() * 0xFFFFFF),
        }
        await interaction.followUp({ embeds: [Embed] });
    },
};
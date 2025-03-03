// 這應該算是要求吧
const { developerCommands, developerID, linkApi } = require('../../../config');
const axios = require('axios');
if (!developerCommands.testapi) {
    console.info('[資訊] "testapi" 已停用，將不會被註冊！');
    return;
}
// 創建指令
module.exports = {
    data: {
        "name": "testapi",
        "type": 1,
        "description": "測試網路api功能是否正常",
        "integration_types": [0],
        "contexts": [0],
    },
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        if (developerID.includes(interaction.user.id)) {
            var data = {
                "title": "❌ 測試失敗",
                "description": "可能是無法連接api或檔案不是此Bot支援的格式，\n請查看連接的api是否中斷。\n\napi檔案格式範例：[點擊查看](https://skiawm91.github.io/Skhol-Dev/api/test.json)"
            }
            const target = await axios.get(linkApi).catch(error => {
                globalThis.error = "AxiosError";
            });
            if (globalThis.error !== "AxiosError") {
                var data = target.data;
            }
            var title = data.title;
            var description = data.description;
            const Embed = {
                "author": {
                    "name": `✅ 測試結果`,
                },
                "title": title,
                "description": description,
                "color": Math.floor(Math.random() * 0xFFFFFF),
            }
            await interaction.followUp({ embeds: [Embed] });
        } else {
            await interaction.followUp({ content: '您沒有權限運行這個指令！' });
        }
    },
};
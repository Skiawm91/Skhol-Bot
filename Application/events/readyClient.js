// 這應該算是要求吧
const { Events } = require('discord.js');
// 客戶端登入資訊 (主控台)
module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(readyClient) {
        console.info('[資訊] 登入成功！');
        console.info(`[資訊] 登入的應用程式: ${readyClient.user.tag}`);
    }
}
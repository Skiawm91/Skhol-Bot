// 這應該算是要求吧
const { Events, EmbedBuilder, ActivityType, PresenceUpdateStatus, Routes, ApplicationCommandType } = require('discord.js');
const { clientID, Type, activityText, Status, logChannelID } = require('../../config.json');
const ver = require('../../bot');
// 客戶端登入資訊 (主控台)
module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(readyClient) {
        console.info('[資訊] 登入成功！');
        console.info(`[資訊] 登入的應用程式: ${readyClient.user.tag}`);

        if (Type == 'Playing') {var activityType = ActivityType.Playing;} else if (Type == 'Watching') {var activityType = ActivityType.Watching;} else if (Type == 'Listening') {var activityType = ActivityType.Listening;} else if (Type == 'Streaming') {var activityType = ActivityType.Streaming;} else {var activityType = ActivityType.Custom;}
        if (Status == 'Online') {var statusType = PresenceUpdateStatus.Online} else if (Status == 'DoNotDisturb' || Status == 'DND') {var statusType = PresenceUpdateStatus.DoNotDisturb} else if (Status == 'Idle') {var statusType = PresenceUpdateStatus.Idle} else if (Status == 'Invisible') {var statusType = PresenceUpdateStatus.Invisible}
        if (Status == 'Online' || Status == 'DoNotDisturb' || Status == 'DND' || Status == 'Idle' || Status == 'Invisible') {
            console.info('[資訊] 狀態設為:', Status);
            console.info('[資訊] 活動類型設為:', activityType, '\n       活動內容設為:', activityText,'\n');
            readyClient.user.setPresence({ activities: [{ name: activityText, type: activityType }], status: statusType });
        } else {
            console.error('[錯誤] 狀態設定不正確！');
            console.info('[資訊] 活動類型設為:', activityType, '\n       活動內容設為:', activityText,'\n');
        }
        const Embed = new EmbedBuilder()
            .setTitle(':white_check_mark: 應用程式資訊')
            .setDescription(`開發者: Skiawm91\n版本: ${ver}`)
            .setFooter({ text: 'Skhol Bot', iconURL: readyClient.user.displayAvatarURL(clientID) });
        const logchannel = readyClient.channels.cache.get(logChannelID);
        logchannel.send({ embeds: [Embed] });
    }
}
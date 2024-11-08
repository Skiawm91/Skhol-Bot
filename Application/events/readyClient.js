// 這應該算是要求吧
const { Events, EmbedBuilder, ActivityType, PresenceUpdateStatus, Routes, ApplicationCommandType } = require('discord.js');
const { ver } = require('../../bot');
const { clientID, Type, activityText, Status, logChannelID } = require('../../config');
// 客戶端登入資訊
module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(ready) {
        console.info('[資訊] 登入成功！');
        console.info(`[資訊] 登入的應用程式: ${ready.user.tag}`);
        if (Type == 'Playing') {var activityType = ActivityType.Playing;} else if (Type == 'Watching') {var activityType = ActivityType.Watching;} else if (Type == 'Listening') {var activityType = ActivityType.Listening;} else if (Type == 'Streaming') {var activityType = ActivityType.Streaming;} else {var activityType = ActivityType.Custom;}
        if (Status == 'Online') {var statusType = PresenceUpdateStatus.Online} else if (Status == 'DoNotDisturb' || Status == 'DND') {var statusType = PresenceUpdateStatus.DoNotDisturb} else if (Status == 'Idle') {var statusType = PresenceUpdateStatus.Idle} else if (Status == 'Invisible') {var statusType = PresenceUpdateStatus.Invisible}
        if (Status == 'Online' || Status == 'DoNotDisturb' || Status == 'DND' || Status == 'Idle' || Status == 'Invisible') {
            console.info('[資訊] 狀態設為:', Status);
            console.info('[資訊] 活動類型設為:', activityType, '\n       活動內容設為:', activityText,'\n');
            ready.user.setPresence({ activities: [{ name: activityText, type: activityType }], status: statusType });
        } else {
            console.error('[錯誤] 狀態設定不正確！');
            console.info('[資訊] 活動類型設為:', activityType, '\n       活動內容設為:', activityText,'\n');
        }
        const starttime = Math.floor(Date.now() / 1000);
        const timestamp = Math.floor(Date.now() / 1000);
        const Embed = new EmbedBuilder()
            .setAuthor({ name: '✅ 應用程式資訊' })
            .setDescription(`啟動時間： <t:${starttime}:R>`)
            .addFields(
                { name: '**應用程式名稱**', value: `${ready.user.tag}` },
                { name: '**開發者**', value: 'Skiawm91', inline: true },
                { name: '**版本**', value: `${ver}   `, inline: true },
                { name: '**Github**', value: `[連結](https://github.com/Skiawm91/Skhol-Bot)`, inline: true },
                { name: '**上次資訊更新時間**', value: `<t:${timestamp}:R> (<t:${timestamp}:f>)` },
            )
            .setFooter({ text: 'Skhol Bot', iconURL: ready.user.displayAvatarURL(clientID) })
            .setTimestamp();
        const logchannel = ready.channels.cache.get(logChannelID);
        logchannel.send({ embeds: [Embed] }).then((logmessage) => {
            setInterval(() => {
                const timestamp = Math.floor(Date.now() / 1000);
                const Embed = new EmbedBuilder()
                    .setAuthor({ name: '✅ 應用程式資訊' })
                    .setDescription(`啟動時間： <t:${starttime}:R>`)
                    .addFields(
                        { name: '**應用程式名稱**', value: `${ready.user.tag}` },
                        { name: '**開發者**', value: 'Skiawm91', inline: true },
                        { name: '**版本**', value: `${ver}   `, inline: true },
                        { name: '**Github**', value: `[連結](https://github.com/Skiawm91/Skhol-Bot)`, inline: true },
                        { name: '**上次資訊更新時間**', value: `<t:${timestamp}:R> (<t:${timestamp}:f>)` },
                    )
                    .setFooter({ text: 'Skhol Bot', iconURL: ready.user.displayAvatarURL(clientID) })
                    .setTimestamp();
                logmessage.edit({ embeds: [Embed] });
            }, 60_000);
        })
        setInterval(() => {
            console.log('[資訊] 狀態已更新！\n');
            ready.user.setPresence({ activities: [{ name: activityText, type: activityType }], status: statusType });
        }, 60_000);
    }
}
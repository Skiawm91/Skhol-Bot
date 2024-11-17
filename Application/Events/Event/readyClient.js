// 這應該算是要求吧
const { Events, EmbedBuilder, ActivityType, PresenceUpdateStatus, version } = require('discord.js');
const { ver } = require('../../../bot');
const { clientID, Log, Custom, customPresence, activityText, Type, Status, updateTime, logChannelID } = require('../../../config');
// 額外要求
if (Custom.Presence.ActivityText_Var) {
    globalThis.activityText = activityText;
}
if (Custom.Presence.Type_Var) {
    globalThis.Type = Type;
}
// 客戶端登入資訊
module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(ready) {
        console.info('[資訊] 登入成功！');
        console.info(`[資訊] 登入的應用程式: ${ready.user.tag}`);
        if (globalThis.Type == 'Playing') {var activityType = ActivityType.Playing;} else if (globalThis.Type == 'Watching') {var activityType = ActivityType.Watching;} else if (globalThis.Type == 'Listening') {var activityType = ActivityType.Listening;} else if (globalThis.Type == 'Streaming') {var activityType = ActivityType.Streaming;} else {var activityType = ActivityType.Custom;}
        if (Status == 'Online') {var statusType = PresenceUpdateStatus.Online} else if (Status == 'DoNotDisturb' || Status == 'DND') {var statusType = PresenceUpdateStatus.DoNotDisturb} else if (Status == 'Idle') {var statusType = PresenceUpdateStatus.Idle} else if (Status == 'Invisible') {var statusType = PresenceUpdateStatus.Invisible}
        if (Status == 'Online' || Status == 'DoNotDisturb' || Status == 'DND' || Status == 'Idle' || Status == 'Invisible') {
            if (Custom.Presence.Enable) {
                customPresence();
            }
            if (globalThis.Type === 'Playing') {var activityType = ActivityType.Playing;} else if (globalThis.Type == 'Watching') {var activityType = ActivityType.Watching;} else if (globalThis.Type == 'Listening') {var activityType = ActivityType.Listening;} else if (globalThis.Type == 'Streaming') {var activityType = ActivityType.Streaming;} else {var activityType = ActivityType.Custom;}
            console.info('[資訊] 狀態設為:', Status);
            console.info('[資訊] 活動類型設為:', activityType, '\n       活動內容設為:', globalThis.activityText,'\n');
            ready.user.setPresence({ activities: [{ name: globalThis.activityText, type: activityType }], status: statusType });
        } else {
            if (Custom.Presence.Enable) {
                customPresence();
            }
            if (globalThis.Type === 'Playing') {var activityType = ActivityType.Playing;} else if (globalThis.Type == 'Watching') {var activityType = ActivityType.Watching;} else if (globalThis.Type == 'Listening') {var activityType = ActivityType.Listening;} else if (globalThis.Type == 'Streaming') {var activityType = ActivityType.Streaming;} else {var activityType = ActivityType.Custom;}
            console.error('[錯誤] 狀態設定不正確！');
            console.info('[資訊] 活動類型設為:', activityType, '\n       活動內容設為:', globalThis.activityText,'\n');
            ready.user.setPresence({ activities: [{ name: globalThis.activityText, type: activityType }], status: statusType });
        }
        if (Log){
            const starttime = Math.floor(Date.now() / 1000);
            const timestamp = Math.floor(Date.now() / 1000);
            const Embed = new EmbedBuilder()
                .setAuthor({ name: '✅ 應用程式資訊' })
                .setDescription(`啟動時間： <t:${starttime}:R>`)
                .addFields(
                    { name: '**應用程式名稱**', value: `${ready.user.tag}   `, inline: true },
                    { name: '**版本**', value: `${ver}   `, inline: true },
                    { name: '**開發者**', value: 'Skiawm91', inline: true },
                    { name: '**discord.js 版本**', value: `${version}`, inline: true },
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
                            { name: '**應用程式名稱**', value: `${ready.user.tag}   `, inline: true },
                            { name: '**版本**', value: `${ver}   `, inline: true },
                            { name: '**開發者**', value: 'Skiawm91', inline: true },
                            { name: '**discord.js 版本**', value: `${version}`, inline: true },
                            { name: '**Github**', value: `[連結](https://github.com/Skiawm91/Skhol-Bot)`, inline: true },
                            { name: '**上次資訊更新時間**', value: `<t:${timestamp}:R> (<t:${timestamp}:f>)` },
                        )
                        .setFooter({ text: 'Skhol Bot', iconURL: ready.user.displayAvatarURL(clientID) })
                        .setTimestamp();
                    logmessage.edit({ embeds: [Embed] });
                }, 60_000);
            })
        }
        setInterval(() => {
            console.log('[資訊] 狀態已更新！\n');
            if (Custom.Presence.Enable) {
                customPresence();
            }
            if (globalThis.Type == 'Playing') {var activityType = ActivityType.Playing;} else if (globalThis.Type == 'Watching') {var activityType = ActivityType.Watching;} else if (globalThis.Type == 'Listening') {var activityType = ActivityType.Listening;} else if (globalThis.Type == 'Streaming') {var activityType = ActivityType.Streaming;} else {var activityType = ActivityType.Custom;}
            ready.user.setPresence({ activities: [{ name: globalThis.activityText, type: activityType }], status: statusType });
        }, updateTime * 1000);
    }
}
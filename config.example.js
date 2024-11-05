// 前言
// 不算代替掉原設定檔，這只是因為我想添加註解，僅此。
// 不過舊的也不能用了XD。

// 應用程式
// 從 https://discord.com/developers/applications 取得。
const appToken = "your-token-here"; // 應用程式權杖
const clientID = "your-id-here"; // 應用程式ID

// 伺服器 (公會)
const guildID = "your-id-here"; // 伺服器ID (請填你自己的)

// 開發者
// Log: 預設為 true。
// developerID: 必填選項，電腦客戶端左下角點開有個 "複製ID"。 
// logChannelID: 如果 "Log" 值為 false，免填，否則必填。 
const Log = true;
const developerID = "your-id-here";
const logChannelID = "your-id-here";

// 狀態訊息
// activityText: 可以是任何文字。
// Type: 可以是 "Playing", "Listening", "Watching", "Streaming", "Custom"。
// Status: 可以是 "Online", "DoNotDisturb", "DND", "Idle", "Invisible"。
// 以下三項全空白也行。
const activityText = "Skhol Bot by Skiawm91";
const Type = "Watching";
const Status = "DND";

// 將所有設定內容導出
module.exports = [ appToken, clientID, guildID, activityText, Type, Status, developerID, logChannelID ];
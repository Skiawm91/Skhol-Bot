// 應用程式
// 從 https://discord.com/developers/applications 取得。
const appToken = "your-token-here"; // 應用程式權杖
const clientID = "your-id-here"; // 應用程式

// 伺服器 (公會)
const guildRegister = false; // 僅在伺服器 (公會) 註冊指令
const guildID = "your-id-here"; // 伺服器ID (如果 guildRegister 為 false 則免)

// 開發者
// Log: 預設為 true。
// testerror: 是否啟用 testerror 指令，預設為 false。
// developerID: 必填選項，電腦客戶端左下角點開有個 "複製ID"。 
//  如果要添加多位開發者，請查看範例：["userid1", "userid2"]
// logChannelID: 如果 "Log" 值為 false，免填，否則必填。 
const Log = true;
const developerCommands = {
    "testerror": false,
}
const developerID = ["your-id-here"];
const logChannelID = "your-id-here";

// 自定義
// Presence: 在 activityText 之前加入一些自定義代碼
const Custom = {
    "Presence": false,
    "ActivityText_Var": false, // 如果 activityText 改為 var 來賦值的話
    "Type_Var": false, // 如果 Type 改為 var 來賦值的話
}

// 狀態訊息
// 自由代碼區: 可以加入不同的代碼，但不會導出。
// customPresence: 會導出的自訂義代碼，activityText 或 Type 如要在內，使用 globalThis.activityText 或 globalThis.Type = ""。
// activityText: 可以是任何文字，必要時 const 可改為 var，Custom.ActivityText_Var 需為 true。
// Type: 可以是 "Playing", "Listening", "Watching", "Streaming", "Custom"，必要時 const 可改為 var，Custom.Type_Var 需為 true。
// Status: 可以是 "Online", "DoNotDisturb", "DND", "Idle", "Invisible"。
// 以下三項全空白也行。
// updateTime: 設定狀態更新的秒數。
//
// 自由代碼區 Start
    // 自訂義代碼
// 自由代碼區 End
const customPresence = () => {
    // 狀態自定義代碼 (Custom.Presence 需為 true)
}
const activityText = "Skhol Bot by Skiawm91";
const Type = "Watching";
const Status = "DND";
const updateTime = "60";

// 將所有設定內容導出
module.exports = { 
    appToken, // 權杖
    clientID, // 應用程式ID
    guildRegister, // 是否僅於伺服器註冊指令
    guildID, // 伺服器ID
    Log, // 是否啟用日誌
    developerCommands, // testerror 指令是否啟用
    developerID, // 開發者ID
    logChannelID, // 日誌頻道ID
    Custom, // 自訂義
    customPresence, // 自訂義狀態代碼
    activityText, // 狀態文字
    Type, // 狀態類別
    Status, // 狀態
    updateTime // 狀態更新時間 (秒)
}
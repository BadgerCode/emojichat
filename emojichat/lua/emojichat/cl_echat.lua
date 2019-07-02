CHATMODE_GLOBAL = 1
CHATMODE_TEAM = 2

eChat = {
    Ready = false,
    Active = false,
    ChatMode = CHATMODE_GLOBAL,
    ExistingMessages = { },
    HTMLOutput = nil
}

eChat.config = {
    html = table.concat(emojichatHTML),
    timestamps = true,
    position = 1,
    fadeTime = 12,
    defaultChatColour = Color(255, 255, 255, 255),
    timestampColour = Color(255, 255, 255, 255),
    serverMessageColour = Color(151, 211, 255, 255)
}

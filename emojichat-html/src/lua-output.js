function makeStringLuaSafe(string) {
    if (string === null || typeof (string) === "undefined")
        return string;

    return JSON.stringify(string);
}

export function ConsoleLog(message) {
    console.log("RUNLUA:print(" + makeStringLuaSafe(message) + ")")
}

export function SendMessage(message, chatMode) {
    console.log("RUNLUA:HTMLChatCallbacks.SendMessage(" + makeStringLuaSafe(message) + ", " + makeStringLuaSafe(chatMode) + ")")
}

export function InputChangeCallback(newValue) {
    console.log("RUNLUA:HTMLChatCallbacks.InputChange(" + makeStringLuaSafe(newValue) + ")")
}

export function CloseChat() {
    console.log("RUNLUA:HTMLChatCallbacks.CloseChat()")
}

export function PlayWarningSound() {
    console.log("RUNLUA:HTMLChatCallbacks.PlayWarningSound()")
}

export function HideMenu() {
    console.log("RUNLUA:HTMLChatCallbacks.HideMenu()")
}

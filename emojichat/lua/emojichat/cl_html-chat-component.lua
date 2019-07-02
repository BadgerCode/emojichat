DESTINATION_GLOBAL = 1
DESTINATION_TEAM = 2
DESTINATION_CONSOLE = 3


HTMLChatComponent = { }
HTMLChatComponent.__index = HTMLChatComponent

function HTMLChatComponent.New(htmlVGUIElement)
    local self = setmetatable({}, HTMLChatComponent)
    self.htmlElement = htmlVGUIElement
    return self
end

function HTMLChatComponent.RenderTextLine(self, textComponents)
    local json = string.JavascriptSafe(util.TableToJSON(textComponents))
    self.htmlElement:QueueJavascript("emojiChat.addOutput('" .. json  .. "')")
end

function HTMLChatComponent.SetActive(self, chatMode)
    local desination = DESTINATION_GLOBAL
    if(chatMode == CHATMODE_TEAM) then
        desination = DESTINATION_TEAM
    end

    local playerList = {}
    for k, ply in pairs(player.GetAll()) do
        local playerViewModel = { name = ply:Nick() }
        table.insert(playerList, playerViewModel)
    end

    local activePlayer = {
        name = LocalPlayer():Nick()
    }

    local jsonPlayerList = string.JavascriptSafe(util.TableToJSON(playerList))
    local jsonActivePlayer = string.JavascriptSafe(util.TableToJSON(activePlayer))

    self.htmlElement:QueueJavascript("emojiChat.setActive(" .. desination .. ",'" .. jsonPlayerList .. "', '" .. jsonActivePlayer .. "')")
end

function HTMLChatComponent.SetInactive(self)
    self.htmlElement:QueueJavascript("emojiChat.setInactive()")
end

function HTMLChatComponent.UpdateFadeTime(self, durationInSeconds)
    self.htmlElement:QueueJavascript("emojiChat.setFadeTime(" .. durationInSeconds .. ")")
end

function HTMLChatComponent.ReloadPlayerList(self)
    local playerList = {}
    for k, ply in pairs(player.GetAll()) do
        local playerViewModel = { name = ply:Nick() }
        table.insert(playerList, playerViewModel)
    end

    local json = string.JavascriptSafe(util.TableToJSON(playerList))
    self.htmlElement:QueueJavascript("emojiChat.reloadPlayerList('" .. json  .. "')")
end

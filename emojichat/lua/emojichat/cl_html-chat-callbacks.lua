HTMLChatCallbacks = {}

function HTMLChatCallbacks.SendMessage(message, destination)
	if string.Trim( message ) != "" then

		if destination == DESTINATION_TEAM then
			LocalPlayer():ConCommand("say_team \"" .. (message or "") .. "\"")

		elseif destination == DESTINATION_CONSOLE then
			LocalPlayer():ConCommand(message or "")

		else
			LocalPlayer():ConCommand("say \"" .. message .. "\"")

		end
	end

	eChat.hideBox()
	HTMLChatCallbacks.InputChange("")
end

function HTMLChatCallbacks.InputChange(newValue)
	hook.Run("ChatTextChanged", newValue)
end

function HTMLChatCallbacks.CloseChat()
    eChat.hideBox()
	gui.HideGameUI()
end

function HTMLChatCallbacks.PlayWarningSound()
	surface.PlaySound("resource/warning.wav")
end

function HTMLChatCallbacks.HideMenu()
    gui.HideGameUI()
end

function HTMLChatCallbacks.ReloadPlayerList()
	eChat.ReloadPlayerList()
end
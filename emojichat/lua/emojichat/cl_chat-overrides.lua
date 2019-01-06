local oldAddText = chat.AddText
function chat.AddText(...)
	eChat.AddLine(TextComponentBuilder.Build(...))
	oldAddText(...)
end

chat.Open = eChat.showBox
chat.Close = eChat.hideBox
chat.GetChatBoxPos = function() return eChat.frame:GetPos() end
chat.GetChatBoxSize = function() return eChat.frame:GetSize() end

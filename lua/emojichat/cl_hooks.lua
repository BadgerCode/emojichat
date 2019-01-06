hook.Remove("Initialize", "emojichat_init")
hook.Add("Initialize", "emojichat_init", function()
    -- TODO: Can this get called too early?
	eChat.AddServerMessage("EmojiChat by Badger")
    eChat.buildBox()
end)

hook.Remove("ChatText", "emojichat_joinleave")
hook.Add("ChatText", "emojichat_joinleave", function( index, name, text, type )
	if type != "chat" then
		eChat.AddServerMessage(text)
		return true
	end
end)

hook.Remove("PlayerBindPress", "emojichat_hijackbind")
hook.Add("PlayerBindPress", "emojichat_hijackbind", function(ply, bind, pressed)
	if string.sub( bind, 1, 11 ) == "messagemode" then
		local chatMode = CHATMODE_GLOBAL
		if bind == "messagemode2" then 
			chatMode = CHATMODE_TEAM
		end

		eChat.showBox(chatMode)
		return true
	end
end)

hook.Remove("HUDShouldDraw", "emojichat_hidedefault")
hook.Add("HUDShouldDraw", "emojichat_hidedefault", function( name )
	if name == "CHudChat" then
		return false
	end
end)

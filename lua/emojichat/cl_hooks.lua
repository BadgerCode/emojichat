hook.Remove("Initialize", "echat_init")
hook.Add("Initialize", "echat_init", function()
    -- TODO: Can this get called too early?
    eChat.AddLine({ TextComponent.Create("EmojiChat by Badger", eChat.config.serverMessageColour) })
    eChat.buildBox()
end)

--// Write any server notifications
hook.Remove( "ChatText", "echat_joinleave")
hook.Add( "ChatText", "echat_joinleave", function( index, name, text, type )
	if type != "chat" then
		eChat.AddLine({ TextComponent.Create(text, eChat.config.serverMessageColour) })
		return true
	end
end)

--// Stops the default chat box from being opened
hook.Remove("PlayerBindPress", "echat_hijackbind")
hook.Add("PlayerBindPress", "echat_hijackbind", function(ply, bind, pressed)
	if string.sub( bind, 1, 11 ) == "messagemode" then
		local chatMode = CHATMODE_GLOBAL
		if bind == "messagemode2" then 
			chatMode = CHATMODE_TEAM
		end

		eChat.showBox(chatMode)
		return true
	end
end)

--// Hide the default chat too in case that pops up
hook.Remove("HUDShouldDraw", "echat_hidedefault")
hook.Add("HUDShouldDraw", "echat_hidedefault", function( name )
	if name == "CHudChat" then
		return false
	end
end)

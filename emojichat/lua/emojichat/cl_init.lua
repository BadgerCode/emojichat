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
	html = "Loading...",
	timestamps = true,
	position = 1,	
	fadeTime = 12,
	defaultChatColour = Color(255, 255, 255, 255),
	timestampColour = Color(130, 130, 130, 255),
	serverMessageColour = Color(151, 211, 255, 255)
}

TextComponentBuilder.SetDefaultChatColour(eChat.config.defaultChatColour)
TextComponentBuilder.SetTimestampChatColour(eChat.config.timestampColour)
TextComponentBuilder.SetTimestampsEnabled(eChat.config.timestamps)

surface.CreateFont( "eChat_18", {
	font = "Roboto Lt",
	size = 18,
	weight = 500,
	antialias = true,
	shadow = true,
	extended = true,
})

function eChat.buildBox()
	eChat.frame = vgui.Create("DFrame")
	eChat.frame:MoveToBack()
	eChat.frame:SetSize( ScrW()*0.375, ScrH()*0.25 )
	eChat.frame:SetTitle("")
	eChat.frame:ShowCloseButton( false )
	eChat.frame:SetDraggable( true )
	eChat.frame:SetSizable( true )
	eChat.frame:SetPos( ScrW()*0.0116, (ScrH() - eChat.frame:GetTall()) - ScrH()*0.177)
	eChat.frame:SetMinWidth( 300 )
	eChat.frame:SetMinHeight( 100 )
	eChat.frame.Paint = function( self, w, h )
		if not eChat.Active then return end

		BlurPanel( self, 10, 20, 255 )
		draw.RoundedBox( 0, 0, 0, w, h, Color( 30, 30, 30, 200 ) )
		
		draw.RoundedBox( 0, 0, 0, w, 25, Color( 80, 80, 80, 100 ) )
	end
	
	local serverName = vgui.Create("DLabel", eChat.frame)
	serverName:SetText( GetHostName() )
	serverName:SetFont( "eChat_18")
	serverName:SizeToContents()
	serverName:SetPos( 5, 4 )

	eChat.chatLog = vgui.Create( "DHTML" , eChat.frame )
	eChat.chatLog:SetSize( eChat.frame:GetWide() - 10, eChat.frame:GetTall() - 40 )
	eChat.chatLog:SetPos( 5, 30 )
	eChat.chatLog.Paint = function( self, w, h )
		if not eChat.Active then return end
		draw.RoundedBox( 0, 0, 0, w, h, Color( 30, 30, 30, 100 ) )
	end
	eChat.chatLog:SetVisible( true )
	eChat.chatLog:SetHTML(eChat.config.html)
	eChat.chatLog:SetAllowLua( true )

	eChat.HTMLOutput = HTMLChatComponent.New(eChat.chatLog)

	eChat.UpdateFadeTime()

	eChat.Ready = true
	eChat.RenderExistingMessages()

	if(eChat.Active) then
		eChat.showBox(eChat.ChatMode)
	else
		eChat.hideBox()
	end
end

function eChat.RenderExistingMessages()
	for _, message in pairs( eChat.ExistingMessages ) do
		eChat.AddLine(message)
	end
end

function eChat.hideBox()
	if not eChat.Ready then
		eChat.Active = false
		return
	end

	eChat.HTMLOutput:SetInactive()
	
	local children = eChat.frame:GetChildren()
	for _, pnl in pairs( children ) do
		if pnl == eChat.frame.btnMaxim or pnl == eChat.frame.btnClose or pnl == eChat.frame.btnMinim then continue end
		
		if pnl != eChat.chatLog then
			pnl:SetVisible( false )
		end
	end
	
	eChat.frame:SetMouseInputEnabled( false )
	eChat.frame:SetKeyboardInputEnabled( false )
	eChat.frame:MoveToBack()
	gui.EnableScreenClicker( false )
	
	eChat.Active = false
	hook.Run("FinishChat")
end


function eChat.showBox(mode)
	if not eChat.Ready then
		eChat.Active = true
		eChat.ChatMode = mode
		return
	end

	eChat.HTMLOutput:SetActive(mode)
	
	local children = eChat.frame:GetChildren()
	for _, pnl in pairs( children ) do
		if pnl == eChat.frame.btnMaxim or pnl == eChat.frame.btnClose or pnl == eChat.frame.btnMinim then continue end
		
		pnl:SetVisible( true )
	end
	
	eChat.frame:MakePopup()
	eChat.chatLog:RequestFocus()
	
	eChat.Active = true
	hook.Run("StartChat")
end

function eChat.AddLine(textComponents)
	if not eChat.Ready then
		table.insert(eChat.ExistingMessages, textComponents)
	else
		eChat.HTMLOutput:RenderTextLine(textComponents)
	end
end

function eChat.AddServerMessage(message)
	eChat.AddLine(TextComponentBuilder.Build(eChat.config.serverMessageColour, message))
end

function eChat.UpdateFadeTime(durationInSeconds)
	if(durationInSeconds != nil) then
		eChat.config.fadeTime = durationInSeconds;
	end

	eChat.HTMLOutput:UpdateFadeTime(eChat.config.fadeTime)
end

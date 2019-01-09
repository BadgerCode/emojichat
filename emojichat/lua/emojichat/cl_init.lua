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
	
	local settings = vgui.Create("DButton", eChat.frame)
	settings:SetText("Settings")
	settings:SetFont( "eChat_18")
	settings:SetTextColor( Color( 230, 230, 230, 150 ) )
	settings:SetSize( 70, 25 )
	settings:SetPos( eChat.frame:GetWide() - settings:GetWide(), 0 )
	settings.Paint = function( self, w, h )
		draw.RoundedBox( 0, 0, 0, w, h, Color( 50, 50, 50, 200 ) )
	end
	settings.DoClick = function( self )
		eChat.openSettings()
	end

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

function eChat.openSettings()
	eChat.hideBox()
	
	eChat.frameS = vgui.Create("DFrame")
	eChat.frameS:SetSize( 400, 300 )
	eChat.frameS:SetTitle("")
	eChat.frameS:MakePopup()
	eChat.frameS:SetPos( ScrW()/2 - eChat.frameS:GetWide()/2, ScrH()/2 - eChat.frameS:GetTall()/2 )
	eChat.frameS:ShowCloseButton( true )
	eChat.frameS.Paint = function( self, w, h )
		BlurPanel( self, 10, 20, 255 )
		draw.RoundedBox( 0, 0, 0, w, h, Color( 30, 30, 30, 200 ) )
		
		draw.RoundedBox( 0, 0, 0, w, 25, Color( 80, 80, 80, 100 ) )
		
		draw.RoundedBox( 0, 0, 25, w, 25, Color( 50, 50, 50, 50 ) )
	end
	
	local serverName = vgui.Create("DLabel", eChat.frameS)
	serverName:SetText( "eChat - Settings" )
	serverName:SetFont( "eChat_18")
	serverName:SizeToContents()
	serverName:SetPos( 5, 4 )
	
	local label1 = vgui.Create("DLabel", eChat.frameS)
	label1:SetText( "Time stamps: " )
	label1:SetFont( "eChat_18")
	label1:SizeToContents()
	label1:SetPos( 10, 40 )
	
	local checkbox1 = vgui.Create("DCheckBox", eChat.frameS ) 
	checkbox1:SetPos(label1:GetWide() + 15, 42)
	checkbox1:SetValue( eChat.config.timestamps )
	
	local label2 = vgui.Create("DLabel", eChat.frameS)
	label2:SetText( "Fade time: " )
	label2:SetFont( "eChat_18")
	label2:SizeToContents()
	label2:SetPos( 10, 70 )
	
	local textEntry = vgui.Create("DTextEntry", eChat.frameS) 
	textEntry:SetSize( 50, 20 )
	textEntry:SetPos( label2:GetWide() + 15, 70 )
	textEntry:SetText( eChat.config.fadeTime ) 
	textEntry:SetTextColor( color_white )
	textEntry:SetFont("eChat_18")
	textEntry:SetDrawBorder( false )
	textEntry:SetDrawBackground( false )
	textEntry:SetCursorColor( color_white )
	textEntry:SetHighlightColor( Color(52, 152, 219) )
	textEntry.Paint = function( self, w, h )
		draw.RoundedBox( 0, 0, 0, w, h, Color( 30, 30, 30, 100 ) )
		derma.SkinHook( "Paint", "TextEntry", self, w, h )
	end

	local save = vgui.Create("DButton", eChat.frameS)
	save:SetText("Save")
	save:SetFont( "eChat_18")
	save:SetTextColor( Color( 230, 230, 230, 150 ) )
	save:SetSize( 70, 25 )
	save:SetPos( eChat.frameS:GetWide()/2 - save:GetWide()/2, eChat.frameS:GetTall() - save:GetTall() - 10)
	save.Paint = function( self, w, h )
		if self:IsDown() then
			draw.RoundedBox( 0, 0, 0, w, h, Color( 80, 80, 80, 200 ) )
		else
			draw.RoundedBox( 0, 0, 0, w, h, Color( 50, 50, 50, 200 ) )
		end
	end
	save.DoClick = function( self )
		eChat.frameS:Close()
		
		eChat.config.timestamps = checkbox1:GetChecked()
		eChat.UpdateFadeTime(tonumber(textEntry:GetText()))
	end
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

function eChat.ReloadPlayerList()
	eChat.HTMLOutput:ReloadPlayerList()
end

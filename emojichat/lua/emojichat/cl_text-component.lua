TextComponent = { }
function TextComponent.Create(text, colour)
	local self = {}
	self.text = text
	self.colour = colour
	return self
end


TextComponentBuilder = {}

function TextComponentBuilder.SetDefaultChatColour(colour)
	TextComponentBuilder.DefaultChatColour = colour
end

function TextComponentBuilder.SetTimestampChatColour(colour)
	TextComponentBuilder.TimestampColour = colour
end

function TextComponentBuilder.SetTimestampsEnabled(areEnabled)
	TextComponentBuilder.TimestampsEnabled = areEnabled
end

function TextComponentBuilder.Build(...)
	local activeColour = TextComponentBuilder.DefaultChatColour
	local textComponents = {}

	for _, obj in pairs( {...} ) do
		if type(obj) == "table" then
			activeColour = obj
		elseif type(obj) == "string"  then
			table.insert( textComponents, TextComponent.Create(obj, activeColour))
		elseif obj:IsPlayer() then
			local ply = obj
			
			if TextComponentBuilder.TimestampsEnabled then
				table.insert( textComponents, TextComponent.Create("["..os.date("%X").."] ", TextComponentBuilder.TimestampColour))
			end

			local col = GAMEMODE:GetTeamColor( ply )
			table.insert( textComponents, TextComponent.Create(ply:Nick(), Color(col.r, col.g, col.b, 255)))
		elseif IsEntity(obj) then
			table.insert( textComponents, TextComponent.Create(obj:GetClass(), TextComponentBuilder.DefaultChatColour))
		end
	end

    return textComponents
end
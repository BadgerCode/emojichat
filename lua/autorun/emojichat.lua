if SERVER then
    AddCSLuaFile()
	AddCSLuaFile("emojichat/cl_chat.lua")

    include("emojichat/sv_chat.lua")
elseif CLIENT then
    include("emojichat/cl_chat.lua")
end
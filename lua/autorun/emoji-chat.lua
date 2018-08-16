if SERVER then
    AddCSLuaFile()
	AddCSLuaFile("emojichat/cl_chat.lua")
	AddCSLuaFile("emojichat/cl_hooks.lua")
	AddCSLuaFile("emojichat/cl_html-chat-component.lua")
	AddCSLuaFile("emojichat/cl_html-chat-callbacks.lua")

    include("emojichat/sv_chat.lua")
elseif CLIENT then
    include("emojichat/cl_hooks.lua")
    include("emojichat/cl_html-chat-component.lua")
    include("emojichat/cl_chat.lua")
    include("emojichat/cl_html-chat-callbacks.lua")
end
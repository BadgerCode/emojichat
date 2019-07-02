include("emojichat/sh_html_init.lua")

if SERVER then
    resource.AddWorkshop(1622781878)

    AddCSLuaFile()
    AddCSLuaFile("emojichat/cl_echat.lua")

    AddCSLuaFile("emojichat/cl_chat-overrides.lua")
    AddCSLuaFile("emojichat/cl_hooks.lua")
    AddCSLuaFile("emojichat/cl_html-chat-callbacks.lua")
    AddCSLuaFile("emojichat/cl_html-chat-component.lua")
    AddCSLuaFile("emojichat/cl_init.lua")
    AddCSLuaFile("emojichat/cl_text-component.lua")
    AddCSLuaFile("emojichat/cl_util.lua")

    AddCSLuaFile("emojichat/sh_chat-overrides.lua")

    include("emojichat/sv_chat.lua")
    include("emojichat/sh_chat-overrides.lua")
elseif CLIENT then
    include("emojichat/cl_echat.lua")

    include("emojichat/cl_util.lua")
    include("emojichat/cl_text-component.lua")
    include("emojichat/cl_html-chat-component.lua")
    include("emojichat/cl_init.lua")
    include("emojichat/cl_chat-overrides.lua")
    include("emojichat/cl_hooks.lua")
    include("emojichat/cl_html-chat-callbacks.lua")

    include("emojichat/sh_chat-overrides.lua")
end
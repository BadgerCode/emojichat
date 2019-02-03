
if SERVER then
    AddCSLuaFile()
    
    AddCSLuaFile('emojichat/cl_html/html0.lua')
    AddCSLuaFile('emojichat/cl_html/html1.lua')
    AddCSLuaFile('emojichat/cl_html/html2.lua')
    AddCSLuaFile('emojichat/cl_html/html3.lua')
    AddCSLuaFile('emojichat/cl_html/html4.lua')
elseif CLIENT then
    emojichatHTML = { }
    
    include('emojichat/cl_html/html0.lua')
    include('emojichat/cl_html/html1.lua')
    include('emojichat/cl_html/html2.lua')
    include('emojichat/cl_html/html3.lua')
    include('emojichat/cl_html/html4.lua')
end
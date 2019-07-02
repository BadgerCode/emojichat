hook.Remove("PlayerConnect", "echat_playerconnect")
hook.Add("PlayerConnect", "echat_playerconnect", function(name, ip)
    PrintMessage(HUD_PRINTTALK, name .. " has joined the server.")
end)

hook.Remove("PlayerInitialSpawn", "echat_playerinitialspawn")
hook.Add("PlayerInitialSpawn", "echat_playerinitialspawn", function(ply)
    ply:ChatPrint(ply:Nick() .. " has joined the server.")
end)

hook.Remove("PlayerDisconnected", "echat_playerdisconnected")
hook.Add("PlayerDisconnected", "echat_playerdisconnected", function(ply)
    PrintMessage(HUD_PRINTTALK, ply:Nick() .. " has left the server.")
end)


util.AddNetworkString("SetTypingStatus")
net.Receive("SetTypingStatus", function(len, ply)
    local isTyping = net.ReadBool()
    ply:SetNWBool("IsTyping", isTyping)
end)

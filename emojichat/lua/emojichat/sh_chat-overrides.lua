local meta = FindMetaTable( "Player" )

function meta:IsTyping()
    return self:GetNWBool("IsTyping")
end

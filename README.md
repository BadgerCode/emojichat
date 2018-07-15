Font method:
* https://github.com/Facepunch/garrysmod-requests/issues/47
* http://wiki.garrysmod.com/page/surface/CreateFont
* http://wiki.garrysmod.com/page/Structures/FontData
* Doesn't support above unicode U+FFFF (no emoji :()



HTML method:
* http://wiki.garrysmod.com/page/Category:DHTML
* http://wiki.garrysmod.com/page/Panel/OpenURL
* http://wiki.garrysmod.com/page/Panel/SetHTML
* http://wiki.garrysmod.com/page/DHTML/QueueJavascript

Unicode emoji fonts:
* https://demos.emojione.com/latest/jstoimage.html



General chatbox stuff:
* https://wiki.garrysmod.com/page/Advanced_Chatbox
* https://github.com/Exho1/eChat/blob/master/lua/autorun/cl_chat.lua


TODO: 
* Integrate HTML renderer into chat box
    * Make it hide/show the same as the other one
    * Add basic fade out
    * Hide scrollbars when not active
    * DELETE old one
* Replace text entry with HTML version
    * Will need to call out to Lua
        * eChat.entry.OnTextChanged
* Tab auto-complete emoji
    * Show selectable suggestions (like discord)
* Tab auto-complete player name
    * Maybe try to fix the "space in name" problem
    * And non-typeable characters problem
* Make sure basics work- ctrl+a/c/v/x
* Make fade-out not wack (gradual, faded out text stays faded out not this all or nothing BS)
* Make double quotes work in this version
* Font looks awful over bright lights
* Future
    * Support for server-custom emojis?
    * Allow styling tags?
        * Could allow some basic markdown
* Tidy up
    * Sort out all the logic which builds the text box if it doesn't exist already
        * Just update the state and rely on the text box using the current state when it is drawn
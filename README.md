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
* Try to use local version of html file instead of hosted one
* Maybe fix rendering of emojis in input box
* Fix player joins not showing
* Intercept ` key presses and prevent console from showing up
* Make it so the UI doesn't jitter when escape is pressed
* Tab auto-complete emoji
    * Show selectable suggestions (like discord)
* Tab auto-complete player name
    * Maybe try to fix the "space in name" problem
    * And non-typeable characters problem
* Future
    * Support for server-custom emojis?
    * Allow styling tags?
        * Could allow some basic markdown
    * Maybe show history before player joined?
    * How will this hook into other chat systems?
        * Tags etc
    * Update emojione version
    * Use hud_saytext_time
* Tidy up
    * Separate modules
        * Default chat/hooks override
        * GUI setup
        * GUI event callbacks
    * better logic to detect when a timestamp should be added (always?)


Testing HTML
```javascript
addOutput("[{\"colour\":{\"r\":130.0,\"b\":130.0,\"a\":255.0,\"g\":130.0},\"text\":\"[12:30:22] \"},{\"colour\":{\"r\":0.0,\"b\":0.0,\"a\":255.0,\"g\":200.0},\"text\":\"Badger\"},{\"colour\":{\"r\":0.0,\"b\":255.0,\"a\":255.0,\"g\":255.0},\"text\":\": lenny2\"}]")

setActive()
```
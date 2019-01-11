# Libraries used
* [Twemoji](https://github.com/twitter/twemoji) for Twitter emoji icons
* [Emojilib](https://github.com/muan/emojilib) for emoji shortcodes

# Build for release
> ```npm run build```

This compiles the web app and updates the `/emojichat/lua/emojichat/cl_html.lua` lua file.


# Local development
> ```npm start```

This will do two things:
* Start a website on http://localhost:8080/
* Update the `/emojichat/lua/emojichat/cl_html.lua` lua file

Anytime the files in `src` are changed, the website and lua file will both be updated.

---

# JS Console commands

**Active mode (full UI- input, chat log, etc.)**
```javascript
// emojiChat.setActive(chat mode, JSON list of players, JSON active player)
emojiChat.setActive(1, "[{\"name\": \"Badger\"}]", "{\"name\": \"Badger\"}") // Opens global chat
emojiChat.setActive(2, "[{\"name\": \"Badger\"}]", "{\"name\": \"Badger\"}") // Opens team chat
emojiChat.setActive(3, "[{\"name\": \"Badger\"}]", "{\"name\": \"Badger\"}") // Opens console input
```


**Inactive mode (minimal UI)**
```javascript
emojiChat.setInactive()
```

**Add a message**
```javascript
emojiChat.addOutput("[{\"colour\":{\"r\":130.0,\"b\":130.0,\"a\":255.0,\"g\":130.0},\"text\":\"[12:30:22] \"},{\"colour\":{\"r\":0.0,\"b\":0.0,\"a\":255.0,\"g\":200.0},\"text\":\"Badger\"},{\"colour\":{\"r\":255.0,\"b\":255.0,\"a\":255.0,\"g\":255.0},\"text\":\": A very cool message! :fox:\"}]")
```

**Set when messages fade out**
```javascript
emojiChat.setFadeTime(12) // 12 seconds
```

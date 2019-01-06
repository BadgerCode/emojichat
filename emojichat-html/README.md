## Libraries used
* https://demos.emojione.com/latest/jstoimage.html
* https://github.com/muan/emojilib

## Build for release
```npm run build```

### Generating a new release URL
**TODO**


## Local development
```npm start```

This will auto-recompile anytime a change is made to the app.

Set the lua to use localhost:8080

---

### JS Console commands

**Active mode (full UI- input, chat log, etc.)**
```javascript
emojiChat.setActive() // Opens global chat
emojiChat.setActive(1) // Opens global chat
emojiChat.setActive(2) // Opens team chat
emojiChat.setActive(3) // Opens console input
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

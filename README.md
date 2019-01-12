# Garry's Mod Emoji Chat
_Alpha 0.1.2_

# Features

## Emojis!

![Emojis image](https://i.imgur.com/azcGqAk.png)

## Emoji suggestions & completion

![Emoji completion image](https://i.imgur.com/YLAvtWk.gif)


## Player name completion
![Player name completion image](https://i.imgur.com/QIDZkwH.gif)

# Additional features
### Emoji 11
* All emojis in the Unicode standard are supported, including emoji 11
* [Supported emojis](https://emojipedia.org/)
* [New Emoji 11 emojis](https://emojipedia.org/unicode-11.0/)

### Console mode
* Send console commands from chat.
* Press `TAB` to change between `Global`, `Team` and `Console` chat

### Timestamps
* See the exact time a message was sent

### Default chat behaviour
This chatbox has been made to behave similar to the default Garry's Mod chat
* `ESC` will exit the chat (but not open the main menu)
* Your `console key` will not open console when typing
* Pressing `ENTER` when you have not typed anything will close the chatbox and will not send an empty message
* Old messages will disappear when the chatbox is not open
* Copy & paste works
* Attempting to type a message which is too long will play an alert sound and trim your message
* Emojis are shown as plaintext (e.g. `:fox_face:`) in console & logs

<br><br><br>

---


# Questions
## What makes this different from other chat boxes with emojis?
All of the emojis you use on Twitter, Facebook, Discord (_non-custom emojis_), WhatsApp, etc. are available.<br>
[See the full list here](https://emojipedia.org/).

This chatbox also attempts to behave like the default Garry's Mod chatbox to avoid confusing users.

## Does this work when offline?
Everything apart from the emojis will work when you are offline. Emojis will show as squares.

## I have found a bug or I would like a feature added
Let me know! Submit an issue/feature request on [GitHub](https://github.com/BadgerCode/emojichat/issues).

<br><br><br>

---

# Developer Guide
## Setup for local development
Clone this repository.<br>
The folder [emojichat](/emojichat) should go in your Garry's Mod addons folder.

I would recommend setting up a symbolic link `garrysmod/addons/emojichat-lua` -> `emojichat-repository/emojichat`.


## HTML Chatbox Component
* The files for this can be found in the `emojichat-html` directory
* For the HTML chatbox, see the [README](/emojichat-html/README.md) in `emojichat-html`
* Old commits can be found [here](https://github.com/BadgerCode/emojichat-html)





# Credits
* eChat used as a starting point- https://github.com/Exho1/eChat/
* Blur function created by Chessnut from NutScript

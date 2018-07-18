For the HTML component, see https://github.com/BadgerCode/emojichat-html

eChat used as a starting point- https://github.com/Exho1/eChat/

TODO:
* Maybe fix rendering of emojis in input box
* Try to use local version of html file instead of hosted one
* Fix player joins not showing
* Intercept ` key presses and prevent console from showing up
* Make it so the UI doesn't jitter when escape is pressed
* Tab auto-complete player name
    * Maybe try to fix the "space in name" problem
    * And non-typeable characters problem
* Future
    * Support for server-custom emojis?
    * Tell people the chat shortcuts
        * : for emojis
        * TAB to autocomplete emojis/change chat
    * Allow styling tags?
        * Could allow some basic markdown
    * Maybe show history before player joined?
    * How will this hook into other chat systems?
        * Tags etc
    * Use hud_saytext_time
* Tidy up
    * Separate modules
        * Default chat/hooks override
        * GUI setup
        * GUI event callbacks
    * better logic to detect when a timestamp should be added (always?)

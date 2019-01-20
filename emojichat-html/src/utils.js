import * as emojilib from "emojilib";
import twemoji from "twemoji";

const emojiRegex = ":([^ :]+):";
const urlRegex = "https?:\\/\\/[^ ]+\\.[^ ]+";

String.prototype.chain = function(stringFunc) {
    return stringFunc(this);
}

export function preProcessTextForOutput(text) {
    return _.escape(text)
        .chain(convertURLs)
        .chain(replaceEmojisInText);
}

export function convertURLs(text) {
    return text.replace(new RegExp(urlRegex, "gi"), function(fullMatch) {
        return "<a onclick=\"emojiChat.openURL('" + fullMatch + "');\">" + fullMatch + "</a>";
    });
}

export function convertEmoji(emoji) {
    return twemoji.parse(emoji, { base: "asset://garrysmod/materials/emojichat/"});
}

export function replaceEmojisInText(text) {
    var replacedEmojis = text.replace(new RegExp(emojiRegex, "gi"), function(fullMatch, shortname) {
        if( (typeof shortname === 'undefined') || (shortname === '') || (typeof(emojilib.lib[shortname]) === "undefined") ) {
            return fullMatch;
        }
        else {
            return emojilib.lib[shortname]["char"];
        }
    });
    return convertEmoji(replacedEmojis);
}

export function colourToRGBA(colour) {
    return "rgba(" + colour.r + "," + colour.g + "," + colour.b + "," + colour.a + ")";
}

export function byteLength(str) {
    // returns the byte length of an utf8 string
    var s = str.length;
    for (var i = str.length - 1; i >= 0; i--) {
        var code = str.charCodeAt(i);
        if (code > 0x7f && code <= 0x7ff) s++;
        else if (code > 0x7ff && code <= 0xffff) s += 2;
        if (code >= 0xDC00 && code <= 0xDFFF) i--; //trail surrogate
    }
    return s;
}

export function triggerEvent(el, type) {
    if ('createEvent' in document) {
        // modern browsers, IE9+
        var e = document.createEvent('HTMLEvents');
        e.initEvent(type, false, true);
        el.dispatchEvent(e);
    } else {
        // IE 8
        var e = document.createEventObject();
        e.eventType = type;
        el.fireEvent('on' + e.eventType, e);
    }
}

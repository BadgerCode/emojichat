// Code from https://github.com/muan/emoji-search
import * as emojilib from "emojilib";
import { uniq } from 'lodash';

export class EmojiOption {
    constructor(name, character) {
        this.name = name;
        this.char = character;
    }
}

const categoryNames = [
    "recent",
    "people",
    "animals_and_nature",
    "food_and_drink",
    "travel_and_places",
    "objects",
    "activity",
    "symbols",
    "flags",
    "custom"
];

const categorySymbols = {
    "recent": "🕒",
    "people": "🙂",
    "animals_and_nature": "🌳",
    "food_and_drink": "🍰",
    "travel_and_places": "🚗",
    "objects": "📦",
    "activity": "⚽",
    "symbols": "▶",
    "flags": "🏴",
    "custom": "#️⃣"
};

const categoryEmojis = {};


const buildIndex = () => {
    const map = {};

    for(var i = 0; i < categoryNames.length; i++) {
        categoryEmojis[categoryNames[i]] = [];
    }

    Object.keys(emojilib.lib).forEach(key => {
        var emoji = emojilib.lib[key];
        if (!emoji["char"]) { return }

        var category = emoji["category"];
        if (typeof (categoryEmojis[category]) === "undefined") {
            console.log("Emoji '" + key + "' missing from categories. Category: '" + category + "'");
        }
        else {
            categoryEmojis[category].push({ char: emoji["char"], code: ":" + key + ":" })
        }

        const words = emoji["keywords"]
        words.push(key)

        words.forEach(word => {
            if (map[word]) {
                map[word].push(key)
            } else {
                map[word] = [key]
            }
        })
    })

    return map;
}

const map = buildIndex()
const keys = Object.keys(map)

export function search(keyword) {
    var lowerKeyword = keyword.toLocaleLowerCase();
    var result = []
    keys.forEach(k => {
        if (k.toLocaleLowerCase().indexOf(lowerKeyword) !== -1) {
            result = result.concat(map[k])
        }
    })

    result = uniq(result);

    result.sort((a, b) => {
        return emojilib.ordered[a] - emojilib.ordered[b]
    })

    // Move exact match to the first
    if (result.indexOf(keyword) !== -1) {
        result.splice(result.indexOf(keyword), 1)
        result.unshift(keyword)
    }

    return result.map(k => new EmojiOption(k, emojilib.lib[k]["char"]));
}


export function getCategories() {
    var categories = [];
    for(var i = 0; i < categoryNames.length; i++) {
        var name = categoryNames[i];
        categories.push({ name: name, symbol: categorySymbols[name], emojis: categoryEmojis[name]});
    }

    return categories;
}

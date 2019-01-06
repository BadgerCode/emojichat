// Code from https://github.com/muan/emoji-search
// JSON from https://github.com/muan/emojilib
import emojis from "./emojis.json";
import ordered from "./ordered.json";

export class EmojiOption {
    constructor(name, character){
        this.name = name;
        this.char = character;
    }
}

const buildIndex = () => {
    const map = {}
    Object.keys(emojis).forEach(key => {
        if (!emojis[key]["char"]) { return }

        const words = emojis[key]["keywords"]
        words.push(key)

        words.forEach(word => {
            if (map[word]) {
                map[word].push(key)
            } else {
                map[word] = [key]
            }
        })
    })

    return map
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

    result = _.uniq(result);

    result.sort((a, b) => {
        return ordered[a] - ordered[b]
    })

    // Move exact match to the first
    if (result.indexOf(keyword) !== -1) {
        result.splice(result.indexOf(keyword), 1)
        result.unshift(keyword)
    }

    return result.map(k => new EmojiOption(k, emojis[k]["char"]));
}

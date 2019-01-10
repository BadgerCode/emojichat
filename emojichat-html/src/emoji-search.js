// Code from https://github.com/muan/emoji-search
import * as emojilib from "emojilib";
import { uniq } from 'lodash';

export class EmojiOption {
    constructor(name, character){
        this.name = name;
        this.char = character;
    }
}

const buildIndex = () => {
    const map = {}
    Object.keys(emojilib.lib).forEach(key => {
        if (!emojilib.lib[key]["char"]) { return }

        const words = emojilib.lib[key]["keywords"]
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

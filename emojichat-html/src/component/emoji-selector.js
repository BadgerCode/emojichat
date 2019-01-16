import { convertEmoji } from '../utils.js';

function OuterElement() {
    return document.getElementById("input-emoji-button");
}

function InnerElement() {
    return document.getElementById("input-emoji-button-inner-wrapper");
}


export function Initialise() {
    InnerElement().innerHTML = convertEmoji("😃");
}

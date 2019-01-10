import * as Suggestions from './component/suggestions.js';

var existingCaretPosition = 0;
var existingText = "";
var ignoreNextEnterUp = false;

export function Reset() {
    existingCaretPosition = 0;
    existingText = "";
    ignoreNextEnterUp = false;
}

export function UpdateCaretPosition(newPosition) {
    if (newPosition != existingCaretPosition) {
        Suggestions.Hide();
        existingCaretPosition = newPosition;
    }
}

export function GetText() {
    return existingText;
}

export function SetText(newText) {
    existingText = newText;
}

export function IgnoreNextEnterRelease() {
    ignoreNextEnterUp = true;
}

export function ShouldIgnoreNextEnterRelease() {
    return ignoreNextEnterUp;
}

export function ConsumeEnterRelease() {
    ignoreNextEnterUp = false;
}
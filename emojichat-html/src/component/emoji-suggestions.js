import { convertEmoji } from '../utils.js';

var max_suggestions = 3;

var active;
var currentSuggestions;
var selectedIndex;

export function Initialise() {
    Show([{char: '🦊', name: ':fox_face:'}]);
    var singleRowHeight = document.getElementById("emoji-suggestion-0").scrollHeight;
    var containerHeight = document.getElementById("output").scrollHeight;
    max_suggestions = Math.floor(containerHeight / singleRowHeight);
    Hide();
}

Initialise();

export function Reset() {
    active = false;
    currentSuggestions = [];
    selectedIndex = 0;
}

function PageElement() {
    return document.getElementById("input-suggestions");
}

export function AreActive() {
    return active;
}

export function Show(emojiSuggestions) {
    active = true;
    currentSuggestions = emojiSuggestions.slice(0, Math.min(emojiSuggestions.length, max_suggestions));

    if (currentSuggestions.length < 1)
        return;

    RenderSuggestions();
    SetSelection(0);
    PageElement().style.display = "block";
}

export function Hide() {
    Reset();
    PageElement().style.display = "none";
}

function RenderSuggestions() {
    var suggestions = PageElement();
    suggestions.innerHTML = "";

    for (var i = 0; i < currentSuggestions.length; i++) {
        var suggestion = currentSuggestions[i];
        suggestions.innerHTML += "<div id=\"emoji-suggestion-" + i + "\" class=\"emoji-suggestion\">" + convertEmoji(suggestion.char) + " &nbsp; :" + suggestion.name + ":</div>";
    }
}

export function ChangeSelection(direction) {
    var currentSelection = document.getElementById("emoji-suggestion-" + selectedIndex);
    if (currentSelection !== null)
        currentSelection.classList.remove("selected-emoji-suggestion");

    var newIndex = selectedIndex + direction;
    if (newIndex < 0)
        newIndex = currentSuggestions.length - 1;
    else if (newIndex >= currentSuggestions.length)
        newIndex = 0;

    SetSelection(newIndex)
}

function SetSelection(newIndex) {
    selectedIndex = newIndex;

    var newSelection = document.getElementById("emoji-suggestion-" + selectedIndex);
    if (newSelection !== null)
        newSelection.classList.add("selected-emoji-suggestion");
}

export function GetSelectedEmoji(){
    return ":" + currentSuggestions[selectedIndex].name + ":";
}
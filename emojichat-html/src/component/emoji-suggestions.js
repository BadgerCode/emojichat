var active;
var currentSuggestions;
var selectedIndex;

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

export function Show(suggestions, renderFunc) {
    active = true;

    if(suggestions.length < 1) {
        currentSuggestions = [];
        return;
    }

    currentSuggestions = suggestions.slice(0, 1);
    RenderSuggestions(renderFunc);
    PageElement().style.display = "block";

    var singleRowHeight = document.getElementById("suggestion-item-0").scrollHeight;
    var containerHeight = document.getElementById("output").scrollHeight;
    var max_suggestions = Math.floor(containerHeight / singleRowHeight);

    currentSuggestions = suggestions.slice(0, Math.min(suggestions.length, max_suggestions));

    RenderSuggestions(renderFunc);
    SetSelection(0);
}

export function Hide() {
    Reset();
    PageElement().style.display = "none";
}

function RenderSuggestions(renderFunc) {
    var suggestions = PageElement();
    suggestions.innerHTML = "";

    for (var i = 0; i < currentSuggestions.length; i++) {
        var suggestion = currentSuggestions[i];
        suggestions.innerHTML += "<div id=\"suggestion-item-" + i + "\" class=\"suggestion-item\">" + renderFunc(suggestion) + "</div>";
    }
}

export function ChangeSelection(direction) {
    var currentSelection = document.getElementById("suggestion-item-" + selectedIndex);
    if (currentSelection !== null)
        currentSelection.classList.remove("selected-suggestion");

    var newIndex = selectedIndex + direction;
    if (newIndex < 0)
        newIndex = currentSuggestions.length - 1;
    else if (newIndex >= currentSuggestions.length)
        newIndex = 0;

    SetSelection(newIndex)
}

function SetSelection(newIndex) {
    selectedIndex = newIndex;

    var newSelection = document.getElementById("suggestion-item-" + selectedIndex);
    if (newSelection !== null)
        newSelection.classList.add("selected-suggestion");
}

export function GetSelectedSuggestion(){
    return currentSuggestions[selectedIndex];
}
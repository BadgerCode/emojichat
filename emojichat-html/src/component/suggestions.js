var active;
var currentSuggestions;
var selectedIndex;

const tooltip = "<span class=\"suggestion-up\">▲</span><span class=\"suggestion-down\">▼</span><span class=\"suggestion-select\">ENTER ↩</span>";

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

    if (suggestions.length < 1) {
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
    SetSelection(0, 0, 1);
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
        suggestions.innerHTML += "<div id=\"suggestion-item-" + i + "\" class=\"suggestion-item\">" + renderFunc(suggestion) + tooltip + "</div>";
    }
}

export function ChangeSelection(direction) {
    RemoveCSSClass("previous-suggestion");
    RemoveCSSClass("selected-suggestion");
    RemoveCSSClass("next-suggestion");

    var newIndex = selectedIndex + direction;
    if (newIndex < 0)
        newIndex = currentSuggestions.length - 1;
    else if (newIndex >= currentSuggestions.length)
        newIndex = 0;

    var previousIndex = Math.max(newIndex - 1, 0);
    var nextIndex = Math.min(newIndex + 1, currentSuggestions.length - 1);

    SetSelection(newIndex, previousIndex, nextIndex)
}

function RemoveCSSClass(className) {
    var elements = document.getElementsByClassName(className);
    for (var i = 0; i < elements.length; i++)
        elements[i].classList.remove(className);
}

function SetSelection(newIndex, previousIndex, nextIndex) {
    selectedIndex = newIndex;

    var newSelection = document.getElementById("suggestion-item-" + selectedIndex);
    if (newSelection !== null)
        newSelection.classList.add("selected-suggestion");

    if (previousIndex != newIndex) {
        var previousSelection = document.getElementById("suggestion-item-" + previousIndex);
        if (previousSelection !== null)
            previousSelection.classList.add("previous-suggestion");
    }

    if (nextIndex != newIndex) {
        var element = document.getElementById("suggestion-item-" + nextIndex);
        if (element !== null)
            element.classList.add("next-suggestion");
    }
}

export function GetSelectedSuggestion() {
    return currentSuggestions[selectedIndex];
}
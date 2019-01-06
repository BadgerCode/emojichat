const TextDestination = {
    Global: 1,
    Team: 2,
    Console: 3
};

const TextPrompts = {};
TextPrompts[TextDestination.Global] = "Say :";
TextPrompts[TextDestination.Team] = "Say (TEAM) :";
TextPrompts[TextDestination.Console] = "Console :";


var textDestination = TextDestination.Global;

export function SetDestination(destination) {
    textDestination = destination || TextDestination.Global;
    RenderInputPrefix();
}

export function SelectNextDestination() {
    var newMode = textDestination + 1;
    if (newMode > TextDestination.Console)
        newMode = TextDestination.Global;

    textDestination = newMode;
    RenderInputPrefix();
}

export function Reset() {
    textDestination = TextDestination.Global;
    RenderInputPrefix();
}

export function GetSelectedDestination() {
    return textDestination;
}


// Render

function getInputBoxWrapper() {
    return document.getElementById("input-box-wrapper");
}

function getInputPrompt() {
    return document.getElementById("input-prompt");
}

function RenderInputPrefix() {
    var message = TextPrompts[textDestination];

    var inputPrompt = getInputPrompt();
    inputPrompt.innerHTML = message;
    setTimeout(function () {
        var leftMargin = getInputPrompt().offsetWidth + 10;
        getInputBoxWrapper().style.left = leftMargin + "px";
    }, 10);
}

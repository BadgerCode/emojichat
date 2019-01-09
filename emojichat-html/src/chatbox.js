class Chatbox {
    static OutputElement() {
        return document.getElementById("output");
    }

    static InputBoxElement() {
        return document.getElementById("input-box");
    }

    static SetInputActive() {
        Chatbox.OutputElement().style["overflow-y"] = "scroll";
        document.getElementById("input").style["display"] = "block";
        Chatbox.InputBoxElement().focus();
    }

    static SetInputInactive() {
        Chatbox.OutputElement().style["overflow-y"] = "hidden";
        document.getElementById("input").style["display"] = "none";
        Chatbox.InputBoxElement().value = "";
    }

    static ScrollToBottom() {
        Chatbox.OutputElement().scrollTop = Chatbox.OutputElement().scrollHeight;
    }
}

module.exports = {
    Chatbox: Chatbox
}

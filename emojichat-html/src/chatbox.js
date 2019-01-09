class Chatbox {
    static OutputElement() {
        return document.getElementById("output");
    }

    static InputBoxElement() {
        return document.getElementById("input-box");
    }

    static SetInputActive() {
        document.getElementById("input").style["display"] = "block";
        Chatbox.InputBoxElement().focus();
    }

    static SetInputInactive() {
        document.getElementById("input").style["display"] = "none";
        Chatbox.InputBoxElement().value = "";
    }
}

module.exports = {
    Chatbox: Chatbox
}

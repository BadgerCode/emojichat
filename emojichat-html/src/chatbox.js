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

    static SetOutputReduced() {
        Chatbox.OutputElement().classList.add("output-reduced");
        Chatbox.OutputElement().classList.remove("output-full");
    }

    static SetOutputFull() {
        Chatbox.OutputElement().classList.remove("output-reduced");
        Chatbox.OutputElement().classList.add("output-full");
    }
}

module.exports = {
    Chatbox: Chatbox
}

import { convertEmoji, elementHasParent } from '../utils.js';
import { getCategories } from '../emoji-search';
import { Chatbox } from '../chatbox.js';

const buttonIcon = "😃";

const outerButtonElementId = "input-emoji-button";
const innerButtonElementId = "input-emoji-button-inner-wrapper";

const listElementId = "input-emoji-list";

const categoryListElementId = "input-emoji-category-list";
const emojisListElementId = "input-emoji-list-emojis";


var state = {
    hidden: true,
    activeCategory: ""
};

var firstCategory = "";
var categoriesList = {};



/* Functionality */

export function Initialise() {
    InnerButtonElement().innerHTML = convertEmoji(buttonIcon);
    renderCategories(getCategories());
}

function IsHidden() { return state.hidden; }

export function Show() {
    if (state.hidden == false) return;

    Chatbox.SetOutputReduced();

    state.hidden = false;
    ListElement().style.display = "block";
}

export function Hide() {
    if (state.hidden == true) return;

    Chatbox.SetOutputFull();

    state.hidden = true;
    ListElement().style.display = "none";
    SetCategory(firstCategory);
}

export function SetCategory(categoryName) {
    var previousCategory = state.activeCategory;
    if(previousCategory !== "") {
        CategorySectionElement(previousCategory).style.display = "none";
        CategoryButtonElement(previousCategory).classList.remove("active-emoji-category-button");
    }

    state.activeCategory = categoryName;
    CategorySectionElement(categoryName).style.display = "inline-block";
    CategoryButtonElement(categoryName).classList.add("active-emoji-category-button");

    if(categoriesList[categoryName].rendered === false) {
        renderCategory(categoryName);
    }
}




/* DOM */

function OuterButtonElement() {
    return document.getElementById(outerButtonElementId);
}

function InnerButtonElement() {
    return document.getElementById(innerButtonElementId);
}

function ListElement() {
    return document.getElementById(listElementId);
}

function CategoryListElement() {
    return document.getElementById(categoryListElementId);
}

function EmojisListElement() {
    return document.getElementById(emojisListElementId);
}

function CategoryButtonName(categoryName) { return "emoji-category-button-" + categoryName; }

function CategoryButtonElement(categoryName) {
    return document.getElementById(CategoryButtonName(categoryName));
}

function CategorySectionName(categoryName) { return "emoji-category-emojis-" + categoryName; }

function CategorySectionElement(categoryName) {
    return document.getElementById(CategorySectionName(categoryName));
}


OuterButtonElement().addEventListener("click", function (event) {
    if (IsHidden()) {
        Show();
    }
    else {
        Hide();
    }
});

document.getElementsByTagName("body")[0].addEventListener("click", function (event) {
    if (elementHasParent(event.target, function (element) { return element.id === listElementId || element.id === outerButtonElementId; }))
        return;

    Hide();
});

window.addEventListener("load", function(event) {
    SetCategory(firstCategory);
});

function renderCategories(categories) {
    categories.forEach(category => {
        CategoryListElement().innerHTML += "<span id=\"emoji-category-button-" + category.name + "\" class=\"emoji-category-button noselect\" "
            + "onclick=\"emojiChat.setEmojiCategory('" + category.name + "')\">"
                 + convertEmoji(category.symbol)
            + "</span>";

        EmojisListElement().innerHTML += "<div id=\"emoji-category-emojis-" + category.name + "\" class=\"emoji-category-emojis\"></div>";

        categoriesList[category.name] = {
            emojis: category.emojis,
            rendered: false
        };

        if(firstCategory === "")
            firstCategory = category.name;
    });
}


function renderCategory(categoryName) {
    var position = 0;

    function renderPartialCategory() {
        var category = categoriesList[categoryName];
        var finishPosition = Math.min(category.emojis.length, position + 60);

        var categorySection = CategorySectionElement(categoryName);
        var emojis = "";

        for(; position < finishPosition; position++) {
            var emoji = category.emojis[position];
            emojis += "<span class=\"emoji-category-list-emoji\" onclick=\"emojiChat.insertEmoji('" + emoji.code.replace("'", "\\'") + "')\">" + convertEmoji(emoji.char) + "</span>";
        }

        categorySection.innerHTML += emojis;

        if(position >= category.emojis.length) {
            category.rendered = true;
            clearInterval(timer);
            return;
        }
    }

    var timer = setTimeout(function() {
        timer = setInterval(renderPartialCategory, 10)
    }, 100);
    renderPartialCategory();
}


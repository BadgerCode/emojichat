import { convertEmoji, elementHasParent } from '../utils.js';
import { getCategories } from '../emoji-search';
import { Chatbox } from '../chatbox.js';
import { Timing, milliseconds } from '../timing';

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
    SetCategory(firstCategory);
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
    if (previousCategory !== "") {
        CategorySectionElement(previousCategory).style.display = "none";
        CategoryButtonElement(previousCategory).classList.remove("active-emoji-category-button");
    }

    state.activeCategory = categoryName;
    CategorySectionElement(categoryName).style.display = "inline-block";
    CategoryButtonElement(categoryName).classList.add("active-emoji-category-button");

    if (categoriesList[categoryName].rendered === false) {
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

function renderCategories(categories) {
    categories.forEach(category => {
        CategoryListElement().innerHTML += "<span id=\"emoji-category-button-" + category.name + "\" class=\"emoji-category-button noselect\" "
            + "onclick=\"emojiChat.setEmojiCategory('" + category.name + "')\">"
            + convertEmoji(category.symbol)
            + "</span>";

        EmojisListElement().innerHTML += "<div id=\"emoji-category-emojis-" + category.name + "\" class=\"emoji-category-emojis\"></div>";

        categoriesList[category.name] = {
            name: category.name,
            emojis: category.emojis,
            rendered: false
        };

        if (firstCategory === "")
            firstCategory = category.name;
    });
}


function renderCategory(categoryName) {
    var category = categoriesList[categoryName];
    var emojiListPosition = 0;

    Timing.After(milliseconds(50))
        .Do(() => emojiListPosition = renderPartialCategory(category, emojiListPosition, 10))
        .ThenAfter(milliseconds(50))
        .Do(() => emojiListPosition = renderPartialCategory(category, emojiListPosition, 30))
        .ThenAfterEvery(milliseconds(50))
        .Until((iteration, duration) => emojiListPosition >= category.emojis.length)
        .Do(() => emojiListPosition = renderPartialCategory(category, emojiListPosition, 60));
}

function renderPartialCategory(category, emojiListPosition, maxEmojisToRender) {
    var finishPosition = Math.min(category.emojis.length, emojiListPosition + maxEmojisToRender);
    var emojis = "";

    for (; emojiListPosition < finishPosition; emojiListPosition++) {
        var emoji = category.emojis[emojiListPosition];
        emojis += "<span class=\"emoji-category-list-emoji\" onclick=\"emojiChat.insertEmoji('" + emoji.code.replace("'", "\\'") + "')\">" + convertEmoji(emoji.char) + "</span>";
    }

    CategorySectionElement(category.name).innerHTML += emojis;

    if (emojiListPosition >= category.emojis.length) {
        category.rendered = true;
    }

    return emojiListPosition;
}

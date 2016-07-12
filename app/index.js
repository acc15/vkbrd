
function createKey(token) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "vkbrd-key";
    btn.innerText = token;
    return btn;
}

function createRow(row) {
    var element = document.createElement("div"), tokens, i;
    element.className = "vkbrd-row";
    tokens = row.split(/\s+/);
    for (var i=0; i<tokens.length; i++) {
        element.appendChild(createKey(tokens[i]));
    }
    return element;
}


function createLayout(layout) {
    var container = document.createElement("div"), i;
    container.className = "vkbrd";
    for (i=0; i<layout.length; i++) {
        container.appendChild(createRow(layout[i]));
    }
    return container;
}


document.addEventListener("DOMContentLoaded", function() {

    var qwerty = [
        "` 1 2 3 4 5 6 7 8 9 0 - = Bksp",
        "Tab q w e r t y u i o p [ ]",
        "a s d f g h j k l ; ' \\  Enter",
        "Shift z x c v b n m , . / Shift",
        "Lang Space"
    ];
   
    var element = createLayout(qwerty);
    document.body.appendChild(element);

});

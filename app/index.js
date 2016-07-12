

document.addEventListener("DOMContentLoaded", function() {

    function applyState(kb, newState) {
        var mod = false, k;
        for (k in newState) {
            if (!newState.hasOwnProperty(k)) {
                continue;
            }
            if (newState[k] === kb.current[k]) {
                continue;
            }
            kb.current[k] = newState[k];
            mod = true;
        }
        return mod;
    }

    function getKeyText(kb, id) {
        var lang = kb.config.lang[kb.current.lang],
            key = lang && lang[id];
        return key && key[!kb.current.shift || key.length === 1 ? 0 : 1] || id;
    }

    function updateKeyTexts(kb) {
        var i, key;
        for (i=0; i<kb.keys.length; i++) {
            key = kb.keys[i];
            key.button.innerText = getKeyText(kb, key.id);
        }
    }

    function defaultKeyHandler(kb, btn) {
        if (!kb.target) {
            return;
        }
        kb.target.value = kb.target.value.substring(0, kb.target.selectionStart) + btn.innerText + kb.target.value.substring(kb.target.selectionEnd);
    }

    function createKey(kb, id) {
        var btn = document.createElement("button"), handler = kb.config.keys[id] || defaultKeyHandler;
        btn.type = "button";
        btn.className = "vkbrd-key";
        btn.innerText = getKeyText(kb, id);
        btn.addEventListener("click", function() {
            handler(kb, btn);
            if (kb.target) {
                kb.target.focus();
            }
        });
        kb.keys.push({ id: id, button: btn });
        return btn;
    }

    function createRow(kb, row) {
        var element = document.createElement("div"), tokens, i;
        element.className = "vkbrd-row";
        tokens = row.split(/\s+/);
        for (var i=0; i<tokens.length; i++) {
            element.appendChild(createKey(kb, tokens[i]));
        }
        return element;
    }

    function createLayout(kb) {
        var container = document.createElement("div"), layout = kb.config.layout, i;
        container.className = "vkbrd";
        for (i=0; i<layout.length; i++) {
            container.appendChild(createRow(kb, layout[i]));
        }
        return container;
    }


    function vkbrd(config) {
        this.config = config;
        this.target = null;
        this.keys = [];
        this.current = { shift: false, lang: 0 };
        this.element = createLayout(this);
    }
    vkbrd.prototype.state = function(newState) {
        if (!newState) {
            return this.appliedState;
        }
        if (applyState(this, newState)) {
            updateKeyTexts(this);
        }
        return this;
    };

    vkbrd.keys = {};
    vkbrd.keys.default = {
        "Shift": function(vkbrd) {
            vkbrd.state({ shift: !vkbrd.current.shift })
        },
        "Lang": function(vkbrd) {
            vkbrd.state({ lang: (vkbrd.current.lang + 1) % vkbrd.config.lang.length })
        },
        "Bksp": function(vkbrd) {
            if (vkbrd.target) {
                // vkbrd.target.value = 
            }
        }
    };

    vkbrd.layout = {};
    vkbrd.layout.qwerty = [
        "` 1 2 3 4 5 6 7 8 9 0 - = Bksp",
        "q w e r t y u i o p [ ]",
        "a s d f g h j k l ; ' \\  Enter",
        "Shift z x c v b n m , . / Shift",
        "Lang Space"
    ];
    vkbrd.lang = {};
    vkbrd.lang.en = {
        "`": ["`", "~"],
        "1": ["1", "!"],
        "2": ["2", "@"],
        "3": ["3", "#"],
        "4": ["4", "$"],
        "5": ["5", "%"],
        "6": ["6", "^"],
        "7": ["7", "&"],
        "8": ["8", "*"],
        "9": ["9", "("],
        "0": ["0", ")"],
        "-": ["-", "_"],
        "=": ["=", "+"],
        "q": ["q", "Q"],
        "w": ["w", "W"],
        "e": ["e", "E"],
        "r": ["r", "R"],
        "t": ["t", "T"],
        "y": ["y", "Y"],
        "u": ["u", "U"],
        "i": ["i", "I"],
        "o": ["o", "O"],
        "p": ["p", "P"],
        "[": ["[", "{"],
        "]": ["]", "}"],

        "a": ["a", "A"],
        "s": ["s", "S"],
        "d": ["d", "D"],
        "f": ["f", "F"],
        "g": ["g", "G"],
        "h": ["h", "H"],
        "j": ["j", "J"],
        "k": ["k", "K"],
        "l": ["l", "L"],
        ";": [";", ":"],
        "'": ["'", "\""],
        "\\": ["\\", "|"],

        "z": ["z", "Z"],
        "x": ["x", "X"],
        "c": ["c", "C"],
        "v": ["v", "V"],
        "b": ["b", "B"],
        "n": ["n", "N"],
        "m": ["m", "M"],
        ",": [",", "<"],
        ".": [".", ">"],
        "/": ["/", "?"],

        "Lang": ["ENG"]
    };
    vkbrd.lang.ru = {
        "`": ["ё", "Ё"],
        "1": ["1", "!"],
        "2": ["2", "\""],
        "3": ["3", "№"],
        "4": ["4", ";"],
        "5": ["5", "%"],
        "6": ["6", ":"],
        "7": ["7", "?"],
        "8": ["8", "*"],
        "9": ["9", "("],
        "0": ["0", ")"],
        "-": ["-", "_"],
        "=": ["=", "+"],
        "q": ["й", "Й"],
        "w": ["ц", "Ц"],
        "e": ["у", "У"],
        "r": ["к", "К"],
        "t": ["е", "Е"],
        "y": ["н", "Н"],
        "u": ["г", "Г"],
        "i": ["ш", "Ш"],
        "o": ["щ", "Щ"],
        "p": ["з", "З"],
        "[": ["х", "Х"],
        "]": ["ъ", "Ъ"],
        "Lang": ["РУС"]  
    };

    var kb = new vkbrd({ 
        keys: vkbrd.keys.default, 
        layout: vkbrd.layout.qwerty, 
        lang: [ vkbrd.lang.en, vkbrd.lang.ru ]
    });

    kb.target = document.getElementById("inp");

    document.body.appendChild(kb.element);

});

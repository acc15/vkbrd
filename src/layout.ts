
interface Layout {
    build(kb: Keyboard): Key[];
}

class StringLayout implements Layout {

    layout: string[];

    constructor(layout: string[]) {
        this.layout = layout;
    }


    build(kb: Keyboard): Key[] {

        let keys: Key[] = [];

        let container = document.createElement("div");
        container.className = "vkbrd-container";

        for (let row of this.layout) {
            let rowContainer = document.createElement("div");
            rowContainer.className = "vkbrd-row";

            StringLayout.parseRow(row, (token, spaces) => {

                let parts = token.split(":");
                let key = StringLayout.createKey(kb, parts[0], parts[1]);
                keys.push(key);

                if (spaces > 1) {
                    rowContainer.appendChild(StringLayout.createSpacer(spaces - 1));
                }
                rowContainer.appendChild(key.button);

            });
            container.appendChild(rowContainer);
        }

        document.body.appendChild(container);

        return keys;
    }

    private static createSpacer(width: number): HTMLElement {
        let div = document.createElement("div");
        div.className = "vkbrd-spacer vkbrd-spacer-" + width;
        return div;
    }

    private static createKey(kb: Keyboard, id: string, width: string): ButtonKey {
        let keyButton = document.createElement("button");
        let keyHandler = kb.handler(id);

        let key = new ButtonKey(id, keyButton);
        keyButton.type = "button";
        keyButton.innerText = kb.label(id);
        keyButton.className = "vkbrd-key";

        if (id.length === 1) {
            width = "sm";
        }
        if (width) {
            keyButton.className += " vkbrd-key-" + width;
        }
        keyButton.addEventListener('click', function() {
            keyHandler(kb, key);
        });

        return key;
    }

    private static parseRow(row: string, callback: (token: string, spaces: number) => void) {

        let tokenStart = -1, tokenEnd = 0;
        for (let i = 0; i < row.length; i++) {
            let ch = row[i];
            if (ch === " ") {
                if (tokenStart >= tokenEnd) {
                    callback(row.substring(tokenStart, i), tokenStart - tokenEnd);
                    tokenEnd = i;
                }
            } else {
                if (tokenStart < tokenEnd) {
                    tokenStart = i;
                }
            }
        }
        if (tokenStart > tokenEnd) {
            callback(row.substring(tokenStart), tokenStart - tokenEnd);
        }

    }

}

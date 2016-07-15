
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

            let rowKeys = row.split(/\s+/);
            for (let keyId of rowKeys) {
                let keyButton = document.createElement("button");
                let keyHandler = kb.handler(keyId);

                let key = new ButtonKey(keyId, keyButton);
                keyButton.type = "button";
                keyButton.innerText = kb.label(keyId);
                keyButton.addEventListener('click', function() {
                    keyHandler(kb, key);
                });
                keys.push(key);
                rowContainer.appendChild(keyButton);
            }
            container.appendChild(rowContainer);
        }

        document.body.appendChild(container);

        return keys;
    }
}

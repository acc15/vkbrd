
interface KeyHandler {
    (kb: Keyboard, key: Key): void;
}

interface KeyMap {
    [ keyId: string ] : KeyHandler;
}

interface Key {
    id: string;
    label: string;
}

class ButtonKey implements Key {

    id: string;
    button: HTMLButtonElement;

    constructor(id: string, button: HTMLButtonElement) {
        this.id = id;
        this.button = button;
    }

    get label() {
        return this.button.innerText;
    }

    set label(text:string) {
        this.button.innerText = text;
    }
}

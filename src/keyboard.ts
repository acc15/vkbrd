
interface Language {
    [ keyId : string ] : string[];
}


interface Config {
    layout: Layout;
    lang: Language[];
    keys: KeyMap[];
}

class Keyboard {

    private static DEFAULT_HANDLER: KeyHandler = (kb, key) => kb.print(key.label);

    private _langs: Language[];
    private _target: HTMLInputElement;
    private _keys: Key[];
    private _keyMap: KeyMap;
    private _shift: boolean = false;
    private _lang: number = 0;

    private updateKeyLabels() {
        for (let key of this._keys) {
            key.label = this.label(key.id);
        }
    }

    private static mergeKeyMaps(keyMaps: KeyMap[]) : KeyMap {
        let result: KeyMap = {};
        for (let keyMap of keyMaps) {
            for (let key in keyMap) {
                result[key] = keyMap[key];
            }
        }
        return result;
    }

    constructor(config: Config) {
        this._langs = config.lang;
        this._keyMap = Keyboard.mergeKeyMaps(config.keys);
        this._keys = config.layout.build(this);
    }

    attach(input: HTMLInputElement) {
        this._target = input;
    }

    label(keyId: string) {
        var labels = this._langs[this._lang][keyId];
        if (labels) {
            return labels[this._shift ? 1 : 0];
        } else {
            return keyId;
        }
    }

    handler(keyId: string) {
        var handler = this._keyMap[keyId];
        return handler ? handler : Keyboard.DEFAULT_HANDLER;
    }

    get shift(): boolean {
        return this._shift;
    }

    set shift(newShift: boolean) {
        if (this._shift !== newShift) {
            this._shift = newShift;
            this.updateKeyLabels();
        }
    }

    get language(): number {
        return this._lang;
    }

    set language(newLang: number) {
        if (this._lang !== newLang) {
            this._lang = newLang;
            this.updateKeyLabels();
        }
    }

    get totalLanguages(): number {
        return this._langs.length;
    }

    print(text: string) {
        if (!this._target) {
            return;
        }
        this._target.value += text;
        this._target.focus();
    }

    register(key: Key) {
        this._keys.push(key);
    }

}


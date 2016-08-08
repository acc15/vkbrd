namespace KeyMaps {

    export const DEFAULT: KeyMap = {
        "Lang": kb => kb.language = (kb.language + 1) % kb.totalLanguages,
        "Shift": kb => kb.shift = !kb.shift,
        "Space": kb => kb.print(" "),
        "Bksp": kb => kb.erase()
    }
}

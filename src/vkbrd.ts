document.addEventListener("DOMContentLoaded", function() {

    let kb = new Keyboard({
        layout: Layouts.QWERTY,
        lang: [ Languages.ENG, Languages.RUS ],
        keys: [ KeyMaps.DEFAULT ]
    }).attach(<HTMLInputElement>document.getElementById("inp"));

});

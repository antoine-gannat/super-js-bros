class HTMLManager {
    constructor(game) {
        this._game = game;
    }

    hideGameOverScreen() {
        var restart_element = document.getElementById("restart-container");
        restart_element.style.visibility = "hidden";
    }

    displayGameOverScreen() {
        var restart_element = document.getElementById("restart-container");
        restart_element.style.visibility = "visible";
    }
}
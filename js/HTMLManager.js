class HTMLManager {
    hideGameOverScreen() {
        var restart_element = document.getElementById("restart-container");
        restart_element.style.visibility = "hidden";
    }

    displayGameOverScreen() {
        var restart_element = document.getElementById("restart-container");
        restart_element.style.visibility = "visible";
    }

    changeMuteBtn() {
        if (!g_game._sounds_muted) {
            document.getElementById("sound-mute-icon").className = "fas fa-volume-up";
        }
        else
            document.getElementById("sound-mute-icon").className = "fas fa-volume-mute";
        // Remove the focus to the button
        document.getElementById("sound-mute-btn").blur();
    }
}
class HTMLManager {
    // Restart screen //

    // Update the number of lives remaining on the restart screen
    updateLivesRemaining() {
        var lives_remaining_span = document.getElementById("lives_remaining");
        lives_remaining_span.innerHTML = g_game._player._lives;
    }

    displayRestartScreen() {
        this.updateLivesRemaining();
        document.getElementById("restart-screen").style.visibility = "visible";
    }

    hideRestartScreen() {
        document.getElementById("restart-screen").style.visibility = "hidden";
    }

    // Display the game over screen
    displayGameOverScreen() {
        document.getElementById("gameover-screen").style.visibility = "visible";
    }

    hideGameOverScreen() {
        document.getElementById("gameover-screen").style.visibility = "hidden";
    }

    // Hide every screens
    hideAllScreens() {
        this.hideGameOverScreen();
        this.hideRestartScreen();
    }

    // Mute sound button //
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
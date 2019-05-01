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

    // Display the victory screen

    // Update the score of the victory screen
    updateVictoryScore() {
        document.getElementById("victory-score").innerHTML = Number(g_game._player._kill_nb * 10 + g_game._player._coins * 10);
    }

    displayVictoryScreen() {
        this.updateVictoryScore();
        document.getElementById("victory-screen").style.visibility = "visible";
    }

    hideVictoryScreen() {
        document.getElementById("victory-screen").style.visibility = "hidden";
    }


    // Hide every screens
    hideAllScreens() {
        this.hideGameOverScreen();
        this.hideRestartScreen();
        this.hideVictoryScreen();
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
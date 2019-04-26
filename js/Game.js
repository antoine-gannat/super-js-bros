class Game {
    constructor() {
        // Get the canvas
        this._canvas = document.getElementById("canvas");
        this._ctx = this._canvas.getContext("2d");

        // Set the canvas to 'fullscreen'
        this._ctx.canvas.width = window.innerWidth;
        this._ctx.canvas.height = window.innerHeight;

        // True if the music has started
        this._music_started = false;
        this._sounds_muted = false;
    }

    // Init the main classes
    init() {
        // Get the ressources manager
        this._resManager = new RessourceManager();
        this._eventManager = new EventManager();

        // The map
        this._map = new Map();

        // The physics
        this._physics = new Physics();

        // Create the player
        this._player = new Player();

        // Create the entity manager
        this._entityManager = new EntityManager();
        this._entityManager.addNewEntity(this._player);

        // HTML manager used to control html elements over the canvas (gameover, etc ..)
        this._HTMLManager = new HTMLManager();
    }

    startSoundtrack() {
        this._resManager.playSound("soundtrack", true);
        this._music_started = true;
    }

    gameover() {
        // Play the gameover sound
        this._resManager.stopSound("soundtrack");
        this._resManager.playSound("death");
        // Set the variable player to null
        this._player = null;
        // Display the gameover screen
        this._HTMLManager.displayGameOverScreen();
        this._music_started = false;
    }

    restart() {
        this._player = new Player();
        this._entityManager.addNewEntity(this._player);
        // Reset the map offset
        this._map._display_position_offset = 0;
        // Hide the gameover screen
        this._HTMLManager.hideGameOverScreen();
    }

    // Turn on or off the sound
    switchMuteSounds() {
        // If the sound is already muted, we unmute
        if (this._sounds_muted)
            this._sounds_muted = false;
        // Otherwise we mute the sound
        else {
            this._sounds_muted = true;
            this._resManager.stopAllSounds();
        }
        // Change the icon in the mute btn
        this._HTMLManager.changeMuteBtn();
    }

    renderFrame() {
        // clear the canvas
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

        // Execute events
        this._eventManager.executeEvents();

        // Display the map
        this._map.render();

        // Render the entities
        this._entityManager.render();
    }
}

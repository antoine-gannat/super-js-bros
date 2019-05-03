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

        // Fight manager used to tell which entity win or loose during a fight
        this._fightManager = new FightManager();

        // Ui manager used to render interfaces
        this._uiManager = new UiManager();
    }

    startSoundtrack() {
        this._resManager.playSound("soundtrack", 0.3, true);
        this._music_started = true;
    }

    onPlayerDeath() {
        // Play the gameover sound
        this._resManager.stopSound("soundtrack");
        this._resManager.playSound("death");
        // Set the variable player to null
        this._music_started = false;
        this._player._lives--;
        if (this._player._lives === 0) {
            // Display the gameover screen
            this._HTMLManager.displayGameOverScreen();
        }
        else {
            // Display the restart screen
            this._HTMLManager.displayRestartScreen();
        }
    }

    onPlayerWin() {
        // Kill the player to stop displaying him
        this._player._alive = false;
        // Display the victory screen
        this._HTMLManager.displayVictoryScreen();
    }

    restart() {
        // Reset the player's position
        this._player.revive(new Position(0, (MAP_HEIGHT - 5) * BLOCK_HEIGHT));
        // Add the player to the entity manager
        this._entityManager.addNewEntity(this._player);
        // Reset the map offset
        this._map._display_position_offset = 0;
        // Hide all screens
        this._HTMLManager.hideAllScreens();
    }

    renderFrame() {
        // clear the canvas
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

        // Execute input events
        this._eventManager.executeEvents();

        // Apply the physics 
        this._physics.applyPhysics();

        // Display the map
        this._map.render();

        // Render the entities
        this._entityManager.render();

        // Render the uis
        this._uiManager.render();

        // Render static ressources
        this._resManager.renderStaticRessources();
    }
}

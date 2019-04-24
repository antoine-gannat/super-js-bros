class Game {
    constructor() {
        // Get the canvas
        this._canvas = document.getElementById("canvas");
        this._ctx = this._canvas.getContext("2d");

        // Set the canvas to 'fullscreen'
        this._ctx.canvas.width = window.innerWidth;
        this._ctx.canvas.height = window.innerHeight;

        // Get the ressources manager
        this._resManager = new RessourceManager(this);
        this._eventManager = new EventManager(this);

        // The map
        this._map = new Map(this);

        // The physics
        this._physics = new Physics(this);

        // Entities

        // Create the player
        this._player = new Player(this);

        // Create the entity manager
        this._entityManager = new EntityManager(this);
        this._entityManager.addNewEntity(this._player);

        // HTML manager used to control html elements over the canvas (gameover, etc ..)
        this._HTMLManager = new HTMLManager(this);
    }

    gameover() {
        // Play the gameover sound
        this._resManager.playSound("death");
        // Set the variable player to null
        this._player = null;
        // Display the gameover screen
        this._HTMLManager.displayGameOverScreen();
        // Reset the map offset
        this._map._display_position_offset = 0;
    }

    restart() {
        this._player = new Player(this);
        this._entityManager.addNewEntity(this._player);
        this._HTMLManager.hideGameOverScreen();
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

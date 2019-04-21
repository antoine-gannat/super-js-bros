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

        // The character
        this._character = new Character(this);

        // The map
        this._map = new Map(this);
    }

    renderFrame() {
        // clear the canvas
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        // Display the map
        this._map.render();
        // Display the character
        this._character.render();
    }
}

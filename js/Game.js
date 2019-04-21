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
    }

    renderFrame() {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._resManager.displayImage("grass", new Position(20, this._canvas.height - 50), new Size(50, 50));
        this._character.render();
    }
}

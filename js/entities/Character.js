class Character extends Entity {
    constructor(game) {
        super(game, new Position(0, (MAP_HEIGHT - 5) * BLOCK_HEIGHT),
            new Size(50, 100),
            new Position(BLOCK_WIDTH / 20, BLOCK_WIDTH / 10));
        this._game = game;
    }

    die() {
        // Call the parent function
        super.die();
        // Set the character variable to null
        this._game._character = null;
    }

    render() {
        // Call the parent render function
        super.render();
        // Display the character
        this._game._resManager.displayImage("pablo", new Position(this.position.x - this._game._map._display_position * BLOCK_WIDTH, this.position.y), this._size);
    }
}
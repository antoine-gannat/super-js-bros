class Player extends Entity {
    constructor(game) {
        super(game, new Position(0, (MAP_HEIGHT - 5) * BLOCK_HEIGHT),
            new Size(40, 85),
            new Position(BLOCK_WIDTH / 20, BLOCK_WIDTH / 10), "pablo");
        this._game = game;
    }

    die() {
        // Call the parent function
        super.die();
        // Set the player variable to null
        this._game._player = null;
    }

    render() {
        super.updateJump();
        // Get the display position
        var display_position = new Position(this._position.x - this._game._map._display_position_offset * BLOCK_WIDTH, this._position.y);
        // Display the entity
        this._game._resManager.displayImage(this._asset_name, display_position, this._size);
    }
}
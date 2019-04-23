class Player extends Entity {
    constructor(game) {
        super(game, new Position(0, (MAP_HEIGHT - 5) * BLOCK_HEIGHT),
            new Size(40, 85),
            new Speed(BLOCK_WIDTH / 20, BLOCK_WIDTH / 10), "pablo");
        this._game = game;
    }

    die() {
        // Call the parent function
        super.die();
        // Set the player variable to null
        this._game._player = null;
    }
}
class Player extends Entity {
    constructor(game) {
        super(game, new Position(0, (MAP_HEIGHT - 5) * BLOCK_HEIGHT),
            new Size(40, 85),
            new Speed(BLOCK_WIDTH / 30, BLOCK_WIDTH / 10),
            game._resManager.getRessourceByName("pablo").clone(),
            DIRECTIONS.right);
        this._game = game;
        this._team = TEAMS.friend;
    }

    jump() {
        if (!super.jump())
            return;
        this._game._resManager.playSound("mario_jump");
    }

    die() {
        // Call the parent function
        super.die();

        // Call the game over function
        this._game.gameover();
    }
}
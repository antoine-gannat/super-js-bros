class Player extends Entity {
    constructor() {
        super(new Position(0, (MAP_HEIGHT - 5) * BLOCK_HEIGHT),
            new Size(40, 85),
            new Speed(BLOCK_WIDTH / 30, BLOCK_WIDTH / 10),
            g_game._resManager.getRessourceByName("mario").clone(),
            DIRECTIONS.east);
        this._team = TEAMS.friendly;
    }

    jump(overwrite = false) {
        if (!super.jump(overwrite))
            return;
        g_game._resManager.playSound("mario_jump");
    }

    die() {
        // Call the parent function
        super.die();

        // Call the game over function
        g_game.gameover();
    }
}
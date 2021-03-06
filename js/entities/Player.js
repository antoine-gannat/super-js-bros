class Player extends Entity {
    constructor() {
        super(new Position(0, (MAP_HEIGHT - 5) * BLOCK_HEIGHT),
            new Size(BLOCK_WIDTH - 5, BLOCK_HEIGHT * 1.5),
            new Speed(BLOCK_WIDTH / 30, BLOCK_WIDTH / 10),
            g_game._resManager.getRessourceByName("mario").clone(),
            DIRECTIONS.east);
        this._team = TEAMS.friendly;
        this._lives = STARTING_LIFE_NB;
        this._coins = 0;
    }

    increaseCoins(amount = 1) {
        this._coins += amount;
    }

    jump(overwrite = false) {
        if (!super.jump(overwrite))
            return;
        g_game._resManager.playSound("mario_jump", 0.5);
    }

    die() {
        // Call the parent function
        super.die();

        // Call the onPlayerDeath from the game class to handle the death
        g_game.onPlayerDeath();
    }
}
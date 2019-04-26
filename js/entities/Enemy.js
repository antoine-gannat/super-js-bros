class Enemy extends Entity {
    constructor(position, size, speed, asset, asset_orientation) {
        super(position, size, speed, asset, asset_orientation);
        this._team = TEAMS.enemy;
    }

    die() {
        g_game._resManager.playSound("kill");
        super.die();
    }
}
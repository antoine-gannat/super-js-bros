class Enemy extends Entity {
    constructor(game, position, size, speed, asset, asset_orientation) {
        super(game, position, size, speed, asset, asset_orientation);
        this._team = TEAMS.enemy;
    }
}
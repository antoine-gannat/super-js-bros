class Coin extends MapComponent {
    constructor(position) {
        super(g_game._resManager.getRessourceByName(MAP_COMPONENT_TYPES.coin).clone(), position);
        this._transparent = true;
    }

    onCollision(entity, direction) {
        if (entity._team === TEAMS.friendly) {
            // Increase the coins of the entity
            entity.increaseCoins();
            // Play sound
            g_game._resManager.playSound("coin_catched");
            this.destroy();
        }
    }
}
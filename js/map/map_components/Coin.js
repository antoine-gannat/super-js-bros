class Coin extends MapComponent {
    constructor(position) {
        super(g_game._resManager.getRessourceByName(MAP_COMPONENT_TYPES.coin).clone(), position);
        this._transparent = true;
    }

    onCollision(entity, direction) {
        if (entity._team === TEAMS.friendly) {
            entity.increaseCoins();
            g_game._resManager.playSound("coin_catched");
            this.destroy();
        }
    }
}
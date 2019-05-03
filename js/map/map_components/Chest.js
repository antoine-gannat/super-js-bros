class Chest extends MapComponent {
    constructor(position) {
        super(g_game._resManager.getRessourceByName(MAP_COMPONENT_TYPES.chest), position);
    }

    onCollision(entity, direction) {
        // If hit comes from somewhere else than underneath, return
        if (direction.south === false)
            return;

        entity.increaseCoins(10);
        g_game._resManager.playSound("coin_catched");
        this.destroy();
    }
}
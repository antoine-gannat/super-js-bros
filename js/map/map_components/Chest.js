class Chest extends MapComponent {
    constructor(position) {
        super(g_game._resManager.getRessourceByName(MAP_COMPONENT_TYPES.chest), position);
    }

    onCollision(entity, direction) {
        // If hit comes from somewhere else than underneath, return
        if (direction.south === false)
            return;
        this.destroy();
    }
}
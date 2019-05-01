class Chest extends MapComponent {
    constructor(position) {
        super(g_game._resManager.getRessourceByName(MAP_COMPONENT_TYPES.chest), position);
    }

    onCollision(entity, direction) {
        // If hit underneath, get destroyed
        if (direction.south === true)
            this.destroy();
    }
}
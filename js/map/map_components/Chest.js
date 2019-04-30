class Chest extends MapComponent {
    constructor(position) {
        super(MAP_COMPONENT_TYPES.chest, position);
    }

    onCollision(entity, direction) {
        // If hit underneath, get destroyed
        if (direction.south === true)
            this.destroy();
    }
}
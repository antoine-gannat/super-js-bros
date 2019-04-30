class MapComponent {
    constructor(type, position, size = new Size(BLOCK_WIDTH, BLOCK_HEIGHT)) {
        this._position = position;
        this._type = type;
        this._size = size;
    }

    onCollision(entity, direction) {
    }

    // Remove the component from the map
    destroy() {
        g_game._map.deleteComponent(this._position);
    }

    // Display the component
    render() {
        // Get the map offset
        const map_display_offset = g_game._map._display_position_offset;
        // Get the ressources manager
        const resManager = g_game._resManager;
        // Get the asset to display
        const asset = resManager.getRessourceByName(this._type);

        resManager.render(asset,
            new Position(this._position.x * BLOCK_WIDTH - map_display_offset, this._position.y * BLOCK_HEIGHT),
            this._size);
    }
}
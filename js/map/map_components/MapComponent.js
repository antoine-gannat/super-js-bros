class MapComponent {
    constructor(asset, position, size = new Size(BLOCK_WIDTH, BLOCK_HEIGHT), transparent = false) {
        this._position = position;
        this._size = size;
        this._transparent = transparent;
        this._asset = asset;
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

        resManager.render(this._asset,
            new Position(this._position.x * BLOCK_WIDTH - map_display_offset, this._position.y * BLOCK_HEIGHT),
            this._size);
    }
}
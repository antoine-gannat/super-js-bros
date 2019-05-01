class Castle extends MapComponent {
    constructor(position) {
        super(g_game._resManager.getRessourceByName(MAP_COMPONENT_TYPES.castle), position, new Size(BLOCK_WIDTH * 2, BLOCK_HEIGHT * 2));
    }
}
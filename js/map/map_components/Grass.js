class Grass extends MapComponent {
    constructor(position) {
        super(g_game._resManager.getRessourceByName(MAP_COMPONENT_TYPES.grass), position);
    }
}
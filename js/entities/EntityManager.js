class EntityManager {
    constructor() {
        this._entities = [];

        this.generateEnemies();
    }

    generateEnemies() {
        var enemy_count = g_game._map._map_length / 10;
        var entity_block_height = 2;

        for (var i = 0; i < enemy_count; i++) {
            // Generate the x position for the enemy
            var x_pos = Math.floor(Math.random() * (g_game._map._map_length - STARTING_PLATFORM_SIZE)) + STARTING_PLATFORM_SIZE;
            // Set the enemy y position right above the highest component at x = x_pos
            var y_pos = BLOCK_HEIGHT * (g_game._map.getMapHeightAt(x_pos) - entity_block_height);
            this._entities.push(new Koopa(new Position(x_pos * BLOCK_WIDTH, y_pos)));
        }
    }

    addNewEntity(entity) {
        this._entities.push(entity);
    }

    // Return the entities present on the screen
    getEntitiesOnScreen() {
        return this.getEntities().filter((e) => {
            return (e._position.x - g_game._map._display_position_offset >= 0
                && e._position.x - g_game._map._display_position_offset <= window.innerWidth);
        });
    }

    // Remove an entity from the entities array
    deleteEntity(entity_id) {
        // Find the entity to kill
        var entity_index = this._entities.findIndex((e) => { return (e._id === entity_id) });
        // If the entity was not found, leave
        if (entity_index < 0)
            return;
        // Remove the entity from the entities array
        this._entities.splice(entity_index, 1);
    }

    getEntities() {
        return (this._entities);
    }

    render() {
        // Render entities present on the screen
        this.getEntitiesOnScreen().forEach((entity) => {
            entity.render();
        });
    }
}
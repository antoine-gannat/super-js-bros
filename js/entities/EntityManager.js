class EntityManager {
    constructor() {
        this._entities = [];

        this.generateEnemies();
    }

    generateEnemies() {
        var enemy_count = g_game._map._map_width / 10;
        var entity_block_height = 2;

        for (var i = 0; i < enemy_count; i++) {
            var x_pos = Math.floor(Math.random() * (g_game._map._map_width - STARTING_PLATFORM_SIZE)) + STARTING_PLATFORM_SIZE;
            var y_pos = BLOCK_HEIGHT * (MAP_HEIGHT - entity_block_height - g_game._map.getMapHeightAt(x_pos));
            this._entities.push(new Koopa(new Position(x_pos * BLOCK_WIDTH, y_pos)));
        }
    }

    addNewEntity(entity) {
        this._entities.push(entity);
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

    render() {
        this._entities.forEach((entity) => {
            // Apply gravity to the player
            g_game._physics.applyGravityToEntity(entity);
            // Check collision with other entities
            g_game._physics.checkEntitiesHit(entity).forEach((e) => {
                // If the entites are not in the same team
                if (entity._team !== e._team) {
                    var ally = (entity._team === TEAMS.friend ? entity : e);
                    var enemy = (entity._team === TEAMS.friend ? e : entity);
                    var ally_feet_pos = ally._position.y + ally._size._height;
                    var enemy_head_pos = enemy._position.y;

                    if (enemy_head_pos - 3 <= ally_feet_pos && ally_feet_pos <= enemy_head_pos + 3) {
                        ally.forceJump();
                        enemy.die();
                    }
                    else
                        ally.die();
                }
            });
            entity.render();
        });
    }
}
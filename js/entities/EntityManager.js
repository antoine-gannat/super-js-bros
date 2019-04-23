class EntityManager {
    constructor(game) {
        this._game = game;
        this._entities = [];

        this.generateEnemies();
    }

    generateEnemies() {
        var enemy_count = this._game._map._map_width / 10;
        var entity_block_height = 2;

        for (var i = 0; i < enemy_count; i++) {
            var x_pos = Math.floor(Math.random() * (this._game._map._map_width - STARTING_PLATFORM_SIZE)) + STARTING_PLATFORM_SIZE;
            var y_pos = BLOCK_HEIGHT * (MAP_HEIGHT - entity_block_height - this._game._map.getMapHeightAt(x_pos));
            this._entities.push(new Koopa(this._game, new Position(x_pos * BLOCK_WIDTH, y_pos)));
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
            this._game._physics.applyGravityToEntity(entity);
            // Check collision with other entities
            this._game._physics.checkEntitiesHit(entity).forEach((e) => {
                // If the entites are not in the same team
                if (entity._team !== e._team) {
                    this._game._player.die();
                }
            });
            entity.render();
        });
    }
}
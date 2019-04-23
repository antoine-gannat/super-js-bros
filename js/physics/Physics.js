class Physics {
    constructor(game) {
        this._game = game;
        this._gravity_force = Math.round(BLOCK_HEIGHT / 15);
    }

    // Check if the entity has hit a block
    checkBlockHit(position, size) {
        // Get feet position
        var left_foot_pos = new Position(position.x, position.y + size.height);
        var right_foot_pos = new Position(position.x + size.width, position.y + size.height);
        var center_pos = new Position(position.x + size.width / 2, position.y + size.height);

        // Get block located at each foot
        var right_foot_block = this._game._map.getBlockAtPos(new Convertion().screenPosToBlockPos(right_foot_pos));
        var left_foot_block = this._game._map.getBlockAtPos(new Convertion().screenPosToBlockPos(left_foot_pos));
        var center_block = this._game._map.getBlockAtPos(new Convertion().screenPosToBlockPos(center_pos));

        if (left_foot_block || right_foot_block || center_block)
            return (true);
        return (false);
    }

    // Check if an entity hit another entity
    checkEntitiesHit(entity) {
        var entities_hit = [];
        this._game._entityManager._entities.forEach((e) => {
            // Don't count itself
            if (entity._id === e._id)
                return;
            // Check if the entities are touching
            if (entity._position.x >= e._position.x && entity._position.x <= e._position.x + e._size.width
                && entity._position.y <= e._position.y && entity._position.y + entity._size.height >= e._position.y) {
                entities_hit.push(e);
            }
        });
        return (entities_hit);
    }

    applyGravityToEntity(entity) {
        // If the entity is jumping or is already touching the ground, leave
        if (this.checkBlockHit(entity._position, entity._size) || entity._jumping)
            return;
        entity.moveY(this._gravity_force);
    }

    // Return true if the entity is falling
    isEntityFalling(entity) {
        return (!this.checkBlockHit(entity._position, entity._size));
    }

    // Return true if the movement is allowed
    allowEntityMovement(entity, new_position) {
        return (!this.checkBlockHit(new_position, entity._size));
    }
};
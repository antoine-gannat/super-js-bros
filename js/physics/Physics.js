class Physics {
    constructor(game) {
        this._game = game;
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

    applyGravityToEntity(entity) {
        if (this.checkBlockHit(entity.position, entity.size) || entity._jumping)
            return;
        entity.position.y += Math.round(BLOCK_HEIGHT / 15);
    }

    isEntityFalling(entity) {
        return (!this.checkBlockHit(entity.position, entity.size));
    }

    allowEntityMovement(entity, new_position) {
        return (!this.checkBlockHit(new_position, entity.size));
    }
};
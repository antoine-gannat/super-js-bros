class Physics {
    constructor(game) {
        this._game = game;
    }

    // Check if the entity has hit a block
    checkBlockHit(entity) {
        // Get feet position
        var left_foot_pos = new Position(entity.position.x, entity.position.y + entity.size.height);
        var right_foot_pos = new Position(entity.position.x + entity.size.width, entity.position.y + entity.size.height);

        // Get block located at each foot
        var right_foot_block = this._game._map.getBlockAtPos(new Convertion().screenPosToBlockPos(right_foot_pos));
        var left_foot_block = this._game._map.getBlockAtPos(new Convertion().screenPosToBlockPos(left_foot_pos));

        if (left_foot_block || right_foot_block)
            return (true);
        return (false);
    }

    applyGravityToEntity(entity) {
        if (this.checkBlockHit(entity) || entity._jumping)
            return;
        entity.position.y += Math.round(BLOCK_HEIGHT / 15);
    }

    isEntityFalling(entity) {
        return (!this.checkBlockHit(entity))
    }
};
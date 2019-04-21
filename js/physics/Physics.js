class Physics {
    constructor(game) {
        this._game = game;
    }

    // Check if the character has hit a block
    checkBlockHit(character) {
        var left_feet_pos = new Position(character.position.x, character.position.y + character.size.height);
        var left_feet_block = this._game._map.getBlockAtPos(new Convertion().screenPosToBlockPos(left_feet_pos));
        var right_feet_pos = new Position(character.position.x + character.size.width, character.position.y + character.size.height);
        var right_feet_block = this._game._map.getBlockAtPos(new Convertion().screenPosToBlockPos(right_feet_pos));
        if (left_feet_block || right_feet_block)
            return (true);
        return (false);
    }

    applyGravityToCharacter(character) {
        if (this.checkBlockHit(character))
            return;
        character.position.y += Math.round(BLOCK_HEIGHT / 15);
    }
};
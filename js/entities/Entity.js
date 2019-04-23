class Jump {
    constructor(entity, height, speed) {
        this._entity = entity;
        this._speed = speed;
        this._height_remaining = height;
    }

    // Called at each frame, execute the jump smoothly
    // Return false once the jump is done

    execute() {
        if (this._height_remaining <= 0)
            return (false);

        this._height_remaining -= this._speed;
        // Change the y position of the entity
        this._entity.moveY(-this._speed);
        return (true);
    }
}

class Entity {
    constructor(game, position, size, speed, asset, asset_orientation) {
        // Assign a unique id
        this._id = Symbol();
        this._game = game;
        this._position = position;
        this._size = size;
        this._direction = DIRECTIONS.right;
        this._speed = speed;
        this._asset = asset;
        this._asset.attachEntity(this);
        this._asset_orientation = asset_orientation;

        // 
        this._team = undefined;
        // not null if jumping
        this._jumping = null;

        // True if the player has move since the last sprite render
        this._has_moved = false;
    }

    // Remove the entity from the entities list
    die() {
        this._game.killEntity(this._id);
    }

    moveX(xMovement) {
        if (this._position.x + xMovement < 0)
            return;
        if (!this._game._physics.allowEntityMovement(this, new Position(this._position.x + xMovement, this._position.y - 4)))
            return;
        if (xMovement < 0)
            this._direction = DIRECTIONS.left;
        else
            this._direction = DIRECTIONS.right;
        this._position.x += xMovement;
        this._has_moved = true;
    }

    moveY(yMovement) {
        if (this._position.y + yMovement < 0)
            return;
        this._position.y += yMovement;
        // If the player fell out of the world
        if (this._position.y > MAP_HEIGHT * BLOCK_HEIGHT)
            this.die();
    }

    jump() {
        // If the player is currently jumping or falling, leave
        if (this._jumping || this._game._physics.isEntityFalling(this)) {
            return;
        }
        // Jump
        this._jumping = new Jump(this, BLOCK_HEIGHT * 3, this._speed.vertical);
    }

    updateJump() {
        // If the player is done jumping, we set the _jumping variable value to null
        if (this._jumping && !this._jumping.execute())
            this._jumping = null;
    }

    render() {
        this.updateJump();
        // Display the entity
        // If a custom position exist
        var flip = new Flip((this._direction !== this._asset_orientation));
        var display_position = new Position(this._position.x - this._game._map._display_position_offset * BLOCK_WIDTH, this._position.y);
        this._game._resManager.render(this._asset, display_position, this._size, flip);
    }
}
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
    constructor(game, position, size, speed, asset_name) {
        this._id = Symbol();
        this._game = game;
        this._position = position;
        this._size = size;
        this._direction = "right";
        this._speed = speed;
        this._asset_name = asset_name;

        // not null if jumping
        this._jumping = null;
    }

    // Remove the entity from the entities list
    die() {
        this._game.killEntity(this._id);
    }

    moveX(xMovement) {
        if (this._position.x + xMovement < 0)
            return;
        if (!this._game._phisics.allowEntityMovement(this, new Position(this._position.x + xMovement, this._position.y - 4)))
            return;
        if (xMovement < 0)
            this._direction = "left";
        else
            this._direction = "right";
        this._position.x += xMovement;
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
        if (this._jumping || this._game._phisics.isEntityFalling(this)) {
            return;
        }
        // Jump
        this._jumping = new Jump(this, BLOCK_HEIGHT * 3, this._speed.y);
    }

    updateJump() {
        // If the player is done jumping, we set the _jumping variable value to null
        if (this._jumping && !this._jumping.execute())
            this._jumping = null;
    }

    render() {
        this.updateJump();
        // Display the entity
        this._game._resManager.displayImage(this._asset_name, this._position, this._size);
    }
}
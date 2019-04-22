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
        this._entity.position.y -= this._speed;
        return (true);
    }
}

class Entity {
    constructor(game, position, size, speed) {
        this._game = game;
        this._position = position;
        this._size = size;
        this._direction = "right";
        this._speed = speed;

        // not null if jumping
        this._jumping = null;
    }

    set position(newPosition) {
        this._position = newPosition;
    }

    get position() {
        return (this._position);
    }
    get size() {
        return (this._size);
    }

    set size(newSize) {
        this._size = newSize;
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
    }

    jump() {
        if (this._jumping || this._game._phisics.isEntityFalling(this)) {
            return;
        }
        this._jumping = new Jump(this, BLOCK_HEIGHT * 3, this._speed.y);
    }

    render() {
        if (this._jumping && !this._jumping.execute())
            this._jumping = null;
    }
}
class Entity {
    constructor(position, size, speed, asset, asset_orientation) {
        // Assign a unique id
        this._id = Symbol();
        this._position = position;
        this._size = size;
        this._direction = DIRECTIONS.east;
        this._speed = speed;
        this._asset = asset;
        this._asset.attachEntity(this);
        this._asset_orientation = asset_orientation;
        this._team = undefined;
        this._kill_nb = 0;
        // Alive status
        this._alive = true;
        // Velocity of the entity
        this._velocity = 0;
        // Force of a jump
        this._jump_force = BLOCK_HEIGHT / 10;
        // Distance remaining for this jump
        this._jump_distance = 0;
        // True if the entity is in the air
        this._in_the_air = false;
        // True if the player has move since the last sprite render
        this._has_moved = false;
        // Save the last position of the entity (default is -1, -1)
        this._last_position = new Position(Number(position.x), Number(position.y));
    }

    // Getters and setters //

    get velocity() {
        return (this._velocity);
    }

    set velocity(new_value) {
        // Do not reduce the velocity while the jump is in ascending phase
        if (this._jump_distance > 0 && new_value < this._velocity)
            return;
        this._velocity = new_value;

        // The downward velocity can not be inferior to the gravity force value
        if (this._velocity < -GRAVITY_FORCE)
            this._velocity = -GRAVITY_FORCE;
    }

    // Remove the entity from the entities list
    die() {
        this._alive = false;
    }

    // Play an animation
    deathAnimation() {
        // Increase the y position
        this._position.y += 3;
        // If the height is out of the screen
        // Return false
        if (this._position.y > window.innerHeight)
            return (false);
        // Render the asset
        this.renderAsset();
        return (true);
    }

    revive(revive_position) {
        this._position = revive_position;
        this._alive = true;
    }

    increaseKillNb() {
        this._kill_nb++;
    }

    // Movements //

    moveX(xMovement) {
        // If the x positon goes below 0 or the entity is dead
        if (this._position.x + xMovement < 0 || !this._alive)
            return;
        if (!g_game._physics.allowEntityMovement(this,
            new Position(this._position.x + xMovement, this._position.y - 4)))
            return;
        if (xMovement < 0)
            this._direction = DIRECTIONS.west;
        else
            this._direction = DIRECTIONS.east;
        // Save the last position
        this._last_position.x = Number(this._position.x);
        // Update the position
        this._position.x += xMovement;
        this._has_moved = true;
    }

    moveY(yMovement) {
        // If the x positon goes below 0 or the entity is dead
        if (this._position.y + yMovement < 0 || !this._alive)
            return;
        if (!g_game._physics.allowEntityMovement(this,
            new Position(this._position.x, this._position.y + yMovement))) {
            if (yMovement > 0)
                this._in_the_air = false;
            return;
        }
        if (yMovement < 0)
            this._in_the_air = true;
        // Save the last position
        this._last_position.y = Number(this._position.y);
        // Update the position
        this._position.y += yMovement;
        // If the player fell out of the world
        if (this._position.y > window.innerHeight && this._alive) {
            this.die();
        }
    }

    // The entity jump
    // If 'overwrite' is true, the entity will jump ignoring every restrictions 
    jump(overwrite = false) {
        if (!this._alive)
            return;
        // If the player is currently jumping or falling, leave
        if (!overwrite && (this._in_the_air || this._jump_distance > 0)) {
            return (false);
        }
        this._jump_distance = BLOCK_HEIGHT * 4;
        return (true);
    }

    updateJump() {
        if (this._jump_distance <= 0) {
            return;
        }
        this.velocity = this._jump_force;
        this._jump_distance -= this._jump_force;
    }

    // Return true if the entity is falling
    isFalling() {
        return (this._in_the_air && this._velocity < 0);
    }

    renderAsset() {
        // If a custom position exist
        var flip = new Flip((this._direction !== this._asset_orientation));
        // Calculate the position to display according to the map offst
        var display_position = new Position(this._position.x - g_game._map._display_position_offset, this._position.y);
        // Display the entity
        g_game._resManager.render(this._asset, display_position, this._size, flip);
    }

    render() {
        // If the entity is dead
        if (!this._alive) {
            // Play the death animation
            // If the animation is finished, delete the entity
            if (!this.deathAnimation())
                g_game._entityManager.deleteEntity(this._id);
            return;
        }
        // Move on the y axis according to the velocity
        // The velocity is set to its negative value because the y0 is at the top of the screen
        this.moveY(-this._velocity);
        this.updateJump();

        // Render the asset
        this.renderAsset();
    }
}
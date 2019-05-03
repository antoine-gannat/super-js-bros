class Physics {
    // Check if the element has Collision a component
    checkComponentCollision(element, custom_position = null, call_callback = true) {
        var has_collided = false;
        // Get the map components near the player
        var components = g_game._map.getComponentsNearEntity(element);
        var position_to_check = (custom_position != null ? custom_position : element._position);

        // Get the edges 
        var element1_edges = Convertion.getEdgePositions(position_to_check, element._size);
        var element1_old_edges = Convertion.getEdgePositions(element._last_position, element._size);

        // Check collisions between the element and the component currently on the screen
        for (var i = 0; i < components.length; i++) {
            var component = components[i];
            var element2_edges = Convertion.getEdgePositions(Convertion.blockPosToScreenPos(component._position), component._size);
            var collisions = this.getCollisionDirection(element1_edges, element2_edges, element1_old_edges);

            if (!collisions.north && !collisions.south && !collisions.west && !collisions.east) {
                continue;
            }
            // Call the callback function on the component
            if (call_callback)
                component.onCollision(element, collisions);
            // If the component is transparent, there is no collision
            if (!has_collided && !component._transparent)
                has_collided = true;
        };
        return (has_collided);
    }

    // Return true if the two elements are at the same Y level
    areEntitiesAtSameYLevel(element1_edges, element2_edges) {
        return (
            (element1_edges.top_left.y <= element2_edges.top_left.y
                && element2_edges.top_left.y <= element1_edges.bottom_left.y)
            || (element2_edges.top_left.y <= element1_edges.top_left.y
                && element1_edges.top_left.y <= element2_edges.bottom_left.y)
        );
    }

    // Return true if the two elements are at the same X level
    areEntitiesAtSameXLevel(element1_edges, element2_edges) {
        return (
            (element1_edges.top_left.x >= element2_edges.top_left.x
                && element1_edges.top_left.x <= element2_edges.top_right.x)
            || (element1_edges.top_right.x >= element2_edges.top_left.x
                && element1_edges.top_right.x <= element2_edges.top_right.x)
        );
    }

    // Check if element1 has collided from the left with element2
    collidedFromLeft(element2_edges, element1_old_edges) {
        // if element1 was on the left and is now colliding
        return (element1_old_edges.top_right.x < element2_edges.top_left.x);
    }

    // Check if element1 has collided from the right with element2
    collidedFromRight(element2_edges, element1_old_edges) {
        // if element1 was on the right and is now colliding
        return (element1_old_edges.top_left.x > element2_edges.top_right.x);
    }

    // Check if element1 has collided from the top with element2
    collidedFromTop(element2_edges, element1_old_edges) {
        // if element1 was on top and is now colliding
        return (element1_old_edges.bottom_left.y < element2_edges.top_left.y);
    }

    // Check if element1 has collided from the bottom with element2
    collidedFromBottom(element2_edges, element1_old_edges) {
        // if element1 was below and is now colliding
        return (element1_old_edges.top_left.y > element2_edges.bottom_left.y);
    }

    // Get the direction from which the entities had a collision (north, south, east or west)
    getCollisionDirection(element1_edges, element2_edges, element1_old_edges) {
        var top = false, bottom = false, left = false, right = false;

        if (!this.areEntitiesAtSameXLevel(element1_edges, element2_edges)          // if the entities are at the same x level
            || !this.areEntitiesAtSameYLevel(element1_edges, element2_edges))      // and they are at the same y level
            return ({ west: false, east: false, north: false, south: false });

        // Get the origin of the collision
        left = this.collidedFromLeft(element2_edges, element1_old_edges);
        right = this.collidedFromRight(element2_edges, element1_old_edges);
        top = this.collidedFromTop(element2_edges, element1_old_edges);
        bottom = this.collidedFromBottom(element2_edges, element1_old_edges);
        // Return as directionss
        return ({ west: left, east: right, north: top, south: bottom });
    }

    // Check if an entity Collision another entity
    checkEntitiesCollision(entity) {
        var entities = g_game._entityManager.getEntitiesOnScreen();
        var element1_edges = Convertion.getEdgePositions(entity._position, entity._size);
        var element1_old_edges = Convertion.getEdgePositions(entity._last_position, entity._size);

        entities.forEach((e) => {
            // Don't check with itself or with entities of the same team
            if (entity._id === e._id || entity._team === e._team)
                return;
            var element2_edges = Convertion.getEdgePositions(e._position, e._size);

            // Check if the entities are colliding
            const collisions = this.getCollisionDirection(element1_edges, element2_edges, element1_old_edges);
            if (!collisions.north && !collisions.south && !collisions.west && !collisions.east) {
                return;
            }
            // Fight and kill the losing entity
            g_game._fightManager.fight(entity, e, collisions);
        });
    }
    // Apply physics rules to entities //

    applyGravityToEntity(entity) {
        // Reduce the velocity of the entity by the gravity force 
        entity.velocity -= GRAVITY_FORCE;
    }

    // Return true if the movement is allowed
    allowEntityMovement(entity, new_position) {
        return (!this.checkComponentCollision(entity, new_position));
    }

    // Apply physics to each entity
    applyPhysics() {
        g_game._entityManager.getEntities().forEach((e) => {
            // Apply the gravity
            this.applyGravityToEntity(e);

            // Check Collision with other entity present on the screen
            this.checkEntitiesCollision(e);

            // Check Collision with a component present on the screen
            this.checkComponentCollision(e);
        });
    }
};
class FightManager {

    // Return the enemy from the two entities
    getEnemyEntity(entity1, entity2) {
        if (entity1._team === TEAMS.enemy)
            return (entity1);
        return (entity2);
    }

    // Return the friendly from the two entities
    getFriendlyEntity(entity1, entity2) {
        if (entity1._team === TEAMS.friendly)
            return (entity1);
        return (entity2);
    }

    // Do a fight between 2 entities, the looser die
    fight(entity1, entity2, hit_direction) {
        var friendly = this.getFriendlyEntity(entity1, entity2);
        var enemy = this.getEnemyEntity(entity1, entity2);

        // Don't fight if one of the entity is dead
        if (!enemy._alive || !friendly._alive) {
            return;
        }
        // If the hit comes from the north (up) or south (down),
        // depending if the hit was catched from the friendly or enemy entity
        // And the friendly entity is higher than the enemy (hit on the head)
        // Then the friendly entity win
        if (((hit_direction.north || hit_direction.south) && friendly._position.y < enemy._position.y)) {
            // Jump on top of the enemy
            friendly.jump(true);
            friendly.increaseKillNb();
            // Kill the neemy
            enemy.die();
        }
        // Enemy win
        else {
            // Kill the friendly unit
            friendly.die();
            enemy.increaseKillNb();
        }
    }
}
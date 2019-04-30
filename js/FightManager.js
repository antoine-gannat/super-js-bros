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

        // If the hit comes from the north (up) and it's the friendly entity that is higher
        // Friendly win
        if (hit_direction.north) {
            // Jump on top of the enemy
            friendly.forceJump();
            // Kill the neemy
            enemy.die();
        }
        // Enemy win
        else {
            // Kill the friendly unit
            friendly.die();
        }
    }
}
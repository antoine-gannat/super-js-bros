class Game {
    constructor() {
        // Get the canvas
        this._canvas = document.getElementById("canvas");
        this._ctx = this._canvas.getContext("2d");

        // Set the canvas to 'fullscreen'
        this._ctx.canvas.width = window.innerWidth;
        this._ctx.canvas.height = window.innerHeight;

        // Get the ressources manager
        this._resManager = new RessourceManager(this);
        this._eventManager = new EventManager(this);

        // Entities
        this._entities = [];

        // Create the player
        this._player = new Player(this);
        this._entities.push(this._player);
        this._entities.push(new Koopa(this));
        this._entities.push(new Koopa(this));
        this._entities.push(new Koopa(this));

        // The map
        this._map = new Map(this);

        // The physics
        this._physics = new Physics(this);
    }

    // Remove an entity from the entities array
    killEntity(entity_id) {
        // Find the entity to kill
        var entity_index = this._entities.findIndex((e) => { return (e._id === entity_id) });
        // If the entity was not found, leave
        if (entity_index < 0)
            return;
        // Remove the entity from the entities array
        this._entities.splice(entity_index, 1);
    }


    renderFrame() {
        // clear the canvas
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

        // Execute events
        this._eventManager.executeEvents();

        // Display the map
        this._map.render();

        // Render the entities
        this._entities.forEach((entity) => {
            // Apply gravity to the player
            this._physics.applyGravityToEntity(entity);
            // Check collision with other entities
            this._physics.checkEntitiesHit(entity).forEach((e) => {
                // If the entites are not in the same team
                if (entity._team !== e._team) {
                    this._player.die();
                }
            });
            entity.render();
        });
    }
}

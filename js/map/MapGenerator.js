class MapGenerator {
    constructor(map_length, map_height) {
        if (!map_length || map_length < STARTING_PLATFORM_SIZE + ENDING_PLATFORM_SIZE + 1)
            throw new Error("The map length must be at least " + STARTING_PLATFORM_SIZE + ENDING_PLATFORM_SIZE + 1);
        // Save the length of the map
        this._map_length = map_length;
        this._map_height = map_height;
        // Create a component factory to create new map components
        this._componentsFactory = new ComponentsFactory();
        this._map = new Array(this._map_length).fill(null).map(item => (new Array(this._map_height).fill(null)));

        // Last component changed
        this._last_component_changed = null;

        // Generation constants
        this._free_top_components = 3;
    }

    // Change the component at position 'new_component._position' by 'new_component'
    changeMapComponent(new_component, save_component = true) {
        this._map[new_component._position.x][new_component._position.y] = new_component;
        if (save_component)
            this._last_component_changed = new_component;
    }

    // Get the y value of the highest component in the map at x: 'column'
    getMapHeightAt(column) {
        if (column < 0 || column >= this._map_length)
            return (-1);
        // Set the height at 0
        var height = 0;
        // While we haven't reach the last row and the components are null
        while (height < this._map[column].length
            && (this._map[column][height] === null || this._map[column][height]._transparent)) {
            // Increase the height
            height++;
        }
        return (height);
    }

    // Generation //

    // Generate a flat platform at the begining of the map
    generateStartingPlatform() {
        // The starting height is at the last row of the map
        const platform_height = MAP_HEIGHT - 1;
        // Generate 5 blocs of grass
        for (var map_col = 0; map_col < STARTING_PLATFORM_SIZE; map_col++) {
            // Create a new component
            var new_component = this._componentsFactory.newComponent(MAP_COMPONENT_TYPES.grass,
                new Position(map_col, platform_height));
            // Add the component 'new_component' to the map at position x: 'map_col', y: 'platform_height' 
            this.changeMapComponent(new_component);
        }
    }

    // Generate a flat platform at the end of the map
    generateEndingPlatform() {
        // The starting height is at the last row of the map
        const platform_height = this.getMapHeightAt(this._map_length - ENDING_PLATFORM_SIZE - 1);
        // Generate 5 blocs of grass
        for (var map_col = this._map_length - ENDING_PLATFORM_SIZE; map_col < this._map_length; map_col++) {
            // Create a new component
            var new_component = this._componentsFactory.newComponent(MAP_COMPONENT_TYPES.grass,
                new Position(map_col, platform_height));
            // Add the component 'new_component' to the map at position x: 'map_col', y: 'platform_height' 
            this.changeMapComponent(new_component);
            this.fillBelowWithComponentType(map_col, MAP_COMPONENT_TYPES.dirt);
        }
        // Add a castle at the end
        this.changeMapComponent(this._componentsFactory.newComponent(MAP_COMPONENT_TYPES.castle,
            new Position(this._map_length - Math.floor(ENDING_PLATFORM_SIZE / 2), platform_height - 2)), false);
    }

    // Fill with component of type: 'component_type' below the first non-null component of column: 'column'
    fillBelowWithComponentType(column, component_type) {
        var component_found = false;
        // For each component of this column
        this._map[column].map((component, index) => {
            // If the component is not null, we continue
            if (component !== null) {
                component_found = true;
                return;
            }
            // If we haven't yet found a non-null component, we return
            if (!component_found)
                return;
            var new_component = this._componentsFactory.newComponent(component_type, new Position(column, index));
            this.changeMapComponent(new_component, false);
        })
    }

    // Return a component that is part of a mountain
    generateMountains(map_col) {
        // Get the last component y position
        var new_height = this.getMapHeightAt(map_col - 1);
        // 50% of chance to go higher
        var go_higher = Math.round(Math.random());
        var stay_same_height = Math.round(Math.random());
        // If 'go_higher' is true and there is at least '_free_top_components' null components
        if (go_higher && new_height - this._free_top_components >= 0 && !stay_same_height)
            new_height--;
        // Otherwise
        else if (!go_higher && new_height + 1 < MAP_HEIGHT && !stay_same_height)
            new_height++;
        // Return the new component
        return (this._componentsFactory.newComponent(MAP_COMPONENT_TYPES.grass, new Position(map_col, new_height)));
    }

    generateCoin(map_col) {
        // Chance of generation of a coin
        if (Math.round(Math.random() - 0.3) === 0)
            return (null);
        var height = this.getMapHeightAt(map_col);
        if (height === -1)
            return (null);
        return (this._componentsFactory.newComponent(MAP_COMPONENT_TYPES.coin, new Position(map_col, height - 2)));
    }

    // /Generation //

    generateSpecialComponents() {
        // Add a chest
        this.changeMapComponent(this._componentsFactory.newComponent(MAP_COMPONENT_TYPES.chest, new Position(1, 16)), false);
    }

    // Generate a new map
    generate() {
        // Generate a flat platform at the begining of each map
        this.generateStartingPlatform();

        for (var map_col = STARTING_PLATFORM_SIZE; map_col < this._map_length - ENDING_PLATFORM_SIZE; map_col++) {
            // Create a new component and add it to the map
            this.changeMapComponent(this.generateMountains(map_col));
            // Fill the rest of the map with dirt components
            this.fillBelowWithComponentType(map_col, MAP_COMPONENT_TYPES.dirt);
            // Generate a coin
            var new_coin = this.generateCoin(map_col);
            if (new_coin)
                this.changeMapComponent(new_coin);
        }
        this.generateEndingPlatform();
        this.generateSpecialComponents();
        return (this._map);
    }
}
class MapGenerator {
    constructor(map_length, map_height) {
        if (!map_length || map_length < 10)
            throw new Error("The map length must be at least 10");
        // Save the length of the map
        this._map_length = map_length;
        this._map_height = map_height;
        // Create a component factory to create new map components
        this._componentsFactory = new ComponentsFactory();
        this._map = new Array(this._map_length).fill(null).map(item => (new Array(this._map_height).fill(null)));

        // Last component changed
        this._last_component_changed = null;
    }

    // Change the component at position 'new_component._position' by 'new_component'
    changeMapComponent(new_component, save_component = true) {
        this._map[new_component._position.x][new_component._position.y] = new_component;
        if (save_component)
            this._last_component_changed = new_component;
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
        var new_height = this._last_component_changed._position.y;
        // 50% of chance to go higher
        var go_higher = Math.round(Math.random());
        if (go_higher && new_height - 1 >= 0)
            new_height--;
        else if (!go_higher && new_height + 1 < MAP_HEIGHT)
            new_height++;
        return (this._componentsFactory.newComponent(MAP_COMPONENT_TYPES.grass, new Position(map_col, new_height)));
    }

    // /Generation //

    // Generate a new map
    generate() {
        // Generate a flat platform at the begining of each map
        this.generateStartingPlatform();

        for (var map_col = STARTING_PLATFORM_SIZE; map_col < this._map_length; map_col++) {
            // Create a new componenet
            var new_component = this.generateMountains(map_col);
            // Add the component to the map
            this.changeMapComponent(new_component);
            this.fillBelowWithComponentType(map_col, MAP_COMPONENT_TYPES.dirt);
        }
        return (this._map);
    }
}
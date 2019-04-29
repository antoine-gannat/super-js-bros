class Map {
    constructor() {
        this._map_length = MAP_WIDTH * 3;
        this._map_height = MAP_HEIGHT;
        // Generate a new map of height: 'this._map_height' and width: this._map_length
        this._map = new MapGenerator(this._map_length, this._map_height).generate();
        // Offset used to display only the part of the map the player is on
        // When the player move to the right of the map, this variable increase
        this._display_position_offset = 0;

        // Minimum render distance from the left and right of the map
        // The will always see at least half of the map on the right
        // And at least a quarter on the left
        this._right_render_distance = window.innerWidth / 2;
        this._left_render_distance = window.innerWidth / 4;

        // Number of component to display outside of the screen (avoid blanks while moving)
        this._extra_display_components = 1;
    }

    // Get the y value of the highest component in the map at x: 'column'
    getMapHeightAt(column) {
        // Set the height at 0
        var height = 0;
        // While we haven't reach the last row and the components are null
        while (height < this._map[column].length && this._map[column][height] === null) {
            // Increase the height
            height++;
        }
        return (height);
    }

    // Get the block at the position 'position'
    getBlockAtPos(position) {
        if (position.x < 0 || position.y < 0 ||
            position.x >= this._map_length || position.y >= this._map_height)
            return (null);
        return (this._map[position.x][position.y]);
    }

    // Get the left and right distance from the player to the map border
    getPlayerBorderDistance() {
        // Get the player position to the left of the map
        var left_distance = g_game._player._position.x - this._display_position_offset;
        // Get the player position to the right of the map
        var right_distance = window.innerWidth - g_game._player._position.x + this._display_position_offset;
        return ({ left: left_distance, right: right_distance });
    }

    // Change the display offset based on the player's position
    updateDisplayOffset() {
        if (!g_game._player)
            return;
        // Get the player distance from the sides of the screen
        const border_distance = this.getPlayerBorderDistance();
        // Get the position of the player in blocks
        // If the player is close to the left side of the screen, we increase the 'display_position' offset
        if (border_distance.right < this._right_render_distance) {
            this._display_position_offset += this._right_render_distance - border_distance.right;
        }
        // Else if the player is close to the left side of the screen, we decrease the 'display_position' offset
        else if (this._display_position_offset > 0 && border_distance.left < this._left_render_distance) {
            this._display_position_offset -= this._left_render_distance - border_distance.left;
            // To avoid any problems, if the offset goes below 0, we set it to 0
            if (this._display_position_offset < 0)
                this._display_position_offset = 0;
        }
    }

    render() {
        // Update the display offset based on the player's position
        this.updateDisplayOffset();

        // Find the first column to display based on the 'display_position_offset'
        var first_column_to_display = Math.round((this._display_position_offset / BLOCK_WIDTH));

        // If the first column is not 0, we display an extra component
        if (first_column_to_display > 0)
            first_column_to_display -= this._extra_display_components;

        // Last column to display: 
        // - the width of the map
        // - + the first column to display
        // - + two times the extra display components
        var last_column_to_display = MAP_WIDTH + first_column_to_display + (2 * this._extra_display_components);

        // Display the map
        for (var column = first_column_to_display; column < this._map_length
            && column < last_column_to_display; column++) {
            // For each components in column: 'column'
            this._map[column].forEach((component) => {
                // If the component is not null, render it
                if (component !== null)
                    component.render();
            });
        }
    }
}
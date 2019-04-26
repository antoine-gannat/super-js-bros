class Map {
    constructor() {
        this._map_width = MAP_WIDTH * 3;
        this._map = new MapGenerator(this._map_width).generate();
        // Offset used to display only the part of the map the player is on
        // When the player move to the right of the map, this variable increase
        this._display_position_offset = 0;

        // Minimum render distance from the left and right of the map
        this._right_render_distance = window.innerWidth / 2;
        this._left_render_distance = window.innerWidth / 4;

        // Number of blocs display outside of the screen (avoid blanks while loading)
        this._extra_display_block = 1;
    }

    getMapHeightAt(column) {
        var heighest = MAP_HEIGHT;
        var all_block_in_column = this._map.filter((block) => { return (block._position.x === column) });
        all_block_in_column.forEach((block) => {
            if (block._position.y < heighest)
                heighest = block._position.y;
        });
        return (MAP_HEIGHT - heighest);
    }

    // Get the block at the position 'position'
    getBlockAtPos(position) {
        return (this._map.find((block) => { return (block._position.x === position.x && block._position.y === position.y) }));
    }

    // Get the left and right distance from the player to the map border
    getPlayerBorderDistance() {
        // Get the player position to the left of the map
        var left_distance = g_game._player._position.x - this._display_position_offset;
        // Get the player position to the right of the map
        var right_distance = window.innerWidth - g_game._player._position.x + this._display_position_offset;
        return ({ left: left_distance, right: right_distance });
    }

    updateRenderDistance() {
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

    // Render a block
    renderBlock(block) {
        g_game._resManager.render(g_game._resManager.getRessourceByName(block._type),
            new Position(block._position.x * BLOCK_WIDTH - this._display_position_offset, block._position.y * BLOCK_HEIGHT),
            new Size(BLOCK_WIDTH, BLOCK_HEIGHT));
    }

    render() {
        // Update the render distance
        this.updateRenderDistance();
        // Display the map
        var first_block_to_display = Math.round((this._display_position_offset / BLOCK_WIDTH));
        for (var i = first_block_to_display; i < this._map.length
            && this._map[i]._position.x < MAP_WIDTH + first_block_to_display + this._extra_display_block; i++) {
            this.renderBlock(this._map[i]);
        }
    }
}
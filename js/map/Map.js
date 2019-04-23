class Map {
    constructor(game) {
        this._game = game;
        this._map = new MapGenerator(MAP_WIDTH).generate();
        this._display_position_offset = 0;

        this._right_render_distance = 15;
        this._left_render_distance = 5;
    }

    // Get the block at the position 'position'
    getBlockAtPos(position) {
        return (this._map.find((block) => { return (block._position.x === position.x && block._position.y === position.y) }));
    }

    // Get the left and right distance from the player to the map border
    getPlayerBorderDistance() {
        var player_block_pos = new Convertion().screenPosToBlockPos(this._game._player._position);

        // Get the player position to the left of the map
        var left_distance = Math.abs(player_block_pos.x - this._display_position_offset);
        // Get the player position to the right of the map
        var right_distance = MAP_WIDTH - left_distance;
        return ({ left: left_distance, right: right_distance });
    }

    updateRenderDistance() {
        if (!this._game._player)
            return;
        const border_distance = this.getPlayerBorderDistance();
        // Get the position of the player in blocks
        // If the player is close to the right border, we increase the 'display_position' offset
        if (border_distance.right < this._right_render_distance)
            this._display_position_offset++;
        // Else if the player is close to the left border, we decrease the 'display_position' offset
        else if (this._display_position_offset > 0 && border_distance.left < this._left_render_distance)
            this._display_position_offset--;
    }

    // Render a block
    renderBlock(block) {
        this._game._resManager.displayImage(block._type,
            new Position((block._position.x - this._display_position_offset) * BLOCK_WIDTH, block._position.y * BLOCK_HEIGHT),
            new Size(BLOCK_WIDTH, BLOCK_HEIGHT));
    }

    render() {
        // Update the render distance
        this.updateRenderDistance();
        // Display the map
        for (var i = this._display_position_offset; i < this._map.length && this._map[i]._position.x < MAP_WIDTH + this._display_position_offset; i++) {
            this.renderBlock(this._map[i]);
        }
    }
}
class Map {
    constructor(game) {
        this._game = game;
        this._map = new MapGenerator(MAP_WIDTH).generate();
        this._display_position = 0;

        this._front_render_distance = 15;
        this._back_render_distance = 5;
    }

    getBlockAtPos(position) {
        return (this._map.find((block) => { return (block.position.x === position.x && block.position.y === position.y) }));
    }

    renderBlock(block) {
        this._game._resManager.displayImage(block.type,
            new Position((block.position.x - this._display_position) * BLOCK_WIDTH, block.position.y * BLOCK_HEIGHT),
            new Size(BLOCK_WIDTH, BLOCK_HEIGHT));
    }

    updateRenderDistance() {
        if (!this._game._character)
            return;
        // Get the position of the player in blocks
        var character_block_pos = new Convertion().screenPosToBlockPos(this._game._character.position);
        // If the player is close to the right border, we increase the 'display_position' offset
        if (character_block_pos.x + this._front_render_distance - this._display_position >= MAP_WIDTH)
            this._display_position++;
        // Else if the player is close to the left border, we decrease the 'display_position' offset
        else if (this._display_position > 0 && character_block_pos.x - this._back_render_distance < this._display_position)
            this._display_position--;
    }

    render() {
        // Update the render distance
        this.updateRenderDistance();
        // Display the map
        for (var i = this._display_position; i < this._map.length && this._map[i].position.x < MAP_WIDTH + this._display_position; i++) {
            this.renderBlock(this._map[i]);
        }
    }
}
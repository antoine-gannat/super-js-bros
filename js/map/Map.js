class Map {
    constructor(game) {
        this._game = game;
        this._map = new MapGenerator(MAP_WIDTH).generate();

        this._block_types_render_fct = [
            { type: map_block_types.grass, fct: this.renderGrass.bind(this) },
            { type: map_block_types.dirt, fct: this.renderBlock.bind(this) },
        ]
    }

    // Custom display functions for specific blocs type

    renderGrass(block) {
        this._game._resManager.displayImage(block.type,
            new Position(block.position.x * BLOCK_WIDTH, block.position.y * BLOCK_HEIGHT),
            new Size(BLOCK_WIDTH, BLOCK_HEIGHT));
        // Display blocs of dirt below the grass until the last row
        for (var y = block.position.y + 1; y <= MAP_HEIGHT - 1; y++) {
            this.renderBlock(new MapBlock(map_block_types.dirt, new Position(block.position.x, y)));
        }
    }

    renderBlock(block) {
        this._game._resManager.displayImage(block.type,
            new Position(block.position.x * BLOCK_WIDTH, block.position.y * BLOCK_HEIGHT),
            new Size(BLOCK_WIDTH, BLOCK_HEIGHT));
    }

    render() {
        for (var i = 0; i < this._map.length; i++) {
            // Search for the display function for this type of block
            var block_render = this._block_types_render_fct.find((block_type) => {
                return (block_type.type === this._map[i].type);
            });
            // If none was found, we use the default display function
            if (!block_render) {
                this.renderBlock(this._map[i]);
                continue;
            }
            // Call the render function
            block_render.fct(this._map[i]);
        }
    }
}
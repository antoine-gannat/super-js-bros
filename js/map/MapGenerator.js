class MapBlock {
    constructor(type, position) {
        this._type = type;
        this._position = position;
    }
}

class MapGenerator {
    constructor(map_size) {
        if (!map_size || map_size < 10)
            throw new Error("Map size must be at least 10");
        this._map_size = map_size;
        this._map = [];
        // Size of the starting platform
        this._starting_platform_size = 5;

        this._block_generation_fct = [
            { type: MAP_BLOC_TYPES.grass, fct: this.generateGrass.bind(this) }
        ];
    }

    generateStartingPlatform() {
        // Generate 5 blocs of grass
        for (var i = 0; i < this._starting_platform_size; i++)
            this._map.push(new MapBlock(MAP_BLOC_TYPES.grass, new Position(i, MAP_HEIGHT - 1)));
    }

    getNextBlockHeight(previous_block) {
        // 50% of chance to stay at the same height
        if (Math.round(Math.random()))
            return (previous_block._position.y);
        // If last block was on the last line, we go up
        if (previous_block._position.y === MAP_HEIGHT - 1
            || Math.round(Math.random())) {
            return (previous_block._position.y - 1);
        }
        return (previous_block._position.y + 1);
    }

    getNextBlockType(previous_block) {
        return (MAP_BLOC_TYPES.grass);
    }

    generateGrass(new_block) {
        this.generateDefaultBlock(new_block);
        // Add blocs of dirt below the grass until the last row
        for (var y = new_block._position.y + 1; y <= MAP_HEIGHT - 1; y++) {
            // Add the block
            this._map.push(new MapBlock(MAP_BLOC_TYPES.dirt, new Position(new_block._position.x, y)));
        }
    }
    generateDefaultBlock(new_block) {
        // Add the block
        this._map.push(new_block);
    }

    generate() {
        // Generate a flat platform at the begining of each map
        this.generateStartingPlatform();
        // Get the previous block
        var previous_block = this._map[this._map.length - 1];

        for (var col_nb = this._starting_platform_size; col_nb < this._map_size; col_nb++) {
            // Get the type of the new block
            var block_type = this.getNextBlockType(previous_block);
            // Get the height of the new block
            var new_block_pos = new Position(col_nb, this.getNextBlockHeight(previous_block));
            // Create the block
            var new_block = new MapBlock(block_type, new_block_pos);

            // Save this block for the next loop
            var previous_block = new_block;

            // Search if a special function needs to be called to generate this type of block
            var generation_fct = this._block_generation_fct.find((block) => { return (block.type === block_type) });

            // If so, call the function
            if (generation_fct) {
                generation_fct.fct(new_block);
            }
            // Otherwise, use the default generation
            else
                this.generateDefaultBlock(new_block);
        }
        return (this._map);
    }
}
// type of blocks
const map_block_types = {
    grass: "grass",
    dirt: "dirt"
};

class MapBlock {
    constructor(type, position) {
        this._type = type;
        this._position = position;
    }

    get type() {
        return (this._type);
    }

    get position() {
        return (this._position);
    }

    set type(newType) {
        this._type = newType;
    }

    set position(newPosition) {
        this._position = newPosition;
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
            { type: map_block_types.grass, fct: this.generateGrass.bind(this) }
        ]
    }

    generateStartingPlatform() {
        // Generate 5 blocs of grass
        for (var i = 0; i < this._starting_platform_size; i++)
            this._map.push(new MapBlock(map_block_types.grass, new Position(i, MAP_HEIGHT - 1)));
    }

    getNextBlockHeight(previous_block) {
        // 50% of chance to stay at the same height
        if (Math.round(Math.random()))
            return (previous_block.position.y);
        // If last block was on the last line, we go up
        if (previous_block.position.y === MAP_HEIGHT - 1
            || Math.round(Math.random())) {
            return (previous_block.position.y - 1);
        }
        return (previous_block.position.y + 1);
    }

    getNextBlockType(previous_block) {
        return (map_block_types.grass);
    }

    generateGrass(new_block) {
        this.generateDefaultBlock(new_block);
        // Add blocs of dirt below the grass until the last row
        for (var y = new_block.position.y + 1; y <= MAP_HEIGHT - 1; y++) {
            // Add the block
            this._map.push(new MapBlock(map_block_types.dirt, new Position(new_block.position.x, y)));
        }
    }
    generateDefaultBlock(new_block) {
        // Add the block
        this._map.push(new_block);
    }

    generate() {
        // Generate a flat platform at the begining of each map
        this.generateStartingPlatform();

        for (var col_nb = this._starting_platform_size; col_nb < this._map_size; col_nb++) {
            // Get the previous block
            var previous_block = this._map[this._map.length - 1];
            // Get the type of the new block
            var block_type = this.getNextBlockType(previous_block);
            // Get the height of the new block
            var new_block_pos = new Position(col_nb, this.getNextBlockHeight(previous_block));
            var new_block = new MapBlock(block_type, new_block_pos);
            var generation_fct = this._block_generation_fct.find((block) => { return (block.type === block_type) });
            if (generation_fct) {
                generation_fct.fct(new_block);
            }
            else
                this.generateDefaultBlock(new_block);
        }
        return (this._map);
    }
}
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
    }

    generateStartingPlatform() {
        // Generate 5 blocs of grass
        for (var i = 0; i < 5; i++)
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

    generate() {
        // Generate a flat platform at the begining of each map
        this.generateStartingPlatform();

        while (this._map.length < this._map_size) {
            var previous_block = this._map[this._map.length - 1];
            var block_type = this.getNextBlockType(previous_block);
            var next_block_height = this.getNextBlockHeight(previous_block);
            this._map.push(new MapBlock(block_type, new Position(this._map.length, next_block_height)));
        }
        return (this._map);
    }
}
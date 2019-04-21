class Map {
    constructor(game) {
        this._game = game;
        this._map = new MapGenerator(MAP_WIDTH).generate();
    }

    getBlockAtPos(position) {
        return (this._map.find((block) => { return (block.position.x === position.x && block.position.y === position.y) }));
    }

    renderBlock(block) {
        this._game._resManager.displayImage(block.type,
            new Position(block.position.x * BLOCK_WIDTH, block.position.y * BLOCK_HEIGHT),
            new Size(BLOCK_WIDTH, BLOCK_HEIGHT));
    }

    render() {
        for (var i = 0; i < this._map.length; i++) {
            this.renderBlock(this._map[i]);
        }
    }
}
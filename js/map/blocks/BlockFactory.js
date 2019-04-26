class BlockFactory {
    constructor() {
        this._blocks = [
            { type: MAP_BLOC_TYPES.grass, class: Grass },
            { type: MAP_BLOC_TYPES.dirt, class: Dirt }
        ];
    }

    newBlock(type, position) {
        // Find the block type
        var block = this._blocks.find((b) => { return (b.type === type) });
        if (!block) {
            throw new Error("Block: " + type + " not found");
        }
        // Return the new block element
        return (new block.class(position));
    }
}
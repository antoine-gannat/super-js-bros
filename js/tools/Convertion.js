class Convertion {
    static blockPosToScreenPos(position) {
        return (new Position(position.x * BLOCK_WIDTH, position.y * BLOCK_HEIGHT));
    }

    static screenPosToBlockPos(position) {
        return (new Position(Math.floor(position.x / BLOCK_WIDTH), Math.floor(position.y / BLOCK_HEIGHT)));
    }

    // Get 4 edges from a position and a size:
    // Top left
    // Top right
    // Bottom left
    // Bottom right
    static getEdgePositions(position, size) {
        return ({
            top_left: new Position(Number(position.x), Number(position.y)),
            top_right: new Position(Number(position.x + size.width), Number(position.y)),
            bottom_left: new Position(Number(position.x), Number(position.y + size.height)),
            bottom_right: new Position(Number(position.x + size.width), Number(position.y + size.height)),
        })
    }
};
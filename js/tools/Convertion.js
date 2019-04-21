class Convertion {
    blockPosToScreenPos(position) {
        return (new Position(position.x * BLOCK_WIDTH, position.y * BLOCK_HEIGHT));
    }

    screenPosToBlockPos(position) {
        return (new Position(Math.floor(position.x / BLOCK_WIDTH), Math.floor(position.y / BLOCK_HEIGHT)));
    }
};
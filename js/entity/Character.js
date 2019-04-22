class Character extends Entity {
    constructor(game) {
        super(game, new Position(0, 0), new Size(50, 100), new Position(BLOCK_WIDTH / 20, BLOCK_WIDTH / 10));
        this._game = game;
    }

    render() {
        super.render();
        this._game._resManager.displayImage("pablo", new Position(this.position.x - this._game._map._display_position * BLOCK_WIDTH, this.position.y), this._size);
    }
}
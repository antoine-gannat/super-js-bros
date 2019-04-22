class Character extends Entity {
    constructor(game) {
        super(game, new Position(0, 0), new Size(50, 100), new Position(BLOCK_WIDTH / 10, BLOCK_WIDTH / 10));
        this._game = game;
    }

    render() {
        super.render();
        this._game._resManager.displayImage("pablo", this._position, this._size);
    }
}
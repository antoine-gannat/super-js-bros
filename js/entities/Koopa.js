class Koopa extends Entity {
    constructor(game) {
        super(game, new Position(BLOCK_WIDTH * 10, 0),
            new Size(40, 85),
            new Speed(BLOCK_WIDTH / 50, BLOCK_WIDTH / 10), "koopa");
        this._step_to_do = 0;
        this._direction = DIRECTIONS.left;
    }

    doAction() {
        if (this._step_to_do <= 0) {
            this._direction = (Math.round(Math.random()) ? DIRECTIONS.left : DIRECTIONS.right);
            this._step_to_do = 20;
        }
        this._step_to_do--;
        if (this._direction === DIRECTIONS.right)
            this.moveX(this._speed.horizontal);
        else
            this.moveX(-this._speed.horizontal);
    }

    render() {
        this.doAction();
        super.render();
    }
}
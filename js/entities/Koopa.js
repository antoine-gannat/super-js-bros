class Koopa extends Enemy {
    constructor(game, position) {
        super(game, position,
            new Size(40, 85),
            new Speed(BLOCK_WIDTH / 50, BLOCK_WIDTH / 10),
            game._resManager.getRessourceByName("koopa").clone(),
            DIRECTIONS.left);
        this._step_to_do = 0;
        this._direction = DIRECTIONS.left;
    }

    doAction() {
        if (this._step_to_do <= 0) {
            this._direction = (Math.round(Math.random()) ? DIRECTIONS.left : DIRECTIONS.right);
            var max_distance = 200;
            var min_distance = 50;
            this._step_to_do = Math.floor(Math.random() * (max_distance - min_distance)) + min_distance;
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
class Koopa extends Enemy {
    constructor(position) {
        super(position,
            new Size(40, 85),
            new Speed(BLOCK_WIDTH / 50, BLOCK_WIDTH / 10),
            g_game._resManager.getRessourceByName("koopa").clone(),
            DIRECTIONS.west);
        this._step_to_do = 0;
        this._direction = DIRECTIONS.west;
    }

    doAction() {
        if (this._step_to_do <= 0) {
            this._direction = (Math.round(Math.random()) ? DIRECTIONS.west : DIRECTIONS.east);
            var max_distance = 200;
            var min_distance = 50;
            this._step_to_do = Math.floor(Math.random() * (max_distance - min_distance)) + min_distance;
        }
        this._step_to_do--;
        if (this._direction === DIRECTIONS.east)
            this.moveX(this._speed.horizontal);
        else
            this.moveX(-this._speed.horizontal);
    }

    render() {
        this.doAction();
        super.render();
    }
}
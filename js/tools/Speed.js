class Speed {
    constructor(horizontal_speed = 0, vertical_speed = 0) {
        this._vertical_speed = vertical_speed;
        this._horizontal_speed = horizontal_speed;
    }

    get horizontal() {
        return (this._horizontal_speed);
    }

    get vertical() {
        return (this._vertical_speed);
    }
}
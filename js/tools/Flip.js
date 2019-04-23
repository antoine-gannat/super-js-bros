class Flip {
    constructor(horizontal = false, vertical = false) {
        this._vertical = vertical;
        this._horizontal = horizontal;
    }

    get horizontal() {
        return (this._horizontal);
    }


    get vertical() {
        return (this._vertical);
    }
}
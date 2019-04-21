class Character {
    constructor(game) {
        this._game = game;
        this._position = new Position(0, 0);
        this._direction = "right";
    }

    set position(newPosition) {
        this._position = newPosition;
    }

    get position() {
        return (this._position);
    }

    moveX(xMovement) {
        if (this._position.x + xMovement < 0)
            return;
        if (xMovement < 0)
            this._direction = "left";
        else
            this._direction = "right";
        this._position.x += xMovement;
    }

    moveY(yMovement) {
        if (this._position.y + yMovement < 0)
            return;
        this._position.y += yMovement;
    }

    render() {
        this._game._resManager.displayImage("pablo", this._position, new Size(50, 100));
    }
}
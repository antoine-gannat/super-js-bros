class EventManager {
    constructor(game) {
        this._game = game;
        this._canvas = game._canvas;

        this._canvas.addEventListener("click", this.onClick.bind(this));
        window.addEventListener("keydown", this.onKeydown.bind(this));

        this._key_map = [
            { key: "ArrowRight", callback: this.moveCharacterRight.bind(this) },
            { key: "ArrowLeft", callback: this.moveCharacterLeft.bind(this) },
            { key: "ArrowDown", callback: this.moveCharacterDown.bind(this) },
            { key: "ArrowUp", callback: this.moveCharacterUp.bind(this) },
        ];
    }

    // Events

    onKeydown(e) {
        var key_action = this._key_map.find((key) => { return (key.key === e.key) });
        if (!key_action)
            return;
        key_action.callback(e);
    }

    onClick(e) {
    }

    // Event callbacks

    moveCharacterRight() {
        this._game._character.moveX(1);
    }

    moveCharacterLeft() {
        this._game._character.moveX(-1);
    }

    moveCharacterUp() {
        this._game._character.moveY(-1);
    }

    moveCharacterDown() {
        this._game._character.moveY(1);
    }
}
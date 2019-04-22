class EventManager {
    constructor(game) {
        this._game = game;
        this._canvas = game._canvas;
        this._keys_pressed = [];

        this._canvas.addEventListener("click", this.onClick.bind(this));

        // Set key pressed events
        window.onkeydown = this.onKeyDown.bind(this);
        window.onkeyup = this.onKeyUp.bind(this);
        this._key_map = [
            { key: "ArrowRight", callback: this.moveCharacterRight.bind(this) },
            { key: "ArrowLeft", callback: this.moveCharacterLeft.bind(this) },
            { key: " ", callback: this.jump.bind(this) },
        ];
    }

    // Events

    onKeyDown(e) {
        // Search if the key is already is the array
        var key_index = this._keys_pressed.findIndex((key) => { return (key === e.key) });
        // If so, leave
        if (key_index >= 0)
            return;
        // Otherwise, add it
        this._keys_pressed.push(e.key);
    }

    onKeyUp(e) {
        // Search for the key's index
        var key_index = this._keys_pressed.findIndex((key) => { return (key === e.key) });
        // If it was not found, return
        if (key_index === -1)
            return;
        // Otherwise, delete the key from the array
        this._keys_pressed.splice(key_index, 1);
    }

    onClick(e) {
    }

    // Event callbacks

    moveCharacterRight() {
        this._game._character.moveX(this._game._character._speed.x);
    }

    moveCharacterLeft() {
        this._game._character.moveX(-this._game._character._speed.x);
    }

    jump() {
        // jump 3 blocs
        this._game._character.jump();
    }

    executeEvents() {
        this._keys_pressed.forEach((key_pressed) => {
            var key_action = this._key_map.find((key) => { return (key.key === key_pressed) });
            if (!key_action)
                return;
            key_action.callback();
        });
    }
}
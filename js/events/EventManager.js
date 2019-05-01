class EventManager {
    constructor() {
        this._canvas = g_game._canvas;
        this._keys_pressed = [];

        this._canvas.addEventListener("click", this.onClick.bind(this));

        // Set key pressed events
        window.onkeydown = this.onKeyDown.bind(this);
        window.onkeyup = this.onKeyUp.bind(this);
        this._key_map = [
            { key: "ArrowRight", callback: this.movePlayerRight.bind(this) },
            { key: "ArrowLeft", callback: this.movePlayerLeft.bind(this) },
            { key: " ", callback: this.jump.bind(this) },
        ];
    }

    // Events

    onKeyDown(e) {
        // Restart the soundtrack
        if (!g_game._music_started && g_game._player && g_game._player._alive)
            g_game.startSoundtrack();
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

    movePlayerRight() {
        if (g_game._player)
            g_game._player.moveX(g_game._player._speed.horizontal);
    }

    movePlayerLeft() {
        if (g_game._player)
            g_game._player.moveX(-g_game._player._speed.horizontal);
    }

    jump() {
        // jump 3 blocs
        if (g_game._player)
            g_game._player.jump();
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
class UiMute extends Ui {
    constructor() {
        super("mute", new Position(10, 0), new Size(30, 30));
        this._icon_muted = g_game._resManager.getRessourceByName("mute-icon");
        this._icon_sound = g_game._resManager.getRessourceByName("sound-icon");
        // If true, no sound will be played
        this._sounds_muted = false;
    }

    onClick(e) {
        this.switchMuteSounds();
    }

    // Turn on or off the sound
    switchMuteSounds() {
        // If the sound is already muted, we unmute
        if (this._sounds_muted)
            this._sounds_muted = false;
        // Otherwise we mute the sound
        else {
            this._sounds_muted = true;
            g_game._resManager.stopAllSounds();
        }
    }


    render() {
        // Display the sound icon (muted or not)
        if (this._sounds_muted)
            g_game._resManager.render(this._icon_muted, this._position, this._size);
        else
            g_game._resManager.render(this._icon_sound, this._position, this._size);
    }
}
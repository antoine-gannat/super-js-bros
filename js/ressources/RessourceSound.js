class RessourceSound extends Ressource {
    constructor(name, path) {
        super(name, RESSOURCE_TYPES.sound);
        this._audio = new Audio(path);
    }

    play(volume) {
        this._audio.currentTime = 0;
        this._audio.play();
        this._audio.volume = volume;
    }

    playLoop(volume) {
        this._audio.volume = volume;
        this._audio.currentTime = 0;
        this._audio.addEventListener('ended', function () {
            this.currentTime = 0;
            this.play();
        }, false);
        this._audio.play();
    }

    stop() {
        this._audio.pause();
    }
}
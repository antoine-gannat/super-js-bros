class RessourceSound extends Ressource {
    constructor(name, path) {
        super(name, RESSOURCE_TYPES.sound);
        this._audio = new Audio(path);
    }

    play() {
        this._audio.currentTime = 0;
        this._audio.play();
    }

    playLoop() {
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
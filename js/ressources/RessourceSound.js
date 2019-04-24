class RessourceSound extends Ressource {
    constructor(name, path) {
        super(name, RESSOURCE_TYPES.sound);
        this._audio = new Audio(path);
    }

    play() {
        this._audio.currentTime = 0;
        this._audio.play();
    }
}
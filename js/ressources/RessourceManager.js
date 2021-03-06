class RessourceManager {
    constructor() {
        // Save the canvas
        this._canvas = g_game._canvas;
        // Get the canvas's context
        this._ctx = this._canvas.getContext("2d");
        // Array of loaded ressources
        this._ressources = [];

        // Load images
        // Set the path to the ressource folders
        const images_folder_path = "ressources/images/";
        const sounds_folder_path = "ressources/sounds/";

        // Load images
        this._ressources.push(new RessourceImage("grass", images_folder_path + "grass.jpg"));
        this._ressources.push(new RessourceImage("dirt", images_folder_path + "dirt.jpg"));
        this._ressources.push(new RessourceImage("castle", images_folder_path + "castle.png"));
        this._ressources.push(new RessourceImage("chest", images_folder_path + "chest.png"));
        this._ressources.push(new RessourceImage("mute-icon", images_folder_path + "mute.png"));
        this._ressources.push(new RessourceImage("sound-icon", images_folder_path + "sound.png"));
        this._ressources.push(new RessourceImage("mario-head", images_folder_path + "mario_head.png"));

        // Pre Load sprites
        this._ressources.push(new RessourceSprite("koopa", images_folder_path + "koopa.png", 27, 32, 9, 20));
        this._ressources.push(new RessourceSprite("mario", images_folder_path + "mario.png", 62, 95, 4, 20));
        this._ressources.push(new RessourceSprite("coin", images_folder_path + "coins.png", 73, 73, 10, 20));
        this._ressources.push(new RessourceSprite("explosion", images_folder_path + "explosion_sprite.png", 38, 37, 28, 5));

        // Load sounds
        this._ressources.push(new RessourceSound("mario_jump", sounds_folder_path + "mario_jump.ogg"));
        this._ressources.push(new RessourceSound("death", sounds_folder_path + "death.ogg"));
        this._ressources.push(new RessourceSound("kill", sounds_folder_path + "kill.ogg"));
        this._ressources.push(new RessourceSound("soundtrack", sounds_folder_path + "soundtrack.ogg"));
        this._ressources.push(new RessourceSound("coin_catched", sounds_folder_path + "coin.ogg"));

        // Render functions
        this._render_fct = [
            { type: RESSOURCE_TYPES.image, fct: this.renderImage.bind(this) },
            { type: RESSOURCE_TYPES.sprite, fct: this.renderSprite.bind(this) },
        ];

        this._static_ressources = [];
    }

    getRessourceByName(name) {
        return (this._ressources.find((res) => { return (res.name === name) }));
    }

    // Render //

    // Display an image
    renderImage(image, position, size, flip) {
        return image.renderAt(this._ctx, position, size, flip);
    }

    // Display a sprite
    renderSprite(sprite, position, size, flip) {
        return sprite.renderAt(this._ctx, position, size, flip);
    }

    // /Render //

    // Sounds //

    // Play a specific sound, if 'loop' is true, the sound will be re-played once finished
    playSound(name, volume = 1.0, loop = false) {
        // If the sound is turned off, we leave
        if (g_game._uiManager.getUiByName("mute")._sounds_muted)
            return;

        // Get the sound to play
        var sound = this.getRessourceByName(name);

        // If the sound is not found
        if (!sound)
            throw new Error("Sound: " + name + " not found");
        // Play the sound in loop
        if (loop === true)
            sound.playLoop(volume);
        else
            sound.play(volume);
    }

    //  Stop all sounds currently played
    stopAllSounds() {
        var sounds = this._ressources.filter((r) => { return (r._type === RESSOURCE_TYPES.sound) });
        sounds.forEach((s) => { s._audio.pause(); });
    }

    // Stop a specific sound
    stopSound(name) {
        var sound = this.getRessourceByName(name);

        if (!sound)
            throw new Error("Sound: " + name + " not found");
        sound.stop();
    }

    // /Sounds //

    // Render ressources not attached to any component or entity
    renderStaticRessources() {
        // For each static ressource
        this._static_ressources.map((ressource, index) => {
            // Get the position based on the map offset
            var position = new Position(ressource.position.x - g_game._map._display_position_offset, ressource.position.y);

            // Render the ressource
            // If the return value is false, remove the ressource from the list
            if (this.render(ressource.asset, position, ressource.size) === false) {
                this._static_ressources.splice(index, 1);
            }
        });
    }

    render(ressource, position, size, flip) {
        // Search for the ressource's render function
        var render_function = this._render_fct.find((render) => { return (render.type === ressource.type) });
        // If the render function does not exist, throw an error
        if (!render_function) {
            throw new Error("No render function found for " + ressource.type);
        }

        // Call the render function for this specific ressource
        return render_function.fct(ressource, position, size, flip);
    }
}
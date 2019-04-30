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

        // Pre Load sprites
        this._ressources.push(new RessourceSprite("koopa", images_folder_path + "koopa.png", 27, 32, 9, 20));
        this._ressources.push(new RessourceSprite("mario", images_folder_path + "mario.png", 62, 95, 4, 20));

        // Load sounds
        this._ressources.push(new RessourceSound("mario_jump", sounds_folder_path + "mario_jump.ogg"));
        this._ressources.push(new RessourceSound("death", sounds_folder_path + "death.ogg"));
        this._ressources.push(new RessourceSound("kill", sounds_folder_path + "kill.ogg"));
        this._ressources.push(new RessourceSound("soundtrack", sounds_folder_path + "soundtrack.ogg"));

        // Render functions
        this._render_fct = [
            { type: RESSOURCE_TYPES.image, fct: this.renderImage.bind(this) },
            { type: RESSOURCE_TYPES.sprite, fct: this.renderSprite.bind(this) },
        ];
    }

    getRessourceByName(name) {
        return (this._ressources.find((res) => { return (res.name === name) }));
    }

    // Render //

    // Display an image
    renderImage(image, position, size, flip) {
        image.renderAt(this._ctx, position, size, flip);
    }

    // Display a sprite
    renderSprite(sprite, position, size, flip) {
        sprite.renderAt(this._ctx, position, size, flip);
    }

    // /Render //

    // Sounds //

    // Play a specific sound, if 'loop' is true, the sound will be re-played once finished
    playSound(name, loop = false) {
        // If the sound is turned off, we leave
        if (g_game._sounds_muted)
            return;

        // Get the sound to play
        var sound = this.getRessourceByName(name);

        // If the sound is not found
        if (!sound)
            throw new Error("Sound: " + name + " not found");
        // Play the sound in loop
        if (loop === true)
            sound.playLoop();
        else
            sound.play();
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

    render(ressource, position, size, flip) {
        // Search for the ressource's render function
        var render_function = this._render_fct.find((render) => { return (render.type === ressource.type) });
        if (!render_function)
            throw new Error("No render function found for " + ressource.type);

        // Call the render function for this specific ressource
        render_function.fct(ressource, position, size, flip);
    }
}
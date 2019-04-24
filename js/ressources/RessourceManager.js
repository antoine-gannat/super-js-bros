class RessourceManager {
    constructor(game) {
        this._game = game;
        this._canvas = game._canvas;
        this._ctx = this._canvas.getContext("2d");
        this._ressources = [];

        // Load images
        // Set the path to the images folder
        const images_folder_path = "ressources/images/";
        const sounds_folder_path = "ressources/sounds/";

        // Load images
        this._ressources.push(new RessourceImage("grass", images_folder_path + "grass.jpg"));
        this._ressources.push(new RessourceImage("dirt", images_folder_path + "dirt.jpg"));

        // Pre Load sprites
        this._ressources.push(new RessourceSprite("koopa", images_folder_path + "sprite_koopa.png", 27, 32, 9, 20));
        this._ressources.push(new RessourceSprite("pablo", images_folder_path + "pablo.png", 62, 95, 4, 20));

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

    // Display an image
    renderImage(image, position, size, flip) {
        image.renderAt(this._ctx, position, size, flip);
    }

    renderSprite(sprite, position, size, flip) {
        sprite.renderAt(this._ctx, position, size, flip);
    }

    playSound(name, loop = false) {
        var sound = this.getRessourceByName(name);

        if (!sound)
            throw new Error("Sound: " + name + " not found");
        if (loop === true)
            sound.playLoop();
        else
            sound.play();
    }

    stopSound(name) {
        var sound = this.getRessourceByName(name);

        if (!sound)
            throw new Error("Sound: " + name + " not found");
        sound.stop();
    }

    render(ressource, position, size, flip) {
        // Search for the ressource's render function
        var render_function = this._render_fct.find((render) => { return (render.type === ressource.type) });
        if (!render_function)
            throw new Error("No render function found for " + ressource.type);

        // Call the render function
        render_function.fct(ressource, position, size, flip);
    }
}
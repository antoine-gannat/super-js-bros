class RessourceManager {
    constructor(game) {
        this._game = game;
        this._canvas = game._canvas;
        this._ressources = [];

        // Load images
        // Set the path to the images folder
        const images_folder_path = "ressources/images/";

        this.loadImage(images_folder_path + "grass.jpg", "grass");
        this.loadImage(images_folder_path + "pablo.png", "pablo");
    }

    // Load a new image
    loadImage(path, name) {
        this._ressources.push(new RessourceImage(name, path));
    }

    // Display an image
    displayImage(name, position, size) {
        // Search for the image named 'name'
        var image = this._ressources.find((res) => { return (res.name === name) });

        if (!image)
            throw new Error("Image " + name + " not found");
        image.renderAt(position, size, this._canvas);
    }
}
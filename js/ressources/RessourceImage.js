
class RessourceImage extends Ressource {
    constructor(name, path) {
        super(name, "Image");
        this._image = new Image();
        this._image.src = path;
    }

    renderAt(position, size, canvas) {
        // Get the context
        var ctx = canvas.getContext("2d");
        // Draw the image
        ctx.drawImage(this._image, position.x, position.y, size.width, size.height);
    }
}
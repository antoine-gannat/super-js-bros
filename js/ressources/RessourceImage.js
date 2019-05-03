
class RessourceImage extends Ressource {
    constructor(name, path) {
        super(name, RESSOURCE_TYPES.image);
        this._image = new Image();
        this._image.src = path;
    }

    clone() {
        return (new RessourceImage(this._name, this._image.src));
    }

    renderAt(ctx, position, size, flip = new Flip()) {
        // Save the current state
        ctx.save();
        // Set scale to flip the image
        ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
        // Draw the image
        ctx.drawImage(this._image,
            (flip.horizontal ? (size.width * -1) - position.x : position.x),
            (flip.vertical ? (size.height * -1) - position.y : position.y),
            size.width,
            size.height);
        // Restore the last saved state
        ctx.restore();
    }
}
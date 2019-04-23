
class RessourceImage extends Ressource {
    constructor(name, path) {
        super(name, RESSOURCE_TYPES.image);
        this._image = new Image();
        this._image.src = path;
    }

    renderAt(ctx, position, size, flip = new Flip()) {
        var scaleH = flip.horizontal ? -1 : 1, // Set horizontal scale to -1 if flip horizontal
            scaleV = flip.vertical ? -1 : 1, // Set verical scale to -1 if flip vertical
            posX = flip.horizontal ? size.width * -1 : 0, // Set x position to -100% if flip horizontal 
            posY = flip.vertical ? size.height * -1 : 0; // Set y position to -100% if flip vertical

        ctx.save(); // Save the current state
        ctx.scale(scaleH, scaleV); // Set scale to flip the image
        ctx.drawImage(this._image,
            posX + (flip.horizontal ? -position.x : position.x),
            position.y + posY,
            size.width,
            size.height); // draw the image
        ctx.restore(); // Restore the last saved state

    }
}
class RessourceSprite extends Ressource {
    constructor(name, path, frame_width, frame_height, frame_number, frame_interval) {
        super(name, RESSOURCE_TYPES.sprite);

        // Change sprite frame every '_interval' render
        this._frame_interval = frame_interval;
        this._render_remaining = this._frame_interval;
        this._frame_index = 0;
        this._frame_width = frame_width;
        this._frame_height = frame_height;
        this._frame_number = frame_number;

        this._image = new Image();
        this._image.src = path;
    }

    renderAt(ctx, position, size, flip) {
        this._render_remaining--;
        // Change to next sprite frame
        if (this._render_remaining <= 0) {
            this._render_remaining = this._frame_interval;
            this._frame_index++;
        }
        if (this._frame_index >= this._frame_number)
            this._frame_index = 0;

        // Display the frame of the sprite
        ctx.drawImage(
            this._image,
            this._frame_index * this._frame_width,
            0,
            this._frame_width,
            this._frame_height,
            position.x,
            position.y,
            size.width,
            size.height);
    }
}
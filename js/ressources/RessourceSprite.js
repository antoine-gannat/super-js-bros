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

        // Entity attached to this sprite
        this._attached_entity = null;
    }

    clone() {
        return (new RessourceSprite(this._name, this._image.src,
            this._frame_width, this._frame_height,
            this._frame_number, this._frame_interval));
    }

    attachEntity(entity) {
        this._attached_entity = entity;
    }

    renderStatic() {

    }

    updateFrameIndex() {
        // If an entity is attached and is not moving
        // We keep the frame index to 0, in order to display the first frame only
        if (this._attached_entity && !this._attached_entity._has_moved) {
            this._frame_index = 0;
            return;
        }
        // Decrease the number of render remaining for this frame
        this._render_remaining--;
        // If the number of render set for this frame has been done
        // We change to the next frame
        if (this._render_remaining <= 0) {
            this._render_remaining = this._frame_interval;
            this._frame_index++;
        }
        // if we have displayed every frame of the sprite
        // Set the frame index to 0
        if (this._frame_index >= this._frame_number)
            this._frame_index = 0;
        // If the entity has moved and the sprite has been rendered
        // We set the 'has_moved' variable on the entity to false
        if (this._attached_entity && this._attached_entity._has_moved
            && this._frame_index == 0) {
            this._attached_entity._has_moved = false;
        }
    }

    renderAt(ctx, position, size, flip = new Flip()) {
        // Change to next sprite frame
        this.updateFrameIndex();

        // Save the current state
        ctx.save();
        // Set scale to flip the image
        ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
        // Display the frame of the sprite
        ctx.drawImage(
            this._image,
            this._frame_index * this._frame_width,
            0,
            this._frame_width,
            this._frame_height,
            (flip.horizontal ? (size.width * -1) - position.x : position.x),
            (flip.vertical ? (size.height * -1) - position.y : position.y),
            size.width,
            size.height);
        // Restore the last saved state
        ctx.restore();
    }
}
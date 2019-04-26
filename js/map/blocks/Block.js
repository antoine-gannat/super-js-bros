class Block {
    constructor(type, position, asset) {
        this._position = position;
        this._type = type;
        this._asset = asset;
    }

    onEntityHit(entity) {

    }

    render() {
        throw new Error("Block: Render not implemented");
    }
}
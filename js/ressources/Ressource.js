class Ressource {
    constructor(name, type) {
        this._type = type;
        this._name = name;
    }

    get type() {
        return (this._type);
    }

    set type(newType) {
        this._type = newType;
    }

    get name() {
        return (this._name);
    }

    set name(newName) {
        this._name = newName;
    }
}
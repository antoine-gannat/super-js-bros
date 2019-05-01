class ComponentsFactory {
    constructor() {
        // An array with every map component
        this._components = [
            { type: MAP_COMPONENT_TYPES.grass, class: Grass },
            { type: MAP_COMPONENT_TYPES.castle, class: Castle },
            { type: MAP_COMPONENT_TYPES.chest, class: Chest },
            { type: MAP_COMPONENT_TYPES.coin, class: Coin },
            { type: MAP_COMPONENT_TYPES.dirt, class: Dirt }
        ];
    }

    // Return a new component
    newComponent(type, position) {
        // Find the component type
        var component = this._components.find((b) => { return (b.type === type) });
        if (!component) {
            throw new Error("Component: " + type + " not found");
        }
        // Return the new component element
        return (new component.class(position));
    }
}
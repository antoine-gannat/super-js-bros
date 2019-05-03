class UiManager {
    constructor() {
        this._uis = [];

        // Add uis
        this._uis.push(new UiMute());
        this._uis.push(new UiPlayerStatus());
    }

    checkClickEvent(e) {
        var click = new Position(e.clientX, e.clientY);

        this._uis.forEach((ui) => {
            if (click.x >= ui._position.x && click.x <= ui._position.x + ui._size.width
                && click.y >= ui._position.y && click.y <= ui._position.y + ui._size.height) {
                ui.onClick(e)
            }
        });
    }

    getUiByName(name) {
        return (this._uis.find((ui) => { return (ui._name === name) }));
    }

    render() {
        // for each Ui
        this._uis.forEach((ui) => {
            // Render the ui
            ui.render();
        })
    }
}
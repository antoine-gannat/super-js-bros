class UiPlayerStatus extends Ui {
    constructor() {
        super("player-status", new Position(10, 50), new Size(100, 60));

        // Coins
        this._coin_sprite = g_game._resManager.getRessourceByName("coin").clone();
        this._coin_position = new Position(10, 50);
        this._coin_size = new Size(30, 30);

        // Lives
        this._mario_head = g_game._resManager.getRessourceByName("mario-head");
        this._lives_position = new Position(10, 100);
        this._lives_size = new Size(30, 30);

        // Paddings

        this._text_margin = 23;
    }

    displayCoins() {
        g_game._resManager.render(this._coin_sprite, this._coin_position, this._coin_size);
        this._ctx.font = "20px Arial";
        this._ctx.fillText(g_game._player._coins, 50, this._coin_position.y + this._text_margin);
    }

    displayLives() {
        g_game._resManager.render(this._mario_head, this._lives_position, this._lives_size);
        this._ctx.font = "20px Arial";
        this._ctx.fillText("x" + g_game._player._lives, 50, this._lives_position.y + this._text_margin);
    }

    render() {
        this.displayCoins();
        this.displayLives();
    }
}
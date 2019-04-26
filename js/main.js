// Create an instance of Game
var g_game = new Game();

g_game.init();
// Render at 60 frames per seconds
setInterval(() => { g_game.renderFrame() }, 60 / 1000);

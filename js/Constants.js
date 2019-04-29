// Height of the map in blocks
const MAP_HEIGHT = 20;
// Width of a block based on the height of the window
const BLOCK_WIDTH = window.innerHeight / MAP_HEIGHT;
// Height of a block based on the height of the window
const BLOCK_HEIGHT = window.innerHeight / MAP_HEIGHT;
// Width of the map in blocks (calculated from the width of a block and the width of the screen)
const MAP_WIDTH = Math.round(window.innerWidth / BLOCK_WIDTH);
// Size in blocks of the starting platform (this platform will be flat)
const STARTING_PLATFORM_SIZE = 5;

// type of blocks
const MAP_COMPONENT_TYPES = {
    grass: "grass",
    dirt: "dirt",
    castle: "castle"
};

// type of blocks
const RESSOURCE_TYPES = {
    image: "image",
    sprite: "sprite",
    sound: "sound"
};

// Different directions
const DIRECTIONS = {
    left: "left",
    right: "right"
};

// Different teams
const TEAMS = {
    friend: "friend",
    enemy: "enemy"
};
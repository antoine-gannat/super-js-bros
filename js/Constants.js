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
// Number of lifes before game over
const STARTING_LIFE_NB = 3;
// Gravity
const GRAVITY_FORCE = Math.round(BLOCK_HEIGHT / 18);

// type of blocks
const MAP_COMPONENT_TYPES = {
    grass: "grass",
    dirt: "dirt",
    castle: "castle",
    chest: "chest",
    coin: "coin"
};

// type of blocks
const RESSOURCE_TYPES = {
    image: "image",
    sprite: "sprite",
    sound: "sound"
};

// Different directions
const DIRECTIONS = {
    north: "north",
    south: "south",
    east: "east",
    west: "west"
};

// Different teams
const TEAMS = {
    friendly: "friendly",
    enemy: "enemy"
};
const MAP_HEIGHT = 20;
const BLOCK_WIDTH = window.innerHeight / MAP_HEIGHT;
const BLOCK_HEIGHT = window.innerHeight / MAP_HEIGHT;
const MAP_WIDTH = Math.round(window.innerWidth / BLOCK_WIDTH);
const STARTING_PLATFORM_SIZE = 5;

// type of blocks
const MAP_BLOC_TYPES = {
    grass: "grass",
    dirt: "dirt"
};

// type of blocks
const RESSOURCE_TYPES = {
    image: "image",
    sprite: "sprite",
    sound: "sound"
};

const DIRECTIONS = {
    left: "left",
    right: "right"
};

const TEAMS = {
    friend: "friend",
    enemy: "enemy"
};
export const DEBUG_MODE = true;

export const BLOCK_PIXEL_WIDTH = 16;
export const BLOCK_PIXEL_HEIGHT = 16;
export const MOVE_SPEED = 250 / (DEBUG_MODE ? 2 : 1); // How fast we actually walk
export const WALK_SPEED = 150 / (DEBUG_MODE ? 2 : 1); // How fast the walk animation plays
export const CRITICAL_HIT_PERCENTAGE = 0.1;
export const CRITICAL_HIT_MULTIPLIER = 2;
export const TRAINER_VISION = 4; // How far trainers can see
export const MENU_MAX_HEIGHT = 9;

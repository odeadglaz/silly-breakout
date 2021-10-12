// General game
export const DROP_HEIGHT = 40;
export const GAME_SPEED = 20;

// Ball
export const BALL_RADIUS = 10;

// Paddle
export const PADDLE_MOVE_SPEED = 10;
export const PADDLE_SIZE = {
  width: 100,
  height: 15,
};

// Bricks
export const BRICKS_PADDING = 15;
export const BRICKS_MARGIN = 20;
export const BRICK_SIZE = {
  height: 15,
  width: 75,
};

// Canvas game board
export const BOARD = document.getElementById('gameBoard');
export const DRAWING_CONTEXT = BOARD.getContext('2d');
export const BOARD_LIMITS = {
  top: BALL_RADIUS,
  left: BALL_RADIUS,
  right: BOARD.width - BALL_RADIUS / 2,
  bottom: BOARD.height - BALL_RADIUS / 2,
};

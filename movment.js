import {
  BOARD,
  BOARD_LIMITS,
  BALL_RADIUS,
  PADDLE_SIZE,
  BRICK_SIZE,
} from './constants';
import {
  ballPosition,
  paddlePosition,
  bricks,
  ballMovment,
  paddleMovment,
  turnBallMovment,
  allowBrickCollision,
  increaseScore,
  score,
  life,
  decreaseLife,
} from './state';
import * as painter from './painter';
import * as events from './events';

const bricksCollision = (position) => {
  if (!allowBrickCollision) {
    return;
  }

  const collidingBrick = bricks
    .filter((brick) => brick.hitpoints > 0)
    .find((brick) => {
      if (
        position.x + BALL_RADIUS >= brick.x &&
        position.x <= brick.x + BRICK_SIZE.width &&
        position.y + BALL_RADIUS >= brick.y &&
        position.y <= brick.y + BRICK_SIZE.height
      ) {
        brick.hitpoints -= 1;

        increaseScore();

        return true;
      }
    });

  return !!collidingBrick;
};

export const moveBall = () => {
  // X Axis movment
  let potentialXPosition = ballPosition.x + ballMovment.x;

  if (
    potentialXPosition <= BOARD_LIMITS.left ||
    potentialXPosition >= BOARD_LIMITS.right
  ) {
    turnBallMovment('x');
  }

  // Y Axis movment
  let potentialYPosition = ballPosition.y + ballMovment.y;
  let isAbovePaddle =
    potentialXPosition > paddlePosition.x &&
    potentialXPosition < paddlePosition.x + PADDLE_SIZE.width;

  const bottomLimit =
    BOARD_LIMITS.bottom + (isAbovePaddle ? -PADDLE_SIZE.height : 0);

  if (
    potentialYPosition <= BOARD_LIMITS.top ||
    potentialYPosition >= bottomLimit
  ) {
    turnBallMovment('y');
  }

  // Bricks collision
  if (
    bricksCollision({
      x: potentialXPosition,
      y: potentialYPosition,
    })
  ) {
    if (score === bricks.length) {
      events.bus.trigger('win');
      console.log('Game Won!');
      return;
    }

    turnBallMovment('y');
  }

  painter.ball({
    x: ballPosition.x + ballMovment.x,
    y: ballPosition.y + ballMovment.y,
  });

  if (potentialYPosition >= bottomLimit) {
    const bottomCollision =
      ballPosition.x < paddlePosition.x ||
      ballPosition.x + BALL_RADIUS / 2 > paddlePosition.x + PADDLE_SIZE.width;

    if (bottomCollision && life <= 0) {
      console.log('Game over');
      events.bus.trigger('game-over');
      return;
    }

    bottomCollision && decreaseLife();
    allowBrickCollision = true;
  }
};

export const movePaddle = () => {
  paddlePosition.x = paddlePosition.x + paddleMovment;

  if (paddlePosition.x < 0) {
    paddlePosition.x = 0;
  }

  if (paddlePosition.x + PADDLE_SIZE.width > BOARD.width) {
    paddlePosition.x = BOARD.width - PADDLE_SIZE.width;
  }

  painter.paddle(paddlePosition);
};

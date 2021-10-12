export let gameKeeper = {};
export let ballPosition = {};
export let paddlePosition = {};
export let paddleMovment = 0;
export let ballMovment = {
  x: 5,
  y: 5,
};
export let bricks = [];
export let allowBrickCollision = false;

export let score = 0;
export let life = 3;

export const turnBallMovment = (axis) =>
  (ballMovment[axis] = ballMovment[axis] * -1);

export const decreaseLife = () => {
  if (life > 0) {
    life--;
  }
};
export const increaseScore = () => score++;
export const setBricks = (newBricks) => (bricks = newBricks);
export const setPaddleMovment = (movment) => (paddleMovment = movment);
export const setBallPosition = (position) => (ballPosition = position);
export const setPaddlePosition = (position) => (paddlePosition = position);

export const reset = () => {
  ballPosition = {};
  paddlePosition = {};
  paddleMovment = 0;
  ballMovment = { x: 5, y: 5 };
  allowBrickCollision = false;
  score = 0;
  life = 3;
};

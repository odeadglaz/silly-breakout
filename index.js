import './style.css';
import { gameKeeper, reset as resetState, bricks, score, life } from './state';
import { ballStartPoint, paddleStartPoint, generateBricks } from './helpers';
import { moveBall, movePaddle } from './movment';
import * as painter from './painter';
import * as events from './events';

/**
 * The game single frame animation
 */
const drawGameFrame = () => {
  // Wipe board before next drawing frame
  painter.wipe();

  moveBall();

  movePaddle();

  painter.bricks(bricks);

  painter.score(score);
  painter.life(life);

  gameKeeper.playing && requestAnimationFrame(drawGameFrame);
};

const stop = () => {
  events.detach();
  clearTimeout(gameKeeper.timer);
  gameKeeper.playing = false;
};

const restart = () => {
  if (gameKeeper.playing) {
    stop();
  }

  resetState();
  play();
};

const play = () => {
  const startPoint = ballStartPoint();
  const paddlePoint = paddleStartPoint();

  painter.ball(startPoint);
  painter.paddle(paddlePoint);

  const bricks = generateBricks();
  painter.bricks(bricks);

  painter.score(score);
  painter.life(life);

  gameKeeper.playing = true;

  drawGameFrame();

  events.attach();

  gameKeeper.timer = setTimeout(stop, 50000);
};

const win = () => {
  stop();
  setTimeout(() => {
    painter.wipe();
    painter.animateText('You Win :)', '#1f2f90');
  });
};

const gameOver = () => {
  stop();

  setTimeout(() => {
    painter.wipe();
    painter.animateText('Game Over');
  });
};

play();

events.bus.on('stop', stop);
events.bus.on('game-over', gameOver);
events.bus.on('win', win);
events.bus.on('restart', restart);

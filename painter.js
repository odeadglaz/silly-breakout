import { setBallPosition, setPaddlePosition, setBricks } from './state';
import {
  DRAWING_CONTEXT,
  BALL_RADIUS,
  PADDLE_SIZE,
  BOARD,
  BRICK_SIZE,
} from './constants';

export const ball = (point) => {
  DRAWING_CONTEXT.beginPath();
  DRAWING_CONTEXT.arc(point.x, point.y, BALL_RADIUS, 0, Math.PI * 2);
  DRAWING_CONTEXT.fillStyle = '#0095DD';
  DRAWING_CONTEXT.fill();
  DRAWING_CONTEXT.closePath();

  setBallPosition(point);
};

export const paddle = (point) => {
  DRAWING_CONTEXT.beginPath();
  DRAWING_CONTEXT.rect(point.x, point.y, PADDLE_SIZE.width, PADDLE_SIZE.height);

  DRAWING_CONTEXT.fillStyle = '#0095DD';
  DRAWING_CONTEXT.fill();
  DRAWING_CONTEXT.closePath();

  setPaddlePosition(point);
};

export const wipe = () => {
  DRAWING_CONTEXT.clearRect(0, 0, BOARD.width, BOARD.height);
};

export const bricks = (bricks) => {
  bricks
    .filter((brick) => brick.hitpoints > 0)
    .forEach((brick) => {
      DRAWING_CONTEXT.beginPath();
      DRAWING_CONTEXT.rect(
        brick.x,
        brick.y,
        BRICK_SIZE.width,
        BRICK_SIZE.height
      );
      DRAWING_CONTEXT.fillStyle = '#0095DD';
      DRAWING_CONTEXT.fill();
      DRAWING_CONTEXT.closePath();
    });

  setBricks(bricks);
};

export const score = (score) => {
  drawText(`Score ${score}`, { x: 8, y: 20 });
};

export const life = (life) => {
  drawText(`Life Left ${life}`, { x: 380, y: 20 });
};

export const drawText = (
  text,
  position,
  styling = { font: '16px Arial', fillStyle: '#0095DD' }
) => {
  DRAWING_CONTEXT.font = styling.font;
  DRAWING_CONTEXT.fillStyle = styling.fillStyle;
  DRAWING_CONTEXT.fillText(text, position.x, position.y);
};

export const animateText = (text, color) => {
  let dashLen = 170,
    dashOffset = dashLen,
    speed = 15,
    x = BOARD.width / 2 - 120,
    y = 180,
    i = 0;

  DRAWING_CONTEXT.font = '48px Comic Sans MS, cursive, TSCu_Comic, sans-serif';
  DRAWING_CONTEXT.lineWidth = 5;
  DRAWING_CONTEXT.lineJoin = 'round';
  DRAWING_CONTEXT.globalAlpha = 2 / 3;
  DRAWING_CONTEXT.strokeStyle = DRAWING_CONTEXT.fillStyle = color || 'red';

  (function animatedTextLoop() {
    DRAWING_CONTEXT.clearRect(x, y - 60, 60, 120);
    DRAWING_CONTEXT.setLineDash([dashLen - dashOffset, dashOffset - speed]); // create a long dash mask
    dashOffset -= speed; // reduce dash length
    DRAWING_CONTEXT.strokeText(text[i], x, y); // stroke letter

    if (dashOffset > 0) requestAnimationFrame(animatedTextLoop);
    // animate
    else {
      DRAWING_CONTEXT.fillText(text[i], x, y); // fill final letter
      dashOffset = dashLen; // prep next char

      x +=
        DRAWING_CONTEXT.measureText(text[i++]).width +
        DRAWING_CONTEXT.lineWidth * Math.random();

      DRAWING_CONTEXT.setTransform(1, 0, 0, 1, 0, 3 * Math.random()); // Random y-delta
      DRAWING_CONTEXT.rotate(Math.random() * 0.005); // Random rotation

      // Process next char if present
      if (i < text.length) requestAnimationFrame(animatedTextLoop);
    }
  })();
};

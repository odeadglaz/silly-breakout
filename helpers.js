import {
  BOARD,
  DROP_HEIGHT,
  PADDLE_SIZE,
  BRICKS_MARGIN,
  BRICKS_PADDING,
  BRICK_SIZE,
} from './constants';

export const ballStartPoint = () => {
  const y = DROP_HEIGHT + Math.round(Math.random() * 40);
  const x = Math.round(Math.random() * BOARD.width);

  return { y, x: Math.max(x, 30) };
};

export const paddleStartPoint = () => {
  return {
    x: BOARD.width / 2 - PADDLE_SIZE.width / 2,
    y: BOARD.height - PADDLE_SIZE.height,
  };
};

export const generateBricks = () => {
  const rows = 3;
  const rowMaxLength = BOARD.width - BRICKS_MARGIN * 2;

  return Array.from(Array(rows).keys())
    .map((row) => {
      const rowBricks = [];
      let yStartPosition =
        (row + 1) * BRICK_SIZE.height + BRICKS_MARGIN + BRICKS_PADDING * row;

      let availableSpace = rowMaxLength;
      let xStartingPoint = BRICKS_MARGIN;

      while (availableSpace > 0) {
        const isLast = availableSpace - BRICK_SIZE.width < 0;

        let requiredSpace = BRICK_SIZE.width;
        if (!isLast) {
          requiredSpace += BRICKS_PADDING;
        }

        if (availableSpace > 0) {
          rowBricks.push({
            x: xStartingPoint,
            y: yStartPosition,
            hitpoints: 1,
          });
        }

        availableSpace -= requiredSpace;
        xStartingPoint += requiredSpace;
      }

      return rowBricks;
    })
    .flat();
};

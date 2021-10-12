import { PADDLE_MOVE_SPEED } from './constants';
import { setPaddleMovment } from './state';
let handlers = {};

const once = (fn) => {
  let executed = false;

  return () => {
    if (!executed) {
      fn();
    }

    executed = true;
  }
}

export const bus = {
  events: {},
  on: function (eventName, callback) {
    const events = this.events[eventName] || [];

    this.events[eventName] = [...events, callback];
  },
  off: function (eventName, callback) {
    this.events[eventName] = this.events[eventName]
      .filter((event) => callback && event !== callback);
  },
  trigger: function (eventName) {
    const events = this.events[eventName] || [];

    events.forEach((event) => event());
  },
};

const attachButtonEvents = once(() => {
  document
    .querySelector('[role="restart"]')
    .addEventListener('click', () => bus.trigger('restart'));
});

const attachKeyboardEvents = () => {
  const moveEvents = ['ArrowLeft', 'ArrowRight'];

  const paddleMoveHanlder = (event) => {
    if (moveEvents.includes(event.code)) {
      setPaddleMovment(
        (event.code === 'ArrowLeft' ? -1 : 1) * PADDLE_MOVE_SPEED
      );
    }
  };

  const paddleStopHandler = () => setPaddleMovment(0);

  document.addEventListener('keydown', paddleMoveHanlder);
  document.addEventListener('keyup', paddleStopHandler);

  handlers.keydown = paddleMoveHanlder;
  handlers.keydown = paddleStopHandler;
}

export const attach = () => {
  attachKeyboardEvents();
  attachButtonEvents();
};

export const detach = () => {
  document.removeEventListener('keydown', handlers.keydown);
  document.removeEventListener('keyup', handlers.keydown);
};

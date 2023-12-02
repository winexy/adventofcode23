import { getLines } from './lib.js';

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

let count = 0;

for (const line of getLines('./2-input.txt')) {
  const [gameText, setsText] = line.split(':');
  const game = parseInt(gameText.split(' ')[1]);

  const sets = setsText.split(';').map(set => {
    return set
      .trim()
      .split(', ')
      .reduce((acc, cube) => {
        const [count, color] = cube.split(' ');
        return Object.assign(acc, {
          [color]: parseInt(count)
        });
      }, {});
  });

  const isValid = sets.every(set => {
    for (const color in set) {
      switch (color) {
        case 'red':
          if (set[color] > MAX_RED) return false;
        case 'green':
          if (set[color] > MAX_GREEN) return false;
        case 'blue':
          if (set[color] > MAX_BLUE) return false;
      }
    }

    return true;
  });

  if (isValid) {
    count += game;
  }
}

console.log({ count });

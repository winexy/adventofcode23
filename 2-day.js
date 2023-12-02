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

  const min = sets.reduce(
    (acc, set) => {
      acc.red = Math.max(acc.red, set.red ?? 0);
      acc.green = Math.max(acc.green, set.green ?? 0);
      acc.blue = Math.max(acc.blue, set.blue ?? 0);

      return acc;
    },
    { red: 0, green: 0, blue: 0 }
  );

  count += min.red * min.green * min.blue;
}

console.log({ count });

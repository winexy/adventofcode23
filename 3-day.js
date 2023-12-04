import { getLines } from './lib.js';

const lines = getLines('./3-input.txt');

const isSymbol = char => typeof char === 'string' && !/\d|\./.test(char);

let total = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  let num = '';
  let isAdjacent = false;

  for (let j = 0; j < line.length; j++) {
    const char = line[j];

    if (/\d/.test(char)) {
      num += char;

      isAdjacent ||=
        isSymbol(lines[i][j - 1]) || // left
        isSymbol(lines[i - 1]?.[j - 1]) || // left top
        isSymbol(lines[i - 1]?.[j]) || // top
        isSymbol(lines[i - 1]?.[j + 1]) || // top right
        isSymbol(lines[i][j + 1]) || // right
        isSymbol(lines[i + 1]?.[j + 1]) || // bottom right
        isSymbol(lines[i + 1]?.[j]) || // bottom
        isSymbol(lines[i + 1]?.[j - 1]); // bottom left
    }

    if (!/\d/.test(line[j + 1])) {
      if (num !== '' && isAdjacent) {
        total += parseInt(num);
      }

      num = '';
      isAdjacent = false;
    }
  }
}

console.log(total);

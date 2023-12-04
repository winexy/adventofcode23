import { getLines } from './lib.js';

const lines = getLines('./3-input.txt');

const isNumber = char => typeof char === 'string' && /\d/.test(char);

let total = 0;

function check(numbers, lines, visited, i, j) {
  if (!visited.has(`${i}/${j}`) && isNumber(lines[i]?.[j])) {
    numbers.push(extractNumber(visited, lines, i, j));
  }
}

function findNumbers(lines, i, j, visited) {
  const numbers = [];

  check(numbers, lines, visited, i, j - 1);
  check(numbers, lines, visited, i - 1, j - 1);
  check(numbers, lines, visited, i - 1, j);
  check(numbers, lines, visited, i - 1, j + 1);
  check(numbers, lines, visited, i, j + 1);
  check(numbers, lines, visited, i + 1, j + 1);
  check(numbers, lines, visited, i + 1, j);
  check(numbers, lines, visited, i + 1, j - 1);

  return numbers;
}

function extractNumber(visited, lines, i, j) {
  while (/\d/.test(lines[i][j])) {
    j -= 1;
  }

  let num = '';

  j += 1;

  while (/\d/.test(lines[i][j])) {
    visited.add(`${i}/${j}`);
    num += lines[i][j];
    j += 1;
  }

  return parseInt(num);
}

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  for (let j = 0; j < line.length; j++) {
    const char = line[j];

    if (char === '*') {
      const numbers = findNumbers(lines, i, j, new Set());

      if (numbers.length > 1) {
        total += numbers.reduce((a, b) => a * b, 1);
      }
    }
  }
}

console.log(total);

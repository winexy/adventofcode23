import fs from 'fs';

export function getLines(pathToFile) {
  const file = fs.readFileSync(pathToFile, 'utf-8');
  return file.split('\n');
}

export class Solution {
  constructor(day, debug) {
    this.debug = debug;
    this.lines = getLines(`./${day}-input.txt`)
  }

  log(...args) {
    if (this.debug) {
      console.log(...args)
    }
  }
}
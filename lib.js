import fs from 'fs';

export function getLines(pathToFile) {
  const file = fs.readFileSync(pathToFile, 'utf-8');
  return file.split('\n');
}

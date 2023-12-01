import fs from 'fs';

const file = fs.readFileSync('./1-input.txt', 'utf-8')

const lines = file.split('\n');

const isNum = x => /\d/.test(x);

let total = 0

for (const line of lines) {
  const chars = line.split('')
  const first = chars.find(isNum)
  const last = chars.reverse().find(isNum)

  total += parseInt(`${first}${last}`);
}

console.log(total);



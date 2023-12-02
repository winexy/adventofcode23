import fs from 'fs';

const file = fs.readFileSync('./1-input.txt', 'utf-8')

const lines = file.split('\n');

const letternum = /^(one|two|three|four|five|six|seven|eight|nine)/

function convert(x) {
  switch (x) {
    case 'one': return 1
    case 'two': return 2
    case 'three': return 3
    case 'four': return 4
    case 'five': return 5
    case 'six': return 6
    case 'seven': return 7
    case 'eight': return 8
    case 'nine': return 9
    default: return parseInt(x)
  }
}


let total = 0

for (const line of lines) {
  const nums = []

  for (let i = 0; i < line.length; i++) {
    if (/\d/.test(line[i])) {
      nums.push(line[i])
    } else {
      const str = line.slice(i)
      const match = str.match(letternum)

      if (match) {
        nums.push(match[0])
      }
    }
  }

  const first = convert(nums.at(0))
  const last = convert(nums.at(-1))

  total += parseInt(`${first}${last}`);
}

console.log(total);



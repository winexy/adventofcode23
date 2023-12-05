import { Solution } from './lib.js';

class Day4 extends Solution {
  first() {
    let total_points = 0;

    for (const line of this.lines) {
      const [, winning_numbers_txt, your_numbers_txt] = line.split(/:|\|/);
      const winnig_numbers = new Set(winning_numbers_txt.trim().split(/\s+/));
      const your_numbers = your_numbers_txt.trim().split(/\s+/);

      let points = 0;

      for (const your_number of your_numbers) {
        if (winnig_numbers.has(your_number)) {
          points = points === 0 ? 1 : points * 2;
        }
      }

      if (points > 0) {
        total_points += points;
      }
    }

    console.log(total_points);
  }

  second() {
    let total_scratchcards = 0;

    const multiplier = new Array(this.lines.length).fill(1);

    for (let i = 0; i < this.lines.length; i++) {
      const card = this.lines[i];

      this.log(`card (${multiplier[i]} instances) = ${card[0]}`);

      const [, winning_numbers_txt, your_numbers_txt] = card.split(/:|\|/);
      const winnig_numbers = new Set(winning_numbers_txt.trim().split(/\s+/));
      const your_numbers = your_numbers_txt.trim().split(/\s+/);

      let matches = 0;

      for (const your_number of your_numbers) {
        if (winnig_numbers.has(your_number)) {
          matches += 1;
        }
      }

      this.log(`  current_card is ${i}, it has ${matches} matches`);

      for (let m = 1; m <= matches; m++) {
        const copy_at = i + m;

        this.log(
          `    current match is = ${m}. copy card at index ${copy_at}. copy=${this.lines[copy_at]}`
        );

        multiplier[copy_at] += multiplier[i];
      }

  
      total_scratchcards += multiplier[i]
    }

    console.log(total_scratchcards);
  }
}

const task = new Day4(4);

task.first();
task.second();

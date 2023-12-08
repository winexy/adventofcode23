import {Solution} from "./lib.js";

class Task extends Solution {
	first() {
		const time = this.lines[0].slice('Time:'.length).trim().split(/\s+/).map(Number)
		const distance = this.lines[1].slice('Distance:'.length).trim().split(/\s+/).map(Number)

		let total = 1;

		for (let i = 0; i < time.length; i++) {
			const time_limit = time[i];
			const current_record = distance[i]

			let win_count = 0

			for (let hold_for = 1; hold_for < time_limit; hold_for++) {
				const remaining_time = time_limit - hold_for;
				const distance = remaining_time * hold_for

				if (distance > current_record) {
					win_count++;
				}
			}

			if (win_count) {
				total *= win_count
			}

		}

		console.log(total)
	}

	second() {
		const time_limit = +this.lines[0].slice('Time:'.length).replace(/\s+/g, '')
		const current_record = +this.lines[1].slice('Distance:'.length).replace(/\s+/g, '')

		let win_count = 0

		for (let hold_for = 1; hold_for < time_limit; hold_for++) {
			const remaining_time = time_limit - hold_for;
			const distance = remaining_time * hold_for

			if (distance > current_record) {
				win_count++;
			}
		}

		console.log(win_count)
	}

}

const task = new Task(6)

task.first()
task.second()
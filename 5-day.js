import {Solution} from "./lib.js";

class Day5 extends Solution {
	first() {
		const stage_mapping = {
			'seed-to-soil': 'soil-to-fertilizer',
			'soil-to-fertilizer': 'fertilizer-to-water',
			'fertilizer-to-water': 'water-to-light',
			'water-to-light': 'light-to-temperature',
			'light-to-temperature': 'temperature-to-humidity',
			'temperature-to-humidity': 'humidity-to-location',
			'humidity-to-location': null
		}

		const data = {}
		let iteration = 0
		let state = 'seed-to-soil'

		const [, ..._seeds] = this.lines[0].split(' ')
		const seeds = _seeds.map(Number);

		for (let i = 2; i < this.lines.length; i++) {
			const line = this.lines[i];

			if (iteration === 0) {
				iteration++;
				continue;
			} else if (line === '') {
				state = stage_mapping[state]
				iteration = 0
				continue;
			} else {
				const [dest, src, range] = line.split(' ').map(Number)

				data[state] ??= [];
				data[state].push({src, dest, range})
			}

			iteration++;
		}

		const locations = []

		for (let i = 0; i < seeds.length; i++) {
			let value = seeds[i];

			for (const key in data) {
				const mapping = data[key].find(mapping => {
					const src_end = mapping.src + mapping.range - 1;
					return mapping.src <= value && value <= src_end;
				})

				if (mapping) {
					const delta = value - mapping.src;
					value = mapping.dest + delta
				}
			}

			locations.push(value)
		}

		const lowest_location = Math.min(...locations)

		console.log(lowest_location)
	}

	second() {
		const stage_mapping = {
			'seed-to-soil': 'soil-to-fertilizer',
			'soil-to-fertilizer': 'fertilizer-to-water',
			'fertilizer-to-water': 'water-to-light',
			'water-to-light': 'light-to-temperature',
			'light-to-temperature': 'temperature-to-humidity',
			'temperature-to-humidity': 'humidity-to-location',
			'humidity-to-location': null
		}

		const data = {}
		let iteration = 0
		let state = 'seed-to-soil'

		for (let i = 2; i < this.lines.length; i++) {
			const line = this.lines[i];

			if (iteration === 0) {
				iteration++;
				continue;
			} else if (line === '') {
				state = stage_mapping[state]
				iteration = 0
				continue;
			} else {
				const [dest, src, range] = line.split(' ').map(Number)

				data[state] ??= [];
				data[state].push({src, dest, range})
			}

			iteration++;
		}

		const [, ..._seeds] = this.lines[0].split(' ')

		let lowest_location = Infinity;

		for (let i = 0; i < _seeds.length; i += 2) {
			const [start, range] = [Number(_seeds[i]), Number(_seeds[i + 1])]

			for (let seed = start; seed < start + range; seed++) {
				let value = seed


				for (const key in data) {
					const mapping = data[key].find(mapping => {
						const src_end = mapping.src + mapping.range - 1;
						return mapping.src <= value && value <= src_end;
					})

					if (mapping) {
						const delta = value - mapping.src;
						value = mapping.dest + delta
					}
				}

				lowest_location = Math.min(lowest_location, value)
			}
		}

		console.log(lowest_location)
	}
}

const task = new Day5(5)

task.first() // 51580674
task.second() // 99751240
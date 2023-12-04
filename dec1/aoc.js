import Wreath from "../wreath.js";

const part1 = (fn) => {
    const wreath = new Wreath('dec1');
    let data = 0;
    wreath.onEachLine(line => {
        const [first] = line.split('').flat().filter(char => !isNaN(Number(char)));
        const [last] = line.split('').flat().reverse().filter(char => !isNaN(Number(char)));
        data += Number(String.prototype.concat.call(first, last))
    });
    wreath.endOfFile(() => fn(data));
}

const part2 = (fn) => {
    const wreath = new Wreath('dec1');
    let data = 0;
    const tokens = {
        'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, /* noine */
    }

    wreath.onEachLine(line => {
        line = line.replaceAll(/(?=(one|two|three|four|five|six|seven|eight|nine))/g, (text, match) => (tokens[match]));
        const [first] = line.split('').flat().filter(char => !isNaN(Number(char)));
        const [last] = line.split('').flat().reverse().filter(char => !isNaN(Number(char)));
        data += Number(String.prototype.concat.call(first, last))
    });
    wreath.endOfFile(() => fn(data));
}


part1(calibrationValue => console.info(`Part 1: ${calibrationValue}`)); // 54390
part2(calibrationValue => console.info(`Part 2: ${calibrationValue}`)); // 54277

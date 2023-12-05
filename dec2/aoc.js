import Wreath from "../wreath.js";


const part1 = (fn) => {
    // game -> hand -> turn 
    // game 1 -> red 2, blue 2, green 6 -> red 2
    const wreath = new Wreath('dec2', false);
    const marbles = {
        red: 12,
        green: 13,
        blue: 14
    }
    let data = 0;
    wreath.onEachLine(line => {
        let [game, rounds] = line.split(': ');
        let hands = rounds.split(';');
        game = game.replace(/\D/g, '');
        // all hands
        hands = hands.map(hand => {
            return hand.split(',').map(item => {
                const [value, key] = item.trim().split(' ');
                return value <= marbles[key];
            })
        }, []);

        if(!hands.flat().some(game => !game)) {
            data += Number(game)
        }
    });
    wreath.endOfFile(() => fn(data));
}

const part2 = (fn) => {
    // game -> hand -> turn 
    // game 1 -> red 2, blue 2, green 6 -> red 2
    const wreath = new Wreath('dec2', false);
    const marbles = {
        red: 12,
        green: 13,
        blue: 14
    }
    let powerset = 0;
    wreath.onEachLine(line => {
        let [game, rounds] = line.split(': ');
        let hands = rounds.split(';');
        game = game.replace(/\D/g, '');
        // all hands
        hands = hands.map(hand => {
            return hand.split(',').map(item => {
                const [value, key] = item.trim().split(' ');
                return { color: key, value: Number(value), valid: value <= marbles[key] }
            })
        }, []).flat();
        hands = hands.reduce((acc, { color, value, valid }) => {
            if(!valid) {
                let highest = hands.filter(item => !item.valid && item.color === color);
                highest = Math.max.apply(Map, highest.map(item => item.value));
                acc[color] = highest;
                return acc;
            }

            if(acc[color] < value) {
                acc[color] = value;
            }

            return acc;
        }, { red: 0, green: 0, blue: 0 })
        powerset += Object.values(hands).reduce((acc, curr) => (acc *= curr));

    });
    wreath.endOfFile(() => fn(powerset));
}

part1(games => console.info(`Part 1: ${games}`)); // 2551
part2(powerset => console.info(`Part 2: ${powerset}`)); // 62811
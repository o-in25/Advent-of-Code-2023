import Wreath from "../wreath.js";

const part1 = (fn) => {
    // game -> hand -> turn 
    // game 1 -> red 2, blue 2, green 6 -> red 2
    const wreath = new Wreath('dec3');
    let grid = [];
    wreath.onEachLine(line => grid.push(line));
    wreath.endOfFile(() => {
        let sum = 0;
        for(let row = 0; row < grid.length; row++) {
            let parts = Array.from(grid[row].matchAll(/[0-9]*/g)).filter(([part]) => part !== '');
            parts.forEach(part => {
                const [partNumber] = part;
                const start = part.index;
                const end = start + partNumber.length - 1;
                const boundryStart = start - 1;
                const boundryEnd = end + 1;

                const bottomCheck = ((row, start, end) => {
                    if(row === grid.length - 1) return false;
                    let bottomRow = grid[row + 1];
                    let borderLeft = start - 1;
                    let borderRight = end + 1;

                    // check down
                    while(start <= end) {
                        if(bottomRow.charAt(start).match(/(?=[^.])([\D])/g)) return true;
                        start++;
                    }

                    // check diagnoal 
                    if(borderLeft >= 0 && bottomRow.charAt(borderLeft).match(/(?=[^.])([\D])/g)) return true;
                    if(borderRight <= grid.length - 1 && bottomRow.charAt(borderRight).match(/(?=[^.])([\D])/g)) return true;
                    return false;
                })(row, start, end);
                
                
                const topCheck = ((row, start, end) => {
                    if(row === 0) return false;
                    let topRow = grid[row - 1];
                    let borderLeft = start - 1;
                    let borderRight = end + 1;

                    // check down
                    while(start <= end) {
                        if(topRow.charAt(start).match(/(?=[^.])([\D])/g)) return true;
                        start++;
                    }

                    // check diagnoal 
                    if(borderLeft >= 0 && topRow.charAt(borderLeft).match(/(?=[^.])([\D])/g)) return true;
                    if(borderRight <= grid.length - 1 && topRow.charAt(borderRight).match(/(?=[^.])([\D])/g)) return true;
                    return false;
                })(row, start, end);

                const lhs = boundryStart >= 0 && grid[row].charAt(boundryStart).match(/(?=[^.])([\D])/g);
                const rhs = boundryEnd <= grid.length - 1 && grid[row].charAt(boundryEnd).match(/\b\d.*?\d\b/g);

                if(bottomCheck || topCheck || lhs || rhs) {
                    sum += Number(partNumber);
                }
            });
        }


        fn(sum);
    });
}

const part2 = (fn) => {
    // game -> hand -> turn 
    // game 1 -> red 2, blue 2, green 6 -> red 2
    const wreath = new Wreath('dec3', true);
    let grid = [];
    wreath.onEachLine(line => grid.push(line));
    wreath.endOfFile(() => {
        let sum = 0;
        for(let row = 0; row < grid.length; row++) {
            let gears = Array.from(grid[row].matchAll(/[*]*/g)).filter(([part]) => part !== '');
            gears.forEach(({ index }) => {
                

                const boundry = ((index, row, grid) => {
                    let adjacent = [];
                    
                    // check left
                    if(index > 0) {
                        adjacent.push(grid[row].charAt(index - 1).matchAll(/([\d]+)/g));


                    }

                    // check right
                    if(index < grid[row].length - 1) {
                        adjacent.push(grid[row].charAt(index + 1).matchAll(/([\d]+)/g));
                    }

                    // check top 
                    if(row > 0) {
                        adjacent.push(grid[row - 1].charAt(index).matchAll(/([\d]+)/g));

                    }

                    // check bottom
                    if(row < grid.length - 1) {
                        // * is at <index>


                        // (<index> + <length>) - index < 2 && (<index> + <length>) - index < 2

                        const test = Array.from(grid[row + 1].matchAll(/([\d]+)/g));
                        console.log(test)
                    //     adjacent.push();
                    //     const regex = /(?<=\D|^)\d+(?=\D|$)/g;

                    //     let match;
                    //     while ((match = regex.exec(grid[row + 1].charAt(index))) !== null) {
                    //       console.log(`Match: ${match[0]}, Index: ${match.index}`);
                    //     }
                    // }
                    }

                    adjacent = adjacent.map(adj => Array.from(adj))

                    console.log(adjacent)
                })(index, row, grid);
            });
        }


        fn(sum);
    });
}

part1(sum => console.info(`Part 1: ${sum}`)); // 532331
part2(sum => console.info(`Part 2: ${sum}`)); // 532331

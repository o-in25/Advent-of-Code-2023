import Wreath from "../wreath.js";

const partNumbers = [];
const part1 = (fn) => {
    // game -> hand -> turn 
    // game 1 -> red 2, blue 2, green 6 -> red 2
    const wreath = new Wreath('dec3', false);
    let grid = [];
    wreath.onEachLine(line => {
        grid.push(line);
    });
    wreath.endOfFile(() => {
        let sum = 0;
        for(let row = 0; row < grid.length; row++) {
            let parts = Array.from(grid[row].matchAll(/[0-9]*/g)).filter(([part]) => part !== '');
            parts.forEach(part => {
                const [partNumber] = part;
                const start = part.index;
                const end = start + partNumber.length - 1;
                const boundaryStart = start - 1;
                const boundaryEnd = end + 1;

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

                const lhs = boundaryStart >= 0 && grid[row].charAt(boundaryStart).match(/(?=[^.])([\D])/g);
                const rhs = boundaryEnd <= grid.length - 1 && grid[row].charAt(boundaryEnd).match(/(?=[^.])([\D])/g);

                if(bottomCheck || topCheck || lhs || rhs) {
                    partNumbers.push(Number(partNumber));
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
    const wreath = new Wreath('dec3', false);
    let grid = [];
    wreath.onEachLine(line => grid.push(line));
    wreath.endOfFile(() => {
        let sum = 0;
        for(let row = 0; row < grid.length; row++) {
            let gears = Array.from(grid[row].matchAll(/[\*]/g)).filter(([part]) => part !== '');
            gears.forEach(({ index }) => {

                const boundary = ((index, row, grid) => {
                    const adjacentTo = (captureGroup) => Array.from(captureGroup).map(match => {
                        const [number] = match;
                        const startIndex = match.index;
                        const endIndex = startIndex + number.length - 1;
                        const isAdjacent = ((start, end, position) => {
                            return position >= start - 1 && position <= end + 1;
                        })(startIndex, endIndex, index);

                        return { isAdjacent, number }
                        // check down left
                    });

                    const inlineTo = (start, row) => {
                        if(start - 1 < 0 || start + 1 > row.length - 1) return;

                        // check left
                        let anchor = start - 1;
                        let lhs = '';
                        while(anchor >= 0) {
                            if(!row.charAt(anchor).match(/([\d]+)/g)) {
                                break;
                            }
                            lhs += row.charAt(anchor);
                            anchor--;
                        }
                        lhs = lhs.split("").reverse().join("");
                        // check right
                        anchor = start + 1;
                        let rhs = '';
                        while(anchor <= row.length - 1) {
                            if(!row.charAt(anchor).match(/([\d]+)/g)) {
                                break;
                            }
                            rhs += row.charAt(anchor);
                            anchor++;
                        }
                        return lhs * rhs;

                    }

                    const eitherSide = inlineTo(index, grid[row]);

                    if(row === 0 || row === grid.length - 1) {
                        return eitherSide || 0;
                    }

                    const top = adjacentTo(grid[row - 1].matchAll(/([\d]+)/g)).filter(({ isAdjacent }) => isAdjacent);
                    const bottom  = adjacentTo(grid[row + 1].matchAll(/([\d]+)/g)).filter(({ isAdjacent }) => isAdjacent);


                    if(!(top.length === 1|| bottom.length === 1)) {
                        return eitherSide || 0;
                    }



                    let eitherBoundary = Array.prototype.concat(top, bottom);
                    eitherBoundary = eitherBoundary.map(({ number }) => Number(number));

                    eitherBoundary = eitherBoundary.reduce((sum, number) => sum * number, 1);
                    if(eitherBoundary && eitherSide) return 0;
                    return eitherBoundary || eitherSide;
                    
                })(index, row, grid);

                sum += boundary;
            });
        }


        fn(sum);
    });
}

part1(sum => console.info(`Part 1: ${sum}`)); // 532331
part2(sum => console.info(`Part 2: ${sum}`)); // 82301120

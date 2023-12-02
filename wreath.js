import fs from 'fs';
import readline from 'readline';

export default class Wreath {

    constructor(dir, lineHandler, resultHandler) {
        this.input = fs.createReadStream(`./../${dir}/input.txt`, 'utf-8');
        this.reader = readline.createInterface({ input: this.input });
        this.reader.on('line', (line) => (lineHandler(line)))
        
    }
}

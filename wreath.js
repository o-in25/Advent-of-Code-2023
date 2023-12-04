import fs from 'fs';
import readline from 'readline';

export default class Wreath {


    constructor(dir) {
        this.input = fs.createReadStream(`./../${dir}/input.txt`, 'utf-8');
        this.reader = readline.createInterface({ input: this.input });
    }

    onEachLine(fn) {
        this.reader.on('line', fn)
    }

    endOfFile(fn) {
        this.reader.on('close', fn)
    }

}

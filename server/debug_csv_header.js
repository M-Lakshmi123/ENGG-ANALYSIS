const fs = require('fs');
const readline = require('readline');

async function getHeader() {
    const fileStream = fs.createReadStream('F:/Project files/ENGG_RESULT.csv');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        const cols = line.split(',');
        cols.forEach((c, i) => console.log(`${i}: ${c.trim()}`));
        break;
    }
}

getHeader();

const math = require('./math');

main();

function main() {
    console.log(`2 + 8 + 1 = ${math.sum(2, 8, 1)}`);
    console.log(`1 * 2 * 3 = ${math.multiply(1, 2, 3)}`);
    console.log(`1 - 1 - 2 = ${math.subtract(1, 1, 2)}`);
    console.log(`100 / 2 / 10 = ${math.divide(100, 2, 10)}`);
}

function sum(...args) {
    return args.reduce((a, b) => a + b);
}

function multiply(...args) {
    return args.reduce((a, b) => a * b);
}

function subtract(...args) {
    return args.reduce((a, b) => a - b);
}

function divide(...args) {
    return args.reduce((a, b) => a / b);
}

module.exports = {
    sum, multiply, subtract, divide
}

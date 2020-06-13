const math = require('./math');

describe('sum', () => {
    test('1 + 1 = 2', () => {
        expect(math.sum(1, 1)).toBe(2);
    });

    test('1 + 1 + 1 = 3', () => {
        expect(math.sum(1, 1, 1)).toBe(3);
    });
});

describe('multiply', () => {
    test('1 * 1 = 1', () => {
        expect(math.multiply(1, 1)).toBe(1);
    });

    test('1 * 2 * 3 = 6', () => {
        expect(math.multiply(1, 2, 3)).toBe(6);
    });
});

describe('subtract', () => {
    test('1 - 1 = 0', () => {
        expect(math.subtract(1, 1)).toBe(0);
    });

    test('1 - 1 - 2 = -2', () => {
        expect(math.subtract(1, 1, 2)).toBe(-2);
    });
});

describe('divide', () => {
    test('1 / 1 = 1', () => {
        expect(math.divide(1, 1)).toBe(1);
    });

    test('100 / 2 / 10 = 5', () => {
        expect(math.divide(100, 2, 10)).toBe(5);
    });
});

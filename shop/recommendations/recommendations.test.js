const r = require('./recommendations');

describe('recommend', () => {
    const recommendations = {
        red: 'rose',
        green: 'grass',
        blue: 'water'
    };

    test('single highest colour occurrence', () => {
        const purchases = [
            { item: 'one', colour: 'blue' },
            { item: 'two', colour: 'red' },
            { item: 'three', colour: 'red' },
        ];

        const rec = r.recommend(purchases, recommendations);

        expect(rec).toBe('rose');
    });

    test('multiple highest colour occurrence', () => {
        const purchases = [
            { item: 'one', colour: 'blue' },
            { item: 'two', colour: 'red' },
            { item: 'three', colour: 'red' },
            { item: 'four', colour: 'blue' }
        ];

        const rec = r.recommend(purchases, recommendations);

        expect(rec).toMatch(/^(rose|water)$/);
    });

    test('no recommendations for highest colour occurrence', () => {
        const purchases = [
            { item: 'one', colour: 'unknown' },
            { item: 'two', colour: 'red' },
            { item: 'three', colour: 'red' },
            { item: 'four', colour: 'blue' },
            { item: 'five', colour: 'unknown' },
            { item: 'six', colour: 'unknown' },
        ];

        const rec = r.recommend(purchases, recommendations);

        expect(rec).toBe('rose');
    });
    
    test('no recommendations for all colours', () => {
        const purchases = [
            { item: 'one', colour: 'red' },
            { item: 'two', colour: 'green' },
            { item: 'three', colour: 'blue' }
        ];

        const rec = r.recommend(purchases, {});

        expect(rec).toBeNull();
    });
});

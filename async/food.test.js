const food = require('./food');

describe('food', () => {
    describe('fetchCallback', () => {
        test('breadie', done => {
            food.fetchCallback('breadie', answer => {
                try {
                    expect(answer).toBe('breadie is good!');
                    done();
                } catch (error) {
                    done(error);
                }
            });
        });

        test('not breadie', done => {
            food.fetchCallback('ketchup', answer => {
                try {
                    expect(answer).toBe('ketchup is ewws!');
                    done();
                } catch (error) {
                    done(error);
                }
            });
        });
    });

    describe('fetchPromise', () => {
        test('scallop via raw promise', () => {
            return expect(food.fetchPromise('scallop')).resolves.toBe('scallop is good!');
        });

        test('not scallop via raw promise', () => {
            return expect(food.fetchPromise('mayo')).rejects.toThrow('mayo is ewws!');
        });

        test('scallop via async/ await', async () => {
            const answer = await food.fetchPromise('scallop');
            expect(answer).toBe('scallop is good!');
        });

        test('not scallop via async/ await', async () => {
            try {
                await food.fetchPromise('mayo');
            } catch (e) {
                expect(e.message).toMatch('mayo is ewws!');
            }
            expect.assertions(1);
        });
    });
});

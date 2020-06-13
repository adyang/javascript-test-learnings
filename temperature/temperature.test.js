const { TemperatureTracker } = require('./temperature');

describe('TemperatureTracker', () => {
    let tracker;
    beforeEach(() => {
        tracker = new TemperatureTracker();
    });

    describe('max', () => {
        test('one temperature', () => {
            tracker.insert(1);
    
            const maxTemp = tracker.max();
    
            expect(maxTemp).toBe(1);
        });
    
        test('multiple temperatures', () => {
            tracker.insert(1);
            tracker.insert(50);
            tracker.insert(100);
    
            const maxTemp = tracker.max();
    
            expect(maxTemp).toBe(100);
        });
    
        test('no temperature', () => {
            const maxTemp = tracker.max();
    
            expect(maxTemp).toBeNull();
        });
    });

    describe('min', () => {
        test('one temperature', () => {
            tracker.insert(1);
    
            const minTemp = tracker.min();
    
            expect(minTemp).toBe(1);
        });
    
        test('multiple temperatures', () => {
            tracker.insert(1);
            tracker.insert(50);
            tracker.insert(100);
    
            const minTemp = tracker.min();
    
            expect(minTemp).toBe(1);
        });
    
        test('no temperature', () => {
            const minTemp = tracker.min();
    
            expect(minTemp).toBeNull();
        });
    });

    describe('mean', () => {
        test('one temperature', () => {
            tracker.insert(25);
    
            const meanTemp = tracker.mean();
    
            expect(meanTemp).toBe(25);
        });
    
        test('multiple temperatures', () => {
            tracker.insert(1);
            tracker.insert(50);
            tracker.insert(100);
    
            const meanTemp = tracker.mean();
    
            expect(meanTemp).toBeCloseTo(50.33);
        });
    
        test('no temperature', () => {
            const meanTemp = tracker.mean();
    
            expect(meanTemp).toBeNull();
        });
    });

    describe('mode', () => {
        test('one temperature', () => {
            tracker.insert(25);
    
            const modeTemp = tracker.mode();
    
            expect(modeTemp).toBe(25);
        });
    
        test('multiple temperatures', () => {
            tracker.insert(1);
            tracker.insert(1);
            tracker.insert(50);
            tracker.insert(50);
            tracker.insert(50);
            tracker.insert(100);
    
            const modeTemp = tracker.mode();
    
            expect(modeTemp).toBe(50);
        });
    
        test('no temperature', () => {
            const modeTemp = tracker.mode();
    
            expect(modeTemp).toBeNull();
        });
    }); 
});

class TemperatureTracker {
    constructor() {
        this.temperatures = [];
    }

    insert(temperature) {
        this.temperatures.push(temperature);
    }

    max() {
        if (this.temperatures.length == 0) return null;
        return Math.max(...this.temperatures);
    }

    min() {
        if (this.temperatures.length == 0) return null;
        return Math.min(...this.temperatures);
    }

    mean() {
        if (this.temperatures.length == 0) return null;

        const sum = this.temperatures.reduce((a, b) => a + b, 0);
        return sum / this.temperatures.length;
    }

    mode() {
        if (this.temperatures.length == 0) return null;

        const frequencies = {};
        for (const temp of this.temperatures) {
            const curr = (frequencies[temp] || 0);
            frequencies[temp] = curr + 1;
        }
        const modeEntry = Object.entries(frequencies)
            .reduce(([t1, f1], [t2, f2]) => f1 >= f2 ? [t1, f1] : [t2, f2]);
        return Number.parseInt(modeEntry[0], 10);
    }
}

module.exports = {
    TemperatureTracker
};

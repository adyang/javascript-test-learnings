const { TemperatureTracker } = require('./temperature');

main();

function main() {
    const tracker = new TemperatureTracker();
    const temperatures = [50, 35, 37, 37, 35, 35];

    console.log(`Inserting temperatures: ${temperatures}`);
    for (const temp of temperatures)
        tracker.insert(temp);
    
    console.log(`Max: ${tracker.max()}`);
    console.log(`Min: ${tracker.min()}`);
    console.log(`Mean: ${tracker.mean()}`);
    console.log(`Mode: ${tracker.mode()}`);
}

const food = require('./food');

main();

async function main() {
    food.fetchCallback('breadie', answer => {
        console.log(answer);
    });
    food.fetchCallback('ketchup', answer => {
        console.log(answer);
    });

    food.fetchPromise('scallop')
        .then(answer => console.log(answer));
    
    try {
        const answer = await food.fetchPromise('doggie');
        console.log(answer);
    } catch (e) {
        console.error(`Alert: ${e.message}`);
    }
}

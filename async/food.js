function fetchCallback(food, reply) {
    if (food === 'breadie')
        reply(`${food} is good!`);
    else
        reply(`${food} is ewws!`);
}

function fetchPromise(food) {
    return new Promise((resolve, reject) => {
        if (food === 'scallop')
            resolve(`${food} is good!`);
        else
            reject(new Error(`${food} is ewws!`));
    });
}

module.exports = {
    fetchCallback, fetchPromise
}
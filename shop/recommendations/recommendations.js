function recommend(purchases, itemsToRecommend) {
    const colours = purchases
        .map(p => p.colour)
        .filter(c => Object.prototype.hasOwnProperty.call(itemsToRecommend, c));
    if (colours.length === 0) return null;
    
    const highestColour = maxOccurrenceOf(colours);
    return itemsToRecommend[highestColour];
}

function maxOccurrenceOf(colours) {
    const colourCounts = colours.reduce((counts, c) => {
        const count = counts[c] || 0;
        return { 
            ...counts,
            [c]: count + 1 };
    }, {});
    const highestColour = Object.keys(colourCounts).reduce((c1, c2) => colourCounts[c1] > colourCounts[c2] ? c1 : c2);
    return highestColour;
}

module.exports = {
    recommend
}

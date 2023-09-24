let orbRate = 75/115;
let otherRates = 40/115;
let rateCap = 15;
let luckModifier = 25;

export function calculateDropChance(enrage) {
    let uniqueDropChance;
    let orbDropChance;
    let otherDropChance;
    let specificOtherDropChance;

    if (localStorage.luckRing == "true") {
        luckModifier = 25;
    } else {
        luckModifier = 0;
    }

    uniqueDropChance = 10000 / (10 + 0.25 * (enrage + luckModifier) + 3 * localStorage.streakCount);

    if (enrage < 25) {
        uniqueDropChance = uniqueDropChance * 30;
    } else if (enrage >= 25 && enrage < 100) {
        uniqueDropChance = uniqueDropChance * 10;
    }

    uniqueDropChance = Math.floor(uniqueDropChance);
    orbDropChance = Math.max(rateCap, 1 /(orbRate * (1 / uniqueDropChance)));
    otherDropChance = Math.max(rateCap, 1/(otherRates * (1 / uniqueDropChance)));
    specificOtherDropChance = otherDropChance * 4;

    console.log(`The chance of receiving any unique is 1/${uniqueDropChance}`);
    console.log(`The chance of receiving an orb is 1/${orbDropChance.toFixed(2)}`);
    console.log(`The chance of receiving any dormant/codex is 1/${otherDropChance.toFixed(2)}`);
    console.log(`The chance of receiving a specific dormant/codex is 1/${specificOtherDropChance.toFixed(2)}`);
};
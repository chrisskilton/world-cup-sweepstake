'use strict';

const fs = require('fs');

const seeding = JSON.parse(fs.readFileSync('teams.json', 'utf8'));
const peeps = JSON.parse(fs.readFileSync('players.json', 'utf8'));;

console.log('Teams:')
seeding.forEach((team, index) => console.log(`${index+1}) ${team}`))

console.log('Playas');
peeps.forEach(peep => console.log(peep));

const teamsToDivide = seeding.length - (seeding.length % peeps.length);
const teamsPerPerson = teamsToDivide / peeps.length;
console.log(`Players will get ${teamsPerPerson} teams each`);

let peepsDistributor = [];
const sweepstake = seeding.slice(0, teamsToDivide).reduce((memo, team) => {
    if (!peepsDistributor.length) {
        peepsDistributor = Array.prototype.slice.call(peeps);
    }
    let playerIndex = Math.floor(Math.random() * peepsDistributor.length);
    memo[peepsDistributor[playerIndex]] = (memo[peepsDistributor[playerIndex]] || []).concat(team);
    peepsDistributor.splice(playerIndex, 1);

    return memo;
}, {});

console.log(sweepstake);

fs.writeFileSync('sweeps.json', JSON.stringify(sweepstake, null, 2), 'utf-8');



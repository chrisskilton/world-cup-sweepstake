'use strict';

const fs = require('fs');
const getDataFromFile = require('./getDataFromFile');
const getRandomPersonIndex = require('./getRandomPersonIndex');
const addTeamToPerson = require('./addTeamToPerson');
const removePersonFromList = require('./removePersonFromList');

const teams = getDataFromFile('teams-bookie-order.json');
const people = getDataFromFile('people.json');

const teamsToDivide = teams.length - (teams.length % people.length);
const teamsPerPerson = teamsToDivide / people.length;

console.log(`People will get ${teamsPerPerson} teams each`);

let peopleDistributor = [];
const sweepstake = teams.slice(0, teamsToDivide).reduce((picksForPeople, team) => {
    if (!peopleDistributor.length) {
        peopleDistributor = Array.prototype.slice.call(people);
    }

    let personIndex = getRandomPersonIndex(peopleDistributor.length);
    let person = peopleDistributor[personIndex];

    console.log(`${peopleDistributor[personIndex]} gets ${team}`);

    addTeamToPerson(picksForPeople, person, team);
    removePersonFromList(peopleDistributor, personIndex);

    return picksForPeople;
}, {});

console.log(sweepstake);

fs.writeFileSync('sweeps.json', JSON.stringify(sweepstake, null, 2), 'utf-8');



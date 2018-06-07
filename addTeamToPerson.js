module.exports = (obj, person, team) => {
    obj[person] = (obj[person] || []).concat(team);
};
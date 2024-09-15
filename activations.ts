// actionations chart is used to address establishments are to be played in round
// after a dice toss

// notice that these establishments are already ordered in right order supposed in
// the rulebook

const wheat_field = {
  do(owns: number, turns: number) {
    if (owns === turns) {
      console.log("nothing");
      return;
    }
    console.log(turns, " pays to ", owns);
  },
};
const livestock_farm = {
  do(owns: number, turns: number) {
    console.log(owns, " takes");
  },
};
const bakery = {
  do(owns: number, turns: number) {
    console.log(owns, " takes");
  },
};

const lookup = {
  "wheat field": wheat_field,
  "livestock farm": livestock_farm,
  bakery: bakery,
};

const counts = {
  "wheat field": [3, 0, 2],
  "livestock farm": [1, 1, 1],
  bakery: [1, 1, 0],
};

const table = {
  1: ["wheat field"],
  2: ["livestock farm", "bakery"],
  3: ["cafe", "bakery"],
  4: ["conbini"],
  5: ["forest"],
  6: [], // all major establishments - for nor i guess there are predefined states ahead for each of them
  7: ["cheese factory"],
  8: ["furniture factory"],
  9: ["restraunt", "mine"],
  10: ["restraunt", "apple orchad"],
  11: ["produce market"],
  12: ["produce market"],
};

const dice = 1;
const turns = 0;
const ests = table[dice];
ests.forEach((est) => {
  for (let i = 0; i < counts[est][turns]; i++) {
    lookup[est].do(i, turns);
  }
});

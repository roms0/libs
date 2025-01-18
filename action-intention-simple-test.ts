const s = {
  dice: {
    points: null as null | number[],
  },
  intentions: {},
  actors: [{ id: "4" }, { id: "5" }],
  turn_actor_id: "5",
  cards: [
    { id: "4340", title: "train station", charges: 1, actor_id: "5" },
    { id: "4341", title: "radio tower", charges: 1, actor_id: "5" },
    { id: "4343", title: "cornfield", actor_id: "5" },
  ],
};

const intentions_titles = {
  one_dice: "one dice",
  two_dices: "two dices",
  dice_redo: "dice redo",
};

function uid() {
  return Math.trunc(Math.random() * 100) + "";
}

function n_dice_intention_generator(dice: number) {
  return function (state: typeof s) {
    if (state.dice.points !== null) {
      return;
    }
    const iuid = uid();
    state.intentions[iuid] = {
      iuid,
      title:
        dice === 1 ? intentions_titles.one_dice : intentions_titles.two_dices,
      requires: [],
      actor_id: state.turn_actor_id,
      rule(state: typeof s) {
        state.dice.points = new Array(dice)
          .fill(undefined)
          .map(() => Math.trunc(Math.random() * 10));
      },
    };
  };
}

function dice_redo_intention(state: typeof s) {
  if (!state.dice.points) {
    return;
  }
  const radio_tower_card = state.cards.find(
    (card) =>
      card.title === "radio tower" && card.actor_id === state.turn_actor_id
  );
  if (!radio_tower_card) {
    return;
  }
  if (!radio_tower_card.charges) {
    return;
  }
  const iuid = uid();
  state.intentions[iuid] = {
    iuid,
    title: intentions_titles.dice_redo,
    requires: [],
    actor_id: state.turn_actor_id,
    rule(state: typeof s) {
      state.dice.points = null;
      radio_tower_card.charges -= 1;
    },
  };
}

const intentions = {
  "one dice": n_dice_intention_generator(1),
  "two dices": n_dice_intention_generator(2),
  "dice redo": dice_redo_intention,
};

function generate_intentions(state: typeof s) {
  state.intentions = {};
  for (const i of Object.values(intentions)) {
    i(state);
  }
}

generate_intentions(s);
console.log(s);
Object.values(
  s.intentions as unknown as [{ rule: (state: unknown) => void }]
)[0].rule(s);
generate_intentions(s);
console.log(s);
Object.values(
  s.intentions as unknown as [{ rule: (state: unknown) => void }]
)[0].rule(s);
generate_intentions(s);
console.log(s);

export {};

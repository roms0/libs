function default_card_swap(
  state,
  actor_id: string,
  to_actor_eid: string,
  from_actor_eid: string
) {
  const to_actor_card = state.cards.find((card) => card.id === to_actor_eid);
  const from_actor_card = state.cards.find(
    (card) => card.id === from_actor_eid
  );
  if (!to_actor_card || !from_actor_card) {
    return;
  }
  const to_actor_id = to_actor_card?.actor_id;
  from_actor_card.actor_id = to_actor_id;
  to_actor_card.actor_id = actor_id;
}

const intention = {
  actor_id: "5",
  title: "swap",
  intention_id: "900901",
  requires: ["to_actor_eid", "from_actor_eid"],
  rule: default_card_swap,
};

const action = {
  state_id: "game_1",
  intention_id: "900901",
  actor_id: "5",
  to_actor_eid: "4343",
  from_actor_eid: "4342",
};

const state = {
  data: [],
  dice: 4,
  intentions: {
    "900901": intention,
  },
  actors: [{ id: "4" }, { id: "5" }],
  cards: [
    { id: "4340", title: "cornfield", actor_id: "5" },
    { id: "4341", title: "cornfield", actor_id: "5" },
    { id: "4343", title: "shipyard", actor_id: "4" },
    { id: "4342", title: "cornfield", actor_id: "5" },
  ],
};

const in_memory_app_state = {
  game_1: state,
};

// 1. WAIT FOR ACTION
// 2. MATCH ACTION WITH PUBLISHED INTENTION AND DO LOGIC
const state_id = action.state_id;
const inten = in_memory_app_state[state_id].intentions[action.intention_id];
inten.rule(
  in_memory_app_state[state_id],
  action.actor_id,
  ...inten.requires.map((req) => action[req])
);
// 3. GENERATE NEW INTENTIONS BASED ON STATE
// 4. SEND STATE WITH FRESH INTENTIONS TO CLIENTS

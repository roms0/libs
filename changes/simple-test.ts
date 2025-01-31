import { Board } from "./board";
import { loop, State } from "./main";

const state = new State();
state.add(new Board({ "1": "22", "22": "333", "333": "1" }));

await loop(
  { handler_id: Object.values(state.handlers)[0]?.id, state_id: state.id },
  state,
  () => console.log(state.changes[state.message_pointer])
);

await loop(
  { handler_id: Object.values(state.handlers)[0]?.id, state_id: state.id },
  state,
  () => console.log(state.changes[state.message_pointer])
);
await loop(
  { handler_id: Object.values(state.handlers)[0]?.id, state_id: state.id },
  state,
  () => console.log(state.changes[state.message_pointer])
);
await loop(
  { handler_id: Object.values(state.handlers)[0]?.id, state_id: state.id },
  state,
  () => console.log(state.changes[state.message_pointer])
);

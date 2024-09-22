import { Establishment } from "./establishment";
import { forward, State, STATES } from "./state";

export const swap: State = {
  title: STATES.SWAP,
  data: { target: null, establishment: null },
  starts(match, i) {
    if (!match.establishers[i].has(Establishment.BUSINESS)) {
      forward(match.establishers[i]);
      match.establishers[i].state.starts(match, i);
    }
  },
  do(match, i, command) {
    if (this.data.target === null) {
      this.data.target = command;
      return;
    }
    if (this.data.establishment === null) {
      this.data.establishment = command;
      return;
    }
    match.establishmentChart[this.data.establishment][this.data.target] -= 1;
    match.establishmentChart[this.data.establishment][i] += 1;
    this.data = { target: null, establishment: null };
    forward(match.establishers[i]);
    match.establishers[i].state.starts(match, i);
  },
};

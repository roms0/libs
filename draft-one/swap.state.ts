import { Establishment } from "./establishment";
import { forward, State, STATES } from "./state";

export const swap: State = {
  title: STATES.SWAP,
  starts(match, i) {
    if (!match.establishers[i].has(Establishment.BUSINESS)) {
      forward(match.establishers[i]);
      match.establishers[i].state.starts(match, i);
    }
  },
  do(match, i, command) {
    if (match.swap.establisher === null) {
      match.swap.establisher = command;
      return;
    }
    if (match.swap.establishment === null) {
      match.swap.establishment = command;
      return;
    }
    match.establishmentChart[this.data.establishment][
      match.swap.establisher
    ] -= 1;
    match.establishmentChart[match.swap.establishment][i] += 1;
    match.swap = { establisher: null, establishment: null };
    forward(match.establishers[i]);
    match.establishers[i].state.starts(match, i);
  },
};

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
    match.establishers[i].data["fs"] = command;
  },
};

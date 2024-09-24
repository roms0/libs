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
    if (match.swap.takeEstablishment === null) {
      match.swap.takeEstablishment = command;
      return;
    }
    match.establishmentChart[this.data.establishment][
      match.swap.establisher
    ] -= 1;
    match.establishmentChart[match.swap.takeEstablishment][i] += 1;
    match.swap = {
      establisher: null,
      takeEstablishment: null,
      handEstablishment: null,
    };
    forward(match.establishers[i]);
    match.establishers[i].state.starts(match, i);
  },
};

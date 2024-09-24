import { repipe, State, STATES } from "./state";

export const dice: State = {
  title: STATES.REPEAT,
  starts(match, i) {
    if (match.dice[0] !== match.dice[1]) return;
    repipe(match.establishers[i]);
  },
  do() {},
};

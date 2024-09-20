import { pipe, State, STATES } from "./state";

export const idle: State = {
  title: STATES.IDLE,
  starts(match, i) {
    match.establishers[i < match.establishers.length - 1 ? i + 1 : 0].state =
      pipe[STATES[1]];
  },
  do() {},
};

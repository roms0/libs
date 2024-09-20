import { EstablishemntGroup, rules } from "./establishment";
import { forward, State, STATES } from "./state";

export const calculation: State = {
  title: STATES.CALCULATION,
  starts() {},
  do(match, ti) {
    const establishments = match.diceChart[match.dice];
    establishments.forEach((establishment) => {
      let start = 0;
      const description = rules[establishment];
      if (description.group === EstablishemntGroup.RED) {
        start = ti;
      }
      match.establishmentChart[establishment].forEachFrom(
        start,
        (times, oi) => {
          for (let t = 0; t < times; t++) {
            description.effect(match, oi, ti);
          }
        }
      );
    });
    forward(match.establishers[ti]);
    match.establishers[ti].state.starts(match, ti);
  },
};

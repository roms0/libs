import { EstablishemntGroup, rules } from "./establishment";
import { State } from "./state";

export const calculation: State = {
  title: "calculation",
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
  },
};

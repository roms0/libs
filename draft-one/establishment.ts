import { Establisher } from "./establisher";
import { Match } from "./match";

export enum Establishment {
  FIELD,
  CLUB,
}

enum EstablishemntGroup {
  BLUE,
  GREEN,
  RED,
  SPECIAL,
  LANDMARK,
}

abstract class EstablishmentDescription {
  abstract cost: number;
  group: EstablishemntGroup;
  abstract effect(owns: Establisher, turns: Establisher): void;
  abstract effect2?(match: Match): void;
}

type EstablishmentLookup = { [E in Establishment]: EstablishmentDescription };

const elkp: EstablishmentLookup = {
  [Establishment.FIELD]: {
    cost: 1,
    group: EstablishemntGroup.BLUE,
    effect(owns) {
      owns.enroll(5);
    },
  },
  [Establishment.CLUB]: {
    cost: 3,
    group: EstablishemntGroup.RED,
    effect(owns, turns) {
      if (owns.has(Establishment.FIELD)) {
        owns.enroll(turns.hand(2));
      } else {
        owns.enroll(turns.hand(1));
      }
    },
  },
};

import { Establisher } from "./establisher";
import { Match } from "./match";

export enum Establishment {
  FIELD,
  CLUB,
}

export enum EstablishemntGroup {
  BLUE,
  GREEN,
  RED,
  SPECIAL,
  LANDMARK,
}

abstract class EstablishmentDescription {
  abstract cost: number;
  group: EstablishemntGroup;
  abstract effect(match: Match, oi: number, ti: number): void;
}

type EstablishmentLookup = { [E in Establishment]: EstablishmentDescription };

export const rules: EstablishmentLookup = {
  [Establishment.FIELD]: {
    cost: 1,
    group: EstablishemntGroup.BLUE,
    effect() {},
  },
  [Establishment.CLUB]: {
    cost: 3,
    group: EstablishemntGroup.RED,
    effect() {},
  },
};

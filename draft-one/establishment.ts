enum Establishment {
  FIELD,
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
  abstract effect(owns: Establisher, turns: Establisher): void;
}

type EstablishmentLookup = { [E in Establishment]: EstablishmentDescription };

const elkp: EstablishmentLookup = {
  [Establishment.FIELD]: { cost: 1, effect(owns, turns) {} },
};

// appwide
export type HeroState = {
  title: string;
  starts(): void;
  reacts(): void;
};

// matchwide
export type Establishments = string[];
export type EstablishmentsOwnershipState = number[];

// client-specific ui
export type EstablishmentConstructionYard = {
  count_in_stock: number;
  title: string;
  first_available_index: number;
};

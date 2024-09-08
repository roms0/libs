// appwide
export type HeroState = {
  title: string;
  starts(): void;
  reacts(): void;
};
export type EstablismentGroup = "recreation" | "production" | "commerce";
export type EstablishmentDescription = {
  group: EstablismentGroup;
};
export type EstablishmentDescriptions<T extends string> = Record<
  T,
  EstablishmentDescription
>;

// matchwide
export type Establishments = string[];
export type EstablishmentsOwnershipState = number[];
export type EstablishmentGroupsIndeces = number[];

// client-specific ui
export type EstablishmentConstructionYard = {
  count_in_stock: number;
  title: string;
  first_available_index: number;
};

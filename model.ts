// appwide
export type HeroState = {
  title: string;
  starts(): void;
  reacts(): void;
};
export enum EstablishmentGroup {
  recreation,
  production,
  commercial,
}
export type EstablishmentDescription = {
  group: EstablishmentGroup;
  count: number;
};
export type EstablishmentDescriptions<T extends string> = Record<
  T,
  EstablishmentDescription
>;

// matchwide
export type Establishments<T extends string> = T[];
export type EstablishmentsOwnershipState = number[];
export type EstablishmentGroupsIndeces = number[];
export type PlayersTable = string[];
export type RecreationEstablishmentsSpendings = number[][];

// client-specific ui
export type EstablishmentConstructionYard = {
  count_in_stock: number;
  title: string;
  first_available_index: number;
};

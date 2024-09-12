// appwide
type StatePipelineController = (i: number, pie: StatePipeline) => void;
export type HeroState = {
  title: string;
  starts: StatePipelineController;
  reacts: StatePipelineController;
};
export enum EstablishmentGroup {
  service_and_recreation,
  resource_mining,
  production_and_commerce,
  establishment_major,
  landmarks,
}
export type EstablishmentDescription = {
  group: EstablishmentGroup;
  count: number;
};
export type EstablishmentDescriptions<T extends string> = Record<
  T,
  EstablishmentDescription
>;
export type StatePipeline = HeroState[];
export type Player = {
  dice_strategy: () => number[];
};

// matchwide
export type Establishments<T extends string> = T[];
export type EstablishmentsOwnershipState = number[];
export type EstablishmentGroupsIndeces = number[];
export type PlayersTable = string[];
export type RecreationEstablishmentsSpendings = number[][];
export type Dices = number[];

// client-specific ui
export type EstablishmentConstructionYard = {
  count_in_stock: number;
  title: string;
  first_available_index: number;
};

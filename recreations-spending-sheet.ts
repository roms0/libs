import {
  EstablishmentDescriptions,
  EstablishmentGroup,
  Establishments,
  EstablishmentsOwnershipState,
  PlayersTable,
  RecreationEstablishmentsSpendings,
} from "./model";

export function recreations_spending_sheet<T extends string>(
  players_table: PlayersTable,
  establishments: Establishments<T>,
  ownership_state: EstablishmentsOwnershipState,
  establishment_configs: EstablishmentDescriptions<T>
): RecreationEstablishmentsSpendings {
  let sheet: number[][] = players_table.map(() => []);
  establishments.forEach((estalishment, k) => {
    const description = establishment_configs[estalishment];
    if (
      description.group === EstablishmentGroup.commercial &&
      ownership_state[k] > -1
    ) {
      sheet[players_table.length - 1 - ownership_state[k]].push(k);
    }
  });
  return sheet;
}

const sheet = recreations_spending_sheet(
  ["sam", "nick", "tom"],
  ["mill", "mill", "field", "mill", "mill"],
  [0, -1, -1, 2, -1],
  {
    mill: { group: EstablishmentGroup.commercial, count: 0 },
    field: { group: EstablishmentGroup.production, count: 0 },
  }
);
console.log(sheet);

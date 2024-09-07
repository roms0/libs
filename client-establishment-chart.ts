import {
  EstablishmentConstructionYard,
  Establishments,
  EstablishmentsOwnershipState,
} from "./model";

export function establishment_chart<T extends string>(
  table: Record<T, number>,
  establishments: Establishments,
  establishment_ownership: EstablishmentsOwnershipState
): EstablishmentConstructionYard[] {
  const info = [] as EstablishmentConstructionYard[];
  let accumulated = 0;
  let freeindex = 0;
  establishments.forEach((item, i) => {
    if (establishment_ownership[i] > -1) {
      freeindex += 1;
      accumulated += 1;
    }
    if (establishments[i + 1] !== item) {
      info.push({
        count_in_stock: table[item] - accumulated,
        title: item,
        first_available_index: table[item] - accumulated === 0 ? -1 : freeindex,
      });
      freeindex = i + 1;
      accumulated = 0;
    }
  });
  return info;
}

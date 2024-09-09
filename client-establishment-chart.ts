import {
  EstablishmentConstructionYard,
  EstablishmentDescriptions,
  Establishments,
  EstablishmentsOwnershipState,
} from "./model";

export function establishment_chart<T extends string>(
  table: EstablishmentDescriptions<T>,
  establishments: Establishments<T>,
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
        count_in_stock: table[item].count - accumulated,
        title: item,
        first_available_index:
          table[item].count - accumulated === 0 ? -1 : freeindex,
      });
      freeindex = i + 1;
      accumulated = 0;
    }
  });
  return info;
}

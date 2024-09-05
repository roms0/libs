interface EstablishmentYardInfo {
  in_stock: number;
  title: string;
  free_at: number;
}

export function establishment_chart<T extends string>(
  table: Record<T, number>,
  deck: T[],
  states: number[]
): EstablishmentYardInfo[] {
  const info = [] as EstablishmentYardInfo[];
  let accumulated = 0;
  let freeindex = 0;
  deck.forEach((item, i) => {
    if (states[i] > -1) {
      freeindex += 1;
      accumulated += 1;
    }
    if (deck[i + 1] !== item) {
      info.push({
        in_stock: table[item] - accumulated,
        title: item,
        free_at: table[item] - accumulated === 0 ? -1 : freeindex,
      });
      freeindex = i + 1;
      accumulated = 0;
    }
  });
  return info;
}

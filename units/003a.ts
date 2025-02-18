import { Data, isPlacement, isProductionEstablishment, State } from "./types";

export function has_productions_to_visit(state: State, data: Data) {
  const main = state.turns(data);
  const productions = Object.values(data).filter(isProductionEstablishment);
  return productions.some(
    (item) => isPlacement(item) && item.placement > main.placement
  );
}

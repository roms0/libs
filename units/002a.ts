import { Data, isPlacement, isPromenadeEstablishment, State } from "./types";

export function has_promenades_to_visit(state: State, data: Data) {
  const main = state.turns(data);
  const promenades = Object.values(data).filter(isPromenadeEstablishment);
  return promenades.some(
    (item) => isPlacement(item) && item.placement > main.placement
  );
}

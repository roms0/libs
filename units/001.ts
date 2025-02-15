import { Data, isMaster, isPoints, Points, State } from "./types";

export function some_supplier_supplied_points(state: State, data: Data) {
  return Object.keys(data)
    .filter(
      (id) =>
        isPoints(data[id]) &&
        isMaster(data[id]) &&
        data[id].master === state.turns(data).id
    )
    .map((id) => data[id])
    .some((item) => (item as Points).dices !== null);
}

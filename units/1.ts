import { Data, isDices, isMaster, isTouched, points, State } from "./types";

export function read_points_supplier(state: State, data: Data) {
  const touched = Object.values(data).filter((item) => isTouched(item));
  const supplier = touched
    .filter((item) => isDices(item) && isMaster(item))
    .find(
      (item) =>
        item.master === state.turns(data).id &&
        item.whom === state.turns(data).id &&
        item.touched === 1
    );
  if (!supplier) return;
  points(
    supplier,
    new Array(supplier.dices)
      .fill(undefined)
      .map(() => Math.trunc(Math.random() * 10))
  );
}

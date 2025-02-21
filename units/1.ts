import {
  Data,
  Dices,
  ID,
  isDices,
  isMaster,
  isTouched,
  Master,
  points,
  State,
  Touch,
} from "./types";

export function read_supplier(state: State, data: Data) {
  let supplier: null | (ID & Touch & Dices) = null;
  const touched = Object.values(data).filter((item) => isTouched(item));
  if (!isDices(touched[0])) return;
  if (isMaster(touched[0]) && touched[0].master === state.turns(data).id) {
    supplier = touched[0];
  }
  if (!isMaster(touched[0])) {
    supplier = touched[0];
  }
  if (!supplier) return;
  points(
    supplier,
    new Array(supplier.dices)
      .fill(undefined)
      .map(() => Math.trunc(Math.random() * 10))
  );
  console.log(supplier);
}

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

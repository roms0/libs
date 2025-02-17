import {
  Data,
  Item,
  State,
  establish,
  isCost,
  isMaster,
  isTouched,
  master,
  transaction,
} from "./types";

export function building(state: State, data: Data, debug = false) {
  const main = state.turns(data);
  const blueprint = Object.values(data)
    .filter((item) => isCost(item) && isTouched(item))
    .filter((item) => !isMaster(item))
    .filter((item) => {
      return (
        item.touched === 1 && item.whom === main.id && item.cost <= main.balance
      );
    })[0];
  if (!blueprint) {
    return;
  }
  const establisment = new Item();
  for (const key in blueprint) {
    establisment[key] = blueprint[key];
  }
  master(establisment, main.id);
  establish(establish, state.turn);
  delete establisment["cost"];
  data[establisment.id] = establisment;
  const trans = transaction(blueprint.cost, "state", main.id);
  data[trans.id] = trans;
}

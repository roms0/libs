import {
  balance,
  Data,
  enable,
  Item,
  master,
  State,
  isPromenadeEstablishment,
  isPlacement,
  isTouched,
  transaction,
  placement,
  isBalance,
} from "./types";

export function read_proms(state: State, data: Data) {
  const main = state.turns(data);
  const placedPromenades = Object.values(data).filter(
    (item) => isPromenadeEstablishment(item) && isPlacement(item)
  );
  let step = 0;
  placedPromenades.forEach((item) => {
    if (
      isTouched(item) &&
      item.touched === item.placement &&
      item.whom === main.id
    ) {
      const tea = transaction(item.fee, item.master, main.id);
      placement(tea, item.placement);
      data[tea.id] = tea;
      step += 1;
    }
  });
  placedPromenades.forEach((item) => {
    item.placement -= step;
  });
}

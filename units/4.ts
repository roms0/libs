import {
  Data,
  State,
  isPromenadeEstablishment,
  isPlacement,
  isTouched,
  transaction,
  placement,
} from "./types";

export function read_proms(state: State, data: Data) {
  const main = state.turns(data);
  const placedPromenades = Object.values(data).filter(
    (item) => isPromenadeEstablishment(item) && isPlacement(item)
  );
  placedPromenades.forEach((item) => {
    if (
      isTouched(item) &&
      item.touched === item.placement &&
      item.whom === main.id
    ) {
      const tea = transaction(item.fee, item.master, main.id);
      placement(tea, item.placement);
      data[tea.id] = tea;
      placement(main, item.placement);
    }
  });
  // placedPromenades.forEach((item) => {
  //   item.placement -= step;
  // });
}

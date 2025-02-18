import {
  Data,
  isPlacement,
  isProductionEstablishment,
  isPromenadeEstablishment,
  placement,
  State,
} from "./types";

function place_production_items(state: State, data: Data) {
  const values = Object.values(data);
  let pos =
    values.find((item) => isPromenadeEstablishment(item) && isPlacement(item))
      ?.placement || 0;
  const productions = values.filter((item) => isProductionEstablishment(item));
  productions.forEach((item) => {
    pos += 1;
    placement(item, pos);
  });
}

import {
  Data,
  isPlacement,
  isPoints,
  isPromenadeEstablishment,
  Placement,
  placement,
  State,
} from "./types";

export function position_proms(state: State, data: Data, debug = false) {
  let pos = 1;
  const points = Object.values(data).find((item) => isPoints(item))?.points;
  if (!points) {
    return;
  }
  const promenades = Object.values(data).filter((item) =>
    isPromenadeEstablishment(item)
  );
  promenades.forEach((item) => {
    delete (item as { placement?: number }).placement;
  });
  const place = promenades.filter(
    (item) =>
      item.master !== state.turns(data).id &&
      item.points_consumer.some((point) => points.includes(point))
  );
  if (place.length === 0) {
    return;
  }
  placement(state.turns(data), 0);
  if (debug) {
    console.log("TURNS: ", state.turns(data));
  }
  for (let i = state.turn + state.table.length; i !== state.turn; i--) {
    place
      .filter((item) => item.master === state.table[i % state.table.length])
      .forEach((item) => {
        placement(item, pos);
        pos += 1;
      });
  }
  if (debug) {
    return place
      .filter((item) => isPromenadeEstablishment(item) && isPlacement(item))
      .sort((a, b) => a.placement - b.placement);
  }
}

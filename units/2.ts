import { Data, isEnabled, isPoints, State } from "./types";

export function enable_consumers(state: State, data: Data) {
  const points = Object.values(data).find((item) => isPoints(item))?.points;
  if (!points) return;
  Object.values(data)
    .filter((item) => isEnabled(item))
    .forEach((item) => {
      item.enabled = item.enable_condition.some((condition) =>
        points.includes(condition)
      );
    });
}

const points_count = "points_count";

type PointsCountComponent = {
  [points_count]: number;
};

function is_points_count(item: any): item is PointsCountComponent {
  if (typeof item !== "object" || !item) {
    return false;
  }
  if (points_count in item && typeof item[points_count] === "number") {
    return true;
  }
  return false;
}

export { points_count, is_points_count };

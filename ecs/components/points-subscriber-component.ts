const points_subscriber_component = "points_subscriber_component";

type PointsSubscriberComponent = {
  [points_subscriber_component]: number | null;
};

function is_points_subscriber_component(
  item: any
): item is PointsSubscriberComponent {
  if (typeof item !== "object" || !item) {
    return false;
  }
  if (
    points_subscriber_component in item &&
    typeof item[points_subscriber_component] === "number"
  ) {
    return true;
  }
  return false;
}

export { points_subscriber_component, is_points_subscriber_component };

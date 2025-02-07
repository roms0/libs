const points_supplier_count_component = "points_supplier_count_component";

type PointsSupplierCountComponent = {
  [points_supplier_count_component]: number;
};

function is_points_supplier_count_component(
  item: any
): item is PointsSupplierCountComponent {
  if (typeof item !== "object" || !item) {
    return false;
  }
  if (
    points_supplier_count_component in item &&
    typeof item[points_supplier_count_component] === "number"
  ) {
    return true;
  }
  return false;
}

export { points_supplier_count_component, is_points_supplier_count_component };

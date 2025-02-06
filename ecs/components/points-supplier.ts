const points_supplier = "points_supplier";

type PointsSupplierComponent = {
  [points_supplier]: number[];
};

function is_points_supplier(item: any): item is PointsSupplierComponent {
  if (typeof item !== "object" || !item) {
    return false;
  }
  if (
    points_supplier in item &&
    typeof item[points_supplier] === "object" &&
    Array.isArray(item[points_supplier])
  ) {
    return true;
  }
  return false;
}

export { points_supplier, is_points_supplier };
export type { PointsSupplierComponent };

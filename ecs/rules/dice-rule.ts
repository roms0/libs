import { is_points_supplier_count_component } from "../components/points-supplier-count-component";
import { is_points_supplier } from "../components/points-supplier-component";
import { is_request_component } from "../components/request-component";

function dice_rule(items: unknown[]) {
  for (let item of items) {
    if (
      is_points_supplier_count_component(item) &&
      is_request_component(item) &&
      is_points_supplier(item) &&
      item.request_component === 0 &&
      !item.points_supplier.length
    ) {
      item.points_supplier = new Array(item.points_supplier_count_component)
        .fill(undefined)
        .map(() => Math.random());
    }
  }
}

export { dice_rule };

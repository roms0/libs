import { is_points_count } from "../components/dice-condition";
import { is_points_supplier } from "../components/points-supplier";
import { is_request_component } from "../components/request";

function dice_rule(items: unknown[]) {
  for (let item of items) {
    if (
      is_points_count(item) &&
      is_request_component(item) &&
      is_points_supplier(item) &&
      item.request_component === true &&
      !item.points_supplier.length
    ) {
      item.points_supplier = new Array(item.points_count)
        .fill(undefined)
        .map(() => Math.random());
    }
  }
}

export { dice_rule };

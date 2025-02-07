import { is_charges_component } from "../components/charges-component";
import {
  is_points_supplier,
  PointsSupplierComponent,
} from "../components/points-supplier-component";
import { is_radiostation_title } from "../components/title-component";

function radiostation_rule(items: unknown[]) {
  const points_suppliers: PointsSupplierComponent[] = [];
  let is_charged = false;
  for (let item of items) {
    if (is_points_supplier(item)) {
      points_suppliers.push(item);
    }
    if (is_charges_component(item) && is_radiostation_title(item)) {
      if (item.charges_component > 0) {
        is_charged = true;
        item.charges_component -= 1;
      }
    }
  }
  if (is_charged) {
    for (let supplier of points_suppliers) {
      supplier.points_supplier = [];
    }
  }
}

export { radiostation_rule };

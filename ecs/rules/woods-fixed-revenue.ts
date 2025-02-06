import { is_revenue_component } from "../components/revenue";
import { is_woods_mult_component } from "../components/woods-multiplier";
import { is_woods_supplier_component } from "../components/woods-supplier";

function woods_fixed_revenue(items: any[]) {
  let scores = 0;
  let multiplicators: any[] = [];
  for (let item of items) {
    if (is_woods_supplier_component(item)) {
      scores += 1;
    }
    if (is_woods_mult_component(item) && is_revenue_component(item)) {
      multiplicators.push(item);
    }
  }
  for (let mult of multiplicators) {
    mult.revenue = mult.woods_multiplier * scores;
  }
}

export { woods_fixed_revenue };

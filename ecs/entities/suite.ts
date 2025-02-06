import { revenue_component } from "../components/revenue";
import { woods_mult_component } from "../components/woods-multiplier";
import { woods_supplier_component } from "../components/woods-supplier";

const small_furniture_showroom = {
  [woods_mult_component]: 2,
  [revenue_component]: 0,
};

const furniture_production_line = {
  [woods_mult_component]: 3,
  [revenue_component]: 0,
};

const large_forest_landuse = {
  [woods_supplier_component]: 2,
};

const small_forest_landuse = {
  [woods_supplier_component]: 1,
};

export {
  small_forest_landuse,
  large_forest_landuse,
  furniture_production_line,
  small_furniture_showroom,
};

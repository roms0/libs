import {
  furniture_production_line,
  large_forest_landuse,
  small_forest_landuse,
  small_furniture_showroom,
} from "./entities/suite";
import { woods_revenue } from "./rules/woods-revenue";

const items = [
  small_furniture_showroom,
  small_furniture_showroom,
  furniture_production_line,
  small_forest_landuse,
  large_forest_landuse,
  large_forest_landuse,
];

woods_revenue(items);

console.log(items);

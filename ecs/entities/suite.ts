import { billing_order_component } from "../components/billing-order-component";
import { charges_component } from "../components/charges-component";
import { points_supplier_count_component } from "../components/points-supplier-count-component";
import { points_subscriber_component } from "../components/points-subscriber-component";
import { points_supplier } from "../components/points-supplier-component";
import { request_component } from "../components/request-component";
import { revenue_component } from "../components/revenue";
import {
  radiostation_title,
  title_component,
} from "../components/title-component";
import { woods_mult_component } from "../components/woods-multiplier";
import { woods_supplier_component } from "../components/woods-supplier";
import { mastership_component } from "../components/mastership-component";

const small_furniture_showroom = {
  [mastership_component]: 1,
  [woods_mult_component]: 2,
  [revenue_component]: 0,
  [points_subscriber_component]: null,
};

const furniture_production_line = {
  [mastership_component]: 1,
  [woods_mult_component]: 3,
  [revenue_component]: 0,
  [points_subscriber_component]: 9,
};

const large_forest_landuse = {
  [mastership_component]: 1,
  [woods_supplier_component]: 2,
};

const small_forest_landuse = {
  [mastership_component]: 1,
  [woods_supplier_component]: 1,
};

const restraunt_card = {
  [mastership_component]: 1,
  [points_subscriber_component]: 2,
  [revenue_component]: 0,
  [billing_order_component]: null,
};

const default_dice_card = {
  [mastership_component]: 1,
  [points_supplier_count_component]: 1,
  [points_supplier]: [],
  [request_component]: 0,
};

const train_station = {
  [mastership_component]: 1,
  [title_component]: "trainstation",
  [points_supplier_count_component]: 2,
  [points_supplier]: [],
};

const radiostation_card = {
  [mastership_component]: 1,
  [title_component]: radiostation_title,
  [charges_component]: 1,
};

const bill = {
  [mastership_component]: 2,
  adresser: "",
  coins: "",
};

export {
  small_forest_landuse,
  large_forest_landuse,
  furniture_production_line,
  small_furniture_showroom,
  default_dice_card,
  train_station,
  radiostation_card,
};

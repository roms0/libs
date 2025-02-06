import { charges_component } from "../components/charges-component";
import { points_count } from "../components/dice-condition";
import { dice_receiver_component } from "../components/dice-receiver";
import { points_supplier } from "../components/points-supplier";
import { request_component } from "../components/request";
import { revenue_component } from "../components/revenue";
import {
  radiostation_title,
  title_component,
} from "../components/title-component";
import { woods_mult_component } from "../components/woods-multiplier";
import { woods_supplier_component } from "../components/woods-supplier";

const small_furniture_showroom = {
  [woods_mult_component]: 2,
  [revenue_component]: 0,
  [dice_receiver_component]: null,
};

const furniture_production_line = {
  [woods_mult_component]: 3,
  [revenue_component]: 0,
  [dice_receiver_component]: 9,
};

const large_forest_landuse = {
  [woods_supplier_component]: 2,
};

const small_forest_landuse = {
  [woods_supplier_component]: 1,
};

const default_dice_card = {
  [points_count]: 1,
  [points_supplier]: [],
  [request_component]: false,
};

const train_station = {
  [title_component]: "trainstation",
  [points_count]: 2,
  [points_supplier]: [],
  [request_component]: true,
};

const radiostation_card = {
  [title_component]: radiostation_title,
  [charges_component]: 1,
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

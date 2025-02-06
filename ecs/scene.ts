import {
  default_dice_card,
  radiostation_card,
  train_station,
} from "./entities/suite";
import { dice_rule } from "./rules/dice-rule";
import { radiostation_rule } from "./rules/radiostation-rule";

const items = [default_dice_card, train_station, radiostation_card];

dice_rule(items);
console.log(items);
radiostation_rule(items);
console.log(items);
dice_rule(items);
console.log(items);
radiostation_rule(items);
console.log(items);

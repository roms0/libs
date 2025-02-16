import { has_promenades_to_visit } from "./002a";
import { read_points_supplier } from "./1";
import { position_proms } from "./3";
import { read_proms } from "./4";
import { billing } from "./5";
import {
  balance,
  dices,
  fee,
  Item,
  master,
  pointsConsumer,
  State,
  touch,
} from "./types";

const masha = new Item();
const misha = new Item();
const sasha = new Item();
balance(masha, 50);
balance(misha, 50);
balance(sasha, 50);

const data = {};

function create(desc: [Function, any][]) {
  const item = new Item();
  desc.forEach((d) => {
    d[0](item, ...d[1]);
  });
  data[item.id] = item;
  return item;
}

const mashas_dice = create([
  [dices, [2]],
  [master, [masha.id]],
]);

create([
  [dices, [2]],
  [master, [misha.id]],
]);

create([
  [dices, [3]],
  [master, [sasha.id]],
]);

const dice_cons_misha_1 = new Item();
master(dice_cons_misha_1, misha.id);
pointsConsumer(dice_cons_misha_1, [2]);
fee(dice_cons_misha_1, 15);

const dice_cons_misha_2 = new Item();
master(dice_cons_misha_2, misha.id);
pointsConsumer(dice_cons_misha_2, [3]);
fee(dice_cons_misha_2, 14);

const dice_cons_misha_3 = new Item();
master(dice_cons_misha_3, misha.id);
pointsConsumer(dice_cons_misha_3, [4]);
fee(dice_cons_misha_3, 22);

const dice_cons_sasha_1 = new Item();
master(dice_cons_sasha_1, sasha.id);
pointsConsumer(dice_cons_sasha_1, [7]);
fee(dice_cons_sasha_1, 53);

const dice_cons_sasha_2 = new Item();
master(dice_cons_sasha_2, sasha.id);
pointsConsumer(dice_cons_sasha_2, [4]);
fee(dice_cons_sasha_2, 31);

const dice_cons_masha_1 = new Item();
master(dice_cons_masha_1, masha.id);
pointsConsumer(dice_cons_masha_1, [8]);
fee(dice_cons_masha_1, 10);

const dice_cons_masha_2 = new Item();
master(dice_cons_masha_2, masha.id);
pointsConsumer(dice_cons_masha_2, [5]);
fee(dice_cons_masha_2, 28);

const items = [
  masha,
  misha,
  sasha,
  dice_cons_misha_1,
  dice_cons_misha_2,
  dice_cons_misha_3,
  dice_cons_sasha_1,
  dice_cons_sasha_2,
  dice_cons_masha_1,
  dice_cons_masha_2,
];

items.forEach((item) => {
  data[item.id] = item;
});

const state = new State([masha.id, misha.id, sasha.id]);

function untouch() {
  Object.values(data).forEach((item) => {
    delete item?.["touched"];
  });
}

const id = state.turns(data).id;
touch(mashas_dice, 1, masha.id);
read_points_supplier(state, data);
untouch();
const positioned = position_proms(state, data, true);
if (has_promenades_to_visit(state, data)) {
  positioned?.forEach((pos) => {
    touch(pos, pos.placement, id);
  });
  read_proms(state, data);
  billing(state, data, true);
  console.log(misha);
  console.log(masha);
  console.log(sasha);
} else {
}

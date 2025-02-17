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

const data = {};

function create(...desc: [Function, any][]) {
  const item = new Item();
  desc.forEach((d) => {
    d[0](item, ...d[1]);
  });
  data[item.id] = item;
  return item;
}

function component(Function, any): [Function, any[]] {
  return [Function, [any]];
}

const masha = create(component(balance, 50));

const misha = create(component(balance, 50));

const sasha = create(component(balance, 50));

const mashas_dice = create(component(dices, 2), component(master, masha.id));

create(component(dices, 2), component(master, misha.id));

create(component(dices, 1), component(master, sasha.id));

create(
  component(master, sasha.id),
  component(pointsConsumer, [2, 3, 4]),
  component(fee, 15)
);

create(
  component(master, masha.id),
  component(pointsConsumer, [3, 1, 5]),
  component(fee, 14)
);

create(
  component(master, sasha.id),
  component(pointsConsumer, [4, 9]),
  component(fee, 8)
);

create(
  component(master, sasha.id),
  component(pointsConsumer, [5, 10]),
  component(fee, 18)
);

create(
  component(master, sasha.id),
  component(pointsConsumer, [6, 7]),
  component(fee, 28)
);

create(
  component(master, sasha.id),
  component(pointsConsumer, [7, 0]),
  component(fee, 14)
);

create(
  component(master, masha.id),
  component(pointsConsumer, [8, 0]),
  component(fee, 44)
);

create(
  component(master, masha.id),
  component(pointsConsumer, [9, 1, 2, 3, 4]),
  component(fee, 4)
);

const items = [masha, misha, sasha];

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

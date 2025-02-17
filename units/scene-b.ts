import { billing } from "./5";
import { building } from "./7";
import {
  balance,
  cost,
  fee,
  Item,
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

const masha = create(component(balance, 59));

const misha = create(component(balance, 50));

const sasha = create(component(balance, 50));

const farm = create(
  component(cost, 10),
  component(fee, 1),
  component(pointsConsumer, [2])
);

const state = new State([masha.id, misha.id, sasha.id]);
data["state"] = state;
function untouch() {
  Object.values(data).forEach((item) => {
    delete item?.["touched"];
    delete item?.["whom"];
  });
}

const id = state.turns(data).id;
touch(farm, 1, masha.id);
building(state, data);
untouch();
billing(state, data, true);

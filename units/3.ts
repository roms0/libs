import {
  balance,
  Data,
  enable,
  Enable,
  isEnabled,
  isMaster,
  isPoints,
  isPromenade,
  Item,
  master,
  Master,
  promenade,
  Promenade,
  State,
} from "./types";

function arch(item: any): item is Promenade & Enable & Master {
  return isPromenade(item) && isEnabled(item) && isMaster(item);
}

export function position_proms(state: State, data: Data) {
  let pos = 1;
  const promenades = Object.values(data)
    .filter(arch)
    .filter((item) => item.master !== state.turns(data).id);
  for (let i = state.turn + state.table.length; i !== state.turn; i--) {
    promenades
      .filter((item) => item.master === state.table[i % state.table.length])
      .forEach((item) => {
        item.placement = pos;
        pos += 1;
      });
  }
}

const masha = new Item();
const misha = new Item();
const sasha = new Item();
balance(masha, 10);
balance(misha, 10);
balance(sasha, 10);

const one = new Item();
master(one, masha.id);
promenade(one, 1);
enable(one, true, [1]);

const two = new Item();
master(two, sasha.id);
promenade(two, 1);
enable(two, true, [1]);

const three = new Item();
master(three, misha.id);
promenade(three, 1);
enable(three, true, [1]);

const data = {};
[masha, misha, sasha, one, two, three].forEach((item) => {
  data[item.id] = item;
});

const state = new State([masha.id, misha.id, sasha.id]);
position_proms(state, data);
console.log(data);

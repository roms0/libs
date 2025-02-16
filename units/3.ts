import { read_proms } from "./4";
import {
  balance,
  Data,
  enable,
  fee,
  isPlacement,
  isPromenadeEstablishment,
  Item,
  master,
  placement,
  State,
  touch,
} from "./types";

export function position_proms(state: State, data: Data) {
  let pos = 1;
  const promenades = Object.values(data).filter(isPromenadeEstablishment);
  promenades.forEach((item) => {
    delete (item as { placement?: number }).placement;
  });
  const place = promenades.filter(
    (item) => item.master !== state.turns(data).id && item.enabled === true
  );
  for (let i = state.turn + state.table.length; i !== state.turn; i--) {
    place
      .filter((item) => item.master === state.table[i % state.table.length])
      .forEach((item) => {
        placement(item, pos);
        pos += 1;
      });
  }
}

const masha = new Item();
const misha = new Item();
const sasha = new Item();
balance(masha, 10);
balance(misha, 11);
balance(sasha, 12);

const one = new Item();
master(one, masha.id);
fee(one, 2);
enable(one, true, [1]);
enable(one, true, [1]);

const two = new Item();
master(two, sasha.id);
fee(two, 2);
enable(two, true, [1]);

const three = new Item();
master(three, misha.id);
fee(three, 2);
enable(three, true, [1]);

const data = {};
[masha, misha, sasha, one, two, three].forEach((item) => {
  data[item.id] = item;
});

const state = new State([masha.id, misha.id, sasha.id]);
position_proms(state, data);
touch(two, isPlacement(two) ? two.placement : 0, masha.id);
touch(three, isPlacement(three) ? three.placement : 0, masha.id);
read_proms(state, data);

import { get_state } from "../get-state/get-state";
import {
  is_promenade_location,
  PromenadeLocation,
} from "../models/promenade-location";

function prom_build(items: Record<string, unknown>) {
  const state = get_state(items);
  const main = state.get_main(items);
  const unsorted: PromenadeLocation[] = [];
  const sorted: PromenadeLocation[] = [];
  Object.keys(items).forEach((key) => {
    if (
      is_promenade_location(items[key]) &&
      state.get_match(items[key].points) &&
      main.id !== items[key].master
    ) {
      unsorted.push(items[key]);
    }
  });
  const turner_index = state.turn % state.queue.length;
  for (
    let i = turner_index === 0 ? state.queue.length - 1 : turner_index - 1;
    i !== turner_index;
    i === 0 ? (i = state.queue.length - 1) : i--
  ) {
    sorted.push(...unsorted.filter((uns) => uns.master === state.queue[i]));
  }
  state.prom_length = sorted.length;
  state.prom_pos = 0;
  sorted.forEach((item, i) => {
    item.placement = i + 1;
  });
}

const state = {
  turn: 7,
  queue: ["1", "2", "3", "4"],
  prom_pos: 0,
  get_main(items) {
    const id = this.queue[this.turn % this.queue.length];
    return items[id];
  },
  get_match(p: number) {
    return true;
  },
};

const data = {
  state,
  "66": {
    id: "66",
    master: "3",
    fee: 44,
    placement: 0,
    activation: 2,
    points: 7,
  },
  "1": {
    id: "1",
    master: "3",
    fee: 10,
    placement: 0,
    activation: 1,
    points: 7,
  },
  "22": {
    id: "22",
    master: "4",
    fee: 2,
    placement: 0,
    activation: 2,
    points: 7,
  },
  "33": {
    id: "33",
    master: "2",
    fee: 25,
    placement: 0,
    activation: 2,
    points: 7,
  },
  "77": {
    id: "66",
    master: "1",
    fee: 44,
    placement: 0,
    activation: 2,
    points: 7,
  },
  "44": {
    id: "44",
    master: "3",
    fee: 44,
    placement: 0,
    activation: 2,
    points: 7,
  },
};

prom_build(data);
console.log(data);

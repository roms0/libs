import { get_state } from "../get-state/get-state";
import { is_activated } from "../models/activated";
import { is_diceable } from "../models/diceable";
import { is_promenade_location } from "../models/promenade-location";
import { Transaction } from "../models/transaction";

function dicing(items: Record<string, unknown>) {
  const state = get_state(items);
  Object.keys(items).forEach((key) => {
    if (is_diceable(items[key]) && is_activated(items[key])) {
      if (items[key].activation === 1) {
        state.points = new Array(items[key].dices)
          .fill(undefined)
          .map(() => Math.trunc(Math.random() * 10));
      }
    }
  });
}

const state = {
  turn: 7,
  queue: ["1", "2", "3", "4"],
  prom_pos: 0,
  get_main() {
    const id = this.queue[this.turn % this.queue.length];
    return { id, balance: 10 };
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
    activation: 1,
    dices: 2,
  },
};

dicing(data);
console.log(data);

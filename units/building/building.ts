import { get_state } from "../get-state/get-state";
import { is_activated } from "../models/activated";
import { is_blueprint } from "../models/blueprint";
import { Transaction } from "../models/transaction";

class Established {
  time: number;
  id: string;
  constructor(public master: string) {
    this.time = Date.now();
    this.id = Math.trunc(Math.random() * 1000) + "";
  }
}

function building(items: Record<string, unknown>) {
  const state = get_state(items);
  const main = state.get_main(items);
  Object.keys(items).forEach((key) => {
    if (
      is_blueprint(items[key]) &&
      is_activated(items[key]) &&
      items[key].activation === 1
    ) {
      if (main.balance >= items[key].cost) {
        const blue = items[key];
        main.balance -= items[key].cost;
        const est: any = {};
        Object.keys(blue).forEach((prop) => {
          est[prop] = blue[prop];
        });
        const established = new Established(main.id);
        Object.keys(established).forEach((prop) => {
          est[prop] = established[prop];
        });
        delete est["cost"];
        delete est["activation"];
        items[est.id] = est;
      }
    }
  });
}

const state = {
  turn: 4,
  queue: ["1", "2", "3", "4"],
  prom_pos: 0,
  get_main(items: Record<string, unknown>) {
    const id = this.queue[this.turn % this.queue.length];
    return items[id];
  },
  get_match(p: number) {
    return true;
  },
};

const data = {
  state,
  "1": {
    balance: 2,
    id: "1",
  },
  "100": {
    id: "100",
    materials: true,
    income: 1,
    cost: 2,
    activation: 1,
  },
  "200": {
    id: "200",
    multiplier_materials: 2,
    cost: 8,
    activation: 2,
  },
};

building(data);
console.log(data);
export { building };

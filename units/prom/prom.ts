import { get_state } from "../get-state/get-state";
import { is_activated } from "../models/activated";
import { is_promenade_location } from "../models/promenade-location";
import { Transaction } from "../models/transaction";

function prom(items: Record<string, unknown>) {
  const state = get_state(items);
  const main = state.get_main(items);
  let progress = 0;
  Object.keys(items).forEach((key) => {
    if (
      is_promenade_location(items[key]) &&
      is_activated(items[key]) &&
      state.prom_pos + items[key].activation === items[key].placement
    ) {
      const transaction = new Transaction(
        items[key].master,
        main.id,
        items[key].fee
      );
      items[transaction.id] = transaction;
      progress += 1;
    }
  });
  state.prom_pos += progress;
}

const state = {
  state: {
    get_main(items) {
      return { id: "1", balance: 6 };
    },
    get_match(p: number) {
      return p === 5;
    },
    prom_pos: 0,
  },
  "1": {
    id: "1",
    master: "2",
    fee: 10,
    placement: 1,
    activation: 1,
    points: 5,
  },
  "22": {
    id: "22",
    master: "2",
    fee: 2,
    placement: 2,
    activation: 2,
    points: 7,
  },
};

prom(state);
console.log(state);
export { prom };

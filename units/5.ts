import {
  Address,
  Amount,
  Data,
  ID,
  Placement,
  Source,
  State,
  isBalance,
  isPlacement,
  isTransaction,
} from "./types";

function bill(t: ID & Amount & Address & Source, data: Data, debug = false) {
  const source = data[t.source];
  const address = data[t.address];
  if (isBalance(source) && isBalance(address)) {
    const diff = source.balance >= t.amount ? t.amount : source.balance;
    address.balance += diff;
    source.balance -= diff;
    if (debug) {
      console.log(t.source + " - " + diff + " -> " + t.address);
    }
  }
  delete data[t.id];
}

export function billing(state: State, data: Data, debug = false) {
  const queue: (ID & Amount & Address & Source & Placement)[] = [];
  const evens: (ID & Amount & Address & Source)[] = [];
  Object.values(data).forEach((item) => {
    if (isTransaction(item)) {
      if (isPlacement(item)) {
        queue.push(item);
      } else {
        evens.push(item);
      }
    }
  });
  queue
    .sort((a, b) => a.placement - b.placement)
    .forEach((trans) => {
      bill(trans, data, debug);
    });
  evens.forEach((trans) => {
    bill(trans, data, debug);
  });
}

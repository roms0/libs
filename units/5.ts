import { Data, State, isBalance, isPlacement, isTransaction } from "./types";

export function billing(state: State, data: Data, debug = false) {
  const transactions = Object.values(data).filter((item) =>
    isTransaction(item)
  );
  const priors = transactions.filter((trans) => isPlacement(trans));
  priors
    .sort((a, b) => a.placement - b.placement)
    .forEach((trans) => {
      const source = data[trans.source];
      const address = data[trans.address];
      if (isBalance(source) && isBalance(address)) {
        const diff =
          source.balance >= trans.amount ? trans.amount : source.balance;
        address.balance += diff;
        source.balance -= diff;
        if (debug) {
          console.log(trans.source + " - " + diff + " -> " + trans.address);
        }
      }
      delete data[trans.id];
    });
}

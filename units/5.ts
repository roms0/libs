import { Data, State, isBalance, isPlacement, isTransaction } from "./types";

export function billing(state: State, data: Data) {
  const transactions = Object.values(data).filter((item) =>
    isTransaction(item)
  );
  const priors = transactions.filter((trans) => isPlacement(trans));
  priors
    .sort((a, b) => a.placement - b.placement)
    .forEach((trans) => {
      if (isBalance(trans.source) && isBalance(trans.address)) {
        const diff =
          trans.source.balance >= trans.amount
            ? trans.amount
            : trans.source.balance;
        trans.address.balance += diff;
        trans.source.balance -= diff;
      }
      delete data[trans.id];
    });
}

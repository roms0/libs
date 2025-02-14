import { is_accountable } from "../models/accountable";
import { is_transaction, Transaction } from "../models/transaction";

function billing(items: Record<string, unknown>) {
  const transactions: Transaction[] = [];
  Object.keys(items).forEach((key) => {
    if (is_transaction(items[key])) {
      transactions.push(items[key]);
    }
  });
  transactions
    .sort((a, b) => a.time - b.time)
    .forEach((transaction) => {
      let source = items[transaction.source];
      let address = items[transaction.address];
      if (is_accountable(source) && is_accountable(address)) {
        if (source.balance < transaction.amount) {
          address.balance += source.balance;
          source.balance = 0;
          return;
        }
        source.balance -= transaction.amount;
        address.balance += transaction.amount;
      }
    });
}

export { billing };

type Transaction = {
  amount: number;
  address: string;
  source: string;
  time: number;
};

function is_transaction(item: any): item is Transaction {
  return (
    typeof item === "object" &&
    ["amount", "time"].every(
      (key) => key in item && typeof item[key] === "number"
    ) &&
    ["address", "source"].every(
      (key) => key in item && typeof item[key] === "string"
    )
  );
}

export { is_transaction, Transaction };

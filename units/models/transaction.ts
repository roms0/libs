class Transaction {
  public time: number;
  public id: string;
  constructor(
    public address: string,
    public source: string,
    public amount: number
  ) {
    this.time = Date.now();
    this.id = Math.trunc(Math.random() * 1000) + "";
  }
}

function is_transaction(item: any): item is Transaction {
  return item instanceof Transaction;
}

export { is_transaction, Transaction };

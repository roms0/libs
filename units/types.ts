export type Data = Record<string, object>;
export type ID = { id: string };
export type Balance = {
  balance: number;
} & ID;
export function isBalance(item: any): item is Balance {
  return "balance" in item && typeof item.balance === "number";
}
export function balance(item: any, value: number) {
  item["balance"] = value;
  return item;
}

export type Master = {
  master: string;
} & ID;
export function isMaster(item: any): item is Master {
  return "master" in item && typeof item.master === "string";
}
export function master(item: any, value: string) {
  item["master"] = value;
  return item;
}

export type Points = {
  points?: number[];
} & ID;
export function isPoints(item: any): item is Points {
  return "points" in item && Array.isArray(item.points);
}
export function points(
  item: any,
  points: number[] = isDices(item)
    ? new Array(item.dices)
        .fill(undefined)
        .map(() => Math.trunc(Math.random() * 10))
    : []
) {
  item["points"] = points;
  return item;
}

export type Dices = {
  dices: number;
} & ID;
export function isDices(item: any): item is Dices {
  return "dices" in item && typeof item.dices === "number";
}
export function dices(item: any, count: number) {
  item["dices"] = count;
  return item;
}

export type Touch = {
  touched: number;
  whom: string;
} & ID;
export function isTouched(item: any): item is Touch {
  return (
    "touched" in item &&
    typeof item.touched === "number" &&
    "whom" in item &&
    typeof item.whom === "string"
  );
}
export function touch(item: any, touched: number, whom: string) {
  item["touched"] = touched;
  item["whom"] = whom;
  return item;
}

export type PointsConsumer = {
  points_consumer: number[];
} & ID;
export function isPointsConsumer(item: any): item is PointsConsumer {
  return "points_consumer" in item && Array.isArray(item["points_consumer"]);
}
export function pointsConsumer(item: any, consume: number[]) {
  item["points_consumer"] = consume;
  return item;
}

export type Fee = {
  fee: number;
} & ID;
export function isFee(item: any): item is Fee {
  return "fee" in item && typeof item.fee === "number";
}
export function fee(item: any, fee: number) {
  item["fee"] = fee;
  return item;
}

export type Placement = {
  placement: number;
} & ID;
export function isPlacement(item: any): item is Placement {
  return "placement" in item && typeof item.placement === "number";
}
export function placement(item: any, placement: number) {
  item["placement"] = placement;
  return item;
}

export type Amount = {
  amount: number;
} & ID;
export function isAmount(item: any): item is Amount {
  return "amount" in item && typeof item.amount === "number";
}
export function amount(item: any, amount: number) {
  item["amount"] = amount;
  return item;
}

export type Address = {
  address: string;
} & ID;
export function isAddress(item: any): item is Amount {
  return "address" in item && typeof item.address === "string";
}
export function address(item: any, address: string) {
  item["address"] = address;
  return item;
}

export type Source = {
  source: string;
} & ID;
export function isSource(item: any): item is Amount {
  return "source" in item && typeof item.source === "string";
}
export function source(item: any, source: string) {
  item["source"] = source;
  return item;
}

export class State {
  public turn: number;
  constructor(public table: string[]) {
    this.turn = this.table.length;
  }
  turns(data: Data): Balance & Placement {
    const id = this.table[this.turn % this.table.length];
    return data[id] as Balance & Placement;
  }
}

export class Item {
  id: string;
  constructor() {
    this.id = Math.trunc(Math.random() * 1000) + "";
  }
}

export function transaction(sum: number, to: string, from: string) {
  const item = new Item();
  address(item, to);
  source(item, from);
  amount(item, sum);
  return item;
}

export function isTransaction(item: any): item is Amount & Address & Source {
  return isAddress(item) && isAmount(item) && isSource(item);
}

export function isPromenadeEstablishment(
  item: any
): item is Fee & PointsConsumer & Master {
  return isFee(item) && isPointsConsumer(item) && isMaster(item);
}

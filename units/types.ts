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
  points: number[] | null;
  dices: number;
} & ID;
export function isPoints(item: any): item is Points {
  return (
    "points" in item &&
    typeof item.points === "number" &&
    "dices" in item &&
    (Array.isArray(item.dices) || !item.dices)
  );
}
export function points(
  item: any,
  dices: number,
  points: number[] | null = null
) {
  item["dices"] = dices;
  item["points"] = points;
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

export type Enable = {
  enabled: boolean;
  enable_condition: number[];
} & ID;
export function isEnabled(item: any): item is Enable {
  return (
    "enabled" in item &&
    typeof item.enabled === "boolean" &&
    "condition" in item &&
    Array.isArray(item.condition)
  );
}
export function enable(item: any, enabled: boolean, condition: number[]) {
  item["enabled"] = enabled;
  item["condition"] = condition;
  return item;
}

export type Promenade = {
  fee: number;
  placement: number | null;
} & ID;
export function isPromenade(item: any): item is Promenade {
  return (
    "fee" in item &&
    typeof item.fee === "number" &&
    "placement" in item &&
    (typeof item.placement === "number" || item.placement === null)
  );
}
export function promenade(item: any, fee: number) {
  item["fee"] = fee;
  item["placement"] = null;
  return item;
}

export class State {
  public turn: number;
  constructor(public table: string[]) {
    this.turn = this.table.length;
  }
  turns(data: Data): Balance {
    const id = this.table[this.turn % this.table.length];
    return data[id] as Balance;
  }
}

export class Item {
  id: string;
  constructor() {
    this.id = Math.trunc(Math.random() * 1000) + "";
  }
}

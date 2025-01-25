export function uid() {
  return Math.trunc(Math.random() * 100) + "";
}

export class State {
  instructions: Record<string, Instruction> = {};
  items: Record<string, Item> = {};
  intentions: Record<string, Intention> = {};
  update_intentions() {
    this.intentions = {};
    Object.values(this.items).forEach((item) => item.intent(this));
  }
  update_items() {
    Object.values(this.items).forEach((item) => item.update(this));
    this.instructions = {};
  }
  add_intention(intention: Intention) {
    this.intentions[intention.id] = intention;
  }
  add_instruction(instruction: Instruction) {
    this.instructions[instruction.id] = instruction;
  }
  add_item(item: Item) {
    this.items[item.id] = item;
  }
}

export class Instruction {
  id: string;
  constructor() {
    this.id = uid();
  }
}
export class RandomDiceInstruction extends Instruction {
  constructor(public range: number) {
    super();
  }
}

export class IncomeStageInstruction extends Instruction {}

export class TransferOwnershipInstruction extends Instruction {
  constructor(
    public pre_master_id: string,
    public master_id: string,
    public data_id: string
  ) {
    super();
  }
}

export class IncomeInstruction extends Instruction {
  constructor(
    public benefactor: string,
    public source: string,
    public income: number
  ) {
    super();
  }
}
class SpendInstruction extends Instruction {
  constructor(public spender: string) {
    super();
  }
}

export class CornHarvestInstruction extends Instruction {
  constructor(public field: string) {
    super();
  }
}

export abstract class Item {
  id: string;
  abstract intent(state: State): void;
  abstract update(state: State): void;
}

export abstract class MasterableItem extends Item {
  master: string;
}

export abstract class Intention {
  id: string;
  title: string;
  client_slots: Record<string, unknown>;
  abstract effect(state: State, action: unknown): void;
}

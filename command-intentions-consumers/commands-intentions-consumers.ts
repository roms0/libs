export function uid() {
  return Math.trunc(Math.random() * 100) + "";
}

export class State {
  instructions: Record<string, Instruction> = {};
  items: Record<string, Item> = {};
  intentions: Record<string, Intention> = {};
  read() {
    this.intentions = {};
    Object.values(this.items).forEach((item) => item.read(this));
  }
  react() {
    Object.values(this.items).forEach((item) => item.react(this.instructions));
  }
  add_intention(intention: Intention) {
    this.intentions[intention.id] = intention;
  }
  add_instruction(instruction: Instruction) {
    this.instructions[instruction.id] = instruction;
  }
}

class Intention {
  id: string;
  constructor() {
    this.id = uid();
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

export class Item {
  id: string;
  constructor() {
    this.id = uid();
  }
  read(state: State) {}
  react(instructions: Record<string, Instruction>) {}
}

export class CornProductsItem extends Item {
  title: string;
  constructor() {
    super();
    this.title = "corn_products";
  }
}
